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

	log(options, 'found node_modules', nodeModulesList)

	for (const nodeModules of nodeModulesList) {
		const filePath = path.resolve(nodeModules, targetUrl)

		log(options, `attempting to resolve ${filePath}`)

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

export default (partialOptions: Partial<Options> = {}) => {
	if (typeof partialOptions !== 'object' || partialOptions === null)
		throw new Error(
			'This is a curried function. You need to call it (with or without options) before passing it to sass (@3yourmind/sass-node-modules-importer)',
		)

	return (url: string, prev: string) => {
		/**
		 * assign default options
		 */
		const options: Options = Object.assign(
			{ debug: false, indexExtensions: ['.css', '.sass', '.scss'], start: '~' },
			partialOptions,
		)

		log(options, 'called by sass with', { url, prev })

		const isTildeImport = url.startsWith(options.start)

		if (!isTildeImport) return null

		const toResolve = url.substr(options.start.length)

		log(options, `attempting to resolve ${toResolve}`)

		const file = resolve(options, toResolve, prev === 'stdin' ? '.' : prev)

		log(options, `=> resolved to ${file}`)

		return file === null ? null : { file }
	}
}
