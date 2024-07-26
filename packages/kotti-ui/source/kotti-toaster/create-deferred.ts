export const createDeferred = <T>(): {
	promise: Promise<T>
	reject: (arg: unknown) => void
	resolve: (res: T) => void
} => {
	let resolve: ((res: T) => void) | null = null
	let reject: ((arg: unknown) => void) | null = null

	const promise = new Promise<T>((res, rej) => {
		resolve = res
		reject = rej
	})

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (resolve === null || reject === null)
		throw new Error('could not create deferred promise')

	return { promise, reject, resolve }
}
