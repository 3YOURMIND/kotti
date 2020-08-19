import * as fs from 'fs'
import * as path from 'path'

import findNodeModules from 'find-node-modules'

import { log } from './logger'
import { DIRECTORY_RESOLVERS } from './resolvers/directory'
import { FILE_RESOLVERS } from './resolvers/file'
import { Options, Resolver } from './types'

const tryResolvers = (
	options: Options,
	filePath: string,
	resolvers: Resolver[],
) => {
	for (const resolver of resolvers) {
		const resolvedFile = resolver(options, filePath)
		if (resolvedFile !== null) return resolvedFile
	}

	return null
}

const resolve = (options: Options, targetUrl: string, source: string) => {
	const nodeModulesList = findNodeModules({ cwd: path.resolve(source) })

	log(options, 'found node_modules', { targetUrl, source, nodeModulesList })

	for (const nodeModules of nodeModulesList) {
		log(options, 'attempting to resolve', nodeModules)

		const filePath = path.resolve(nodeModules, targetUrl)

		const isExisting = fs.existsSync(filePath)
		if (isExisting) {
			const stats = fs.lstatSync(filePath)

			const isDirectory = stats.isDirectory()
			const isFile = stats.isFile()

			log(options, `checking ${filePath}`, { isDirectory, isFile })

			if (isDirectory) {
				const result = tryResolvers(options, filePath, DIRECTORY_RESOLVERS)
				if (result !== null) return result
			} else if (isFile) return filePath
		}

		const result = tryResolvers(options, filePath, FILE_RESOLVERS)
		if (result !== null) return result
	}

	return null
}

export default ({
	debug = false,
	indexExtensions = ['.css', '.sass', '.scss'],
	start = '~',
}: Partial<Options> = {}) => (url: string, prev: string, done: unknown) => {
	const options: Options = { debug, indexExtensions, start }

	log(options, 'called by sass with', { url, prev, done })

	const isTildeImport = url.startsWith(options.start)

	if (!isTildeImport) return null

	const toResolve = url.substr(options.start.length)

	log(options, 'attempting to resolve', toResolve)

	const file = resolve(options, toResolve, prev === 'stdin' ? '.' : prev)

	log(options, '=> resolved', file)

	return file === null ? null : { file }
}
