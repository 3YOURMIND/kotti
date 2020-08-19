import * as fs from 'fs'

import { log } from '../logger'
import { Resolver } from '../types'

/**
 * File resolve that attempts to guess missing extensions.
 * E.g. some-file might be referring to some-file.css
 *
 * Will only resolve valid files.
 */
export const resolveFromExtension: Resolver = (options, file) => {
	log(options, 'attempting to resolve from index')

	for (const extension of options.indexExtensions) {
		log(options, 'attempting to resolve extension', extension)

		const extensionPath = `${file}${extension}`

		if (fs.existsSync(extensionPath) && fs.lstatSync(extensionPath).isFile())
			return extensionPath
	}

	return null
}

/**
 * File resolvers guess based on not existing files. For example, when some-file doesn’t exist,
 * some-file.css might still exist and would be considered valid.
 */
export const FILE_RESOLVERS: Resolver[] = [resolveFromExtension]
