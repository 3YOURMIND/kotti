import { Options } from './types'

export const log = (
	options: Options,
	message: string,
	...more: unknown[]
): void => {
	// eslint-disable-next-line no-console
	if (options.debug) console.debug(`importer: ${message}`, ...more)
}
