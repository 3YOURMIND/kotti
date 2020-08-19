export type Options = {
	/**
	 * Enable debug logs
	 * @default false
	 */
	debug: boolean
	/**
	 * Extensions to resolve when extension is omitted. Will prefer based on order.
	 * @default ['.css', '.sass', '.scss']
	 */
	indexExtensions: string[]
	/**
	 * Prefix string/char to refer to `node_modules` folders
	 * @default ~
	 */
	start: string
}

export type Resolver = (options: Options, directory: string) => string | null
