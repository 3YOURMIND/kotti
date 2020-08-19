import * as fs from 'fs'
import * as path from 'path'

import { log } from '../logger'
import { Resolver } from '../types'

export const resolveFromPackageJson: Resolver = (options, directory) => {
	log(options, 'attempting to resolve package.json')

	const packageJsonPath = path.resolve(directory, 'package.json')

	if (!fs.existsSync(packageJsonPath)) return null

	log(options, 'found package.json')
	const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString())

	if (!Object.prototype.hasOwnProperty.call(packageJson, 'style')) {
		log(options, 'no style specified in package.json, aborting')
		return null
	}

	log(options, 'found style')
	return path.resolve(directory, packageJson.style)
}

export const resolveFromIndexCss: Resolver = (options, directory) => {
	log(options, 'attempting to resolve index.css')

	const indexCss = path.resolve(directory, 'index.css')

	return fs.existsSync(indexCss) ? indexCss : null
}

export const DIRECTORY_RESOLVERS: Resolver[] = [
	resolveFromPackageJson,
	resolveFromIndexCss,
]
