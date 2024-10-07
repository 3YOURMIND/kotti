export const createDeferred = (): {
	promise: Promise<void>
	resolve: () => void
	reject: (arg: unknown) => void
} => {
	let resolve: (() => void) | null = null
	let reject: ((arg: unknown) => void) | null = null

	const promise = new Promise<void>((res, rej) => {
		resolve = res
		reject = rej
	})

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (resolve === null || reject === null)
		throw new Error('could not create deferred promise')

	return { promise, resolve, reject }
}
