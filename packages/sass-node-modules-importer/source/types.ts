export type Options = {
	debug: boolean
	indexExtensions: string[]
	start: string
}

export type Resolver = (options: Options, directory: string) => string | null
