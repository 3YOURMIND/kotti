/**
 * Creates a deferred promise, useful in scenarios where a promise needs to be created and
 * resolved or rejected from an external context. This exposes `resolve` and `reject` functions,
 * allowing external control over the promise's resolution state.
 *
 * @throws {Error} Throws an error if the promise's `resolve` or `reject` functions could not be initialized (which shouldn't occur under typical JavaScript execution).
 */
export const createDeferred = <PROMISE_RESOLUTION_TYPE>(): {
	promise: Promise<PROMISE_RESOLUTION_TYPE>
	reject: (arg: unknown) => void
	resolve: (res: PROMISE_RESOLUTION_TYPE) => void
} => {
	let resolve: ((res: PROMISE_RESOLUTION_TYPE) => void) | null = null
	let reject: ((arg: unknown) => void) | null = null

	const promise = new Promise<PROMISE_RESOLUTION_TYPE>((res, rej) => {
		resolve = res
		reject = rej
	})

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (resolve === null || reject === null)
		throw new Error('could not create deferred promise')

	return {
		promise,
		reject,
		resolve,
	}
}
