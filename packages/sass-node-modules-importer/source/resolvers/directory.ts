import * as fs from 'fs'
import * as path from 'path'

import { log } from '../logger'
import { Resolver } from '../types'

import { resolveFromExtension } from './file'

/**
 * Directory resolver that attempts to look for a package.json
 * if a package.json is found, it’ll check for a style property inside and resolve to it
 *
 * NOTE: Whether or not the resolved file actually exists is intentionally ignored, as
 * sass should tell the user that the style’s file couldn’t be found so they can fix the package
 * E.g. the style might be misconfigured or the build doesn’t properly generate the css file
 */
export const resolveFromPackageJson: Resolver = (options, directory) => {
	log(options, `attempting to resolve package.json in ${directory}`)

	const packageJsonPath = path.resolve(directory, 'package.json')

	if (!fs.existsSync(packageJsonPath)) return null

	log(options, `found package.json at ${packageJsonPath}`)
	const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString())

	if (!Object.prototype.hasOwnProperty.call(packageJson, 'style')) {
		log(options, 'no style specified in package.json, aborting')
		return null
	}

	const stylePath = path.resolve(directory, packageJson.style)

	log(options, `found style at ${stylePath}`)
	return stylePath
}

/**
 * Directory resolver that attempts to find an index.css in the given directory
 * if the file exists, it’ll resolve to it
 */
export const resolveFromIndexCss: Resolver = (options, directory) => {
	log(options, `attempting to resolve ${directory}/index`)
	return resolveFromExtension(options, path.resolve(directory, 'index'))
}

/**
 * Directory resolvers take a valid directory and attempt to find useful files inside them
 * (e.g. package.json)
 * If a file is found, they’ll resolve to it
 */
export const DIRECTORY_RESOLVERS: Resolver[] = [
	resolveFromPackageJson,
	resolveFromIndexCss,
]
