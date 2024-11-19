import { describe, expect, it, vitest } from 'vitest'

import { createToaster } from './create-toaster'

const DEBUG: boolean = false

const createAnimationFrameMock = () => {
	let interval: Timer | null = null
	return {
		getIsRunning: () => interval !== null,
		start: (update: () => void) => {
			if (interval)
				throw new Error(
					'Could not start animation frame, already running. This is likely a bug.',
				)

			if (DEBUG) console.log('animation-frame-mock: start')
			interval = globalThis.setInterval(() => {
				if (DEBUG) console.log('animation-frame-mock: update')
				update()
			}, 5)
		},
		stop: () => {
			if (DEBUG) console.log('animation-frame-mock: stop')
			if (interval) {
				globalThis.clearInterval(interval)
				interval = null
			}
		},
	}
}

describe('createToaster', () => {
	it('returns things', () => {
		const toaster = createToaster({
			animationFrame: createAnimationFrameMock(),
		})

		expect(toaster).toEqual({
			_internal_pls_dont_touch: expect.anything(),
			abort: expect.anything(),
			show: expect.anything(),
			withOptions: expect.anything(),
		})
	})

	describe('.abort()', () => {
		it('can abort a toast', async () => {
			const toaster = createToaster()

			const toast = toaster.show({ duration: 1, text: 'test' })
			expect(() => {
				toaster.abort(toast.metadata.id)
			}).not.toThrow()
			expect(toast.metadata.abortController.signal.aborted).toBe(true)
			await expect(toast.done).rejects.toThrow('INTERNAL_ABORT')
		})

		it('cannot abort an aborted toast', async () => {
			const toaster = createToaster()

			const toast = toaster.show({ duration: 1, text: 'test' })
			expect(() => {
				toaster.abort(toast.metadata.id)
			}).not.toThrow()
			expect(toast.metadata.abortController.signal.aborted).toBe(true)
			await expect(toast.done).rejects.toThrow('INTERNAL_ABORT')
			expect(() => {
				toaster.abort(toast.metadata.id)
			}).toThrow()
		})

		it('cannot abort an already toasted toast', async () => {
			const toaster = createToaster({
				animationFrame: createAnimationFrameMock(),
			})
			toaster._internal_pls_dont_touch.subscribe(() => {})

			const toast = toaster.show({ duration: 1, text: 'test' })
			await expect(toast.done).resolves.toBe('deleted')
			expect(() => {
				toaster.abort(toast.metadata.id)
			}).toThrow()
		})

		it('throws for unknown toasts', async () => {
			const toaster = createToaster({
				animationFrame: createAnimationFrameMock(),
			})
			toaster._internal_pls_dont_touch.subscribe(() => {})
			const toast = toaster.show({ duration: 1, text: 'test' })
			expect(() => {
				toaster.abort('not-a-real-toast')
			}).toThrow(
				'could not find toast in fifoToasterQueue with id “not-a-real-toast”',
			)
			expect(toast.metadata.abortController.signal.aborted).toBe(false)
			await expect(toast.done).resolves.toBe('deleted')
		})
	})

	describe('.withOptions()', () => {
		it('can create a customized show function', () => {
			const toaster = createToaster()
			const show = toaster.withOptions({
				duration: 3000,
			})
			expect(show).toBeInstanceOf(Function)
		})

		it('can call customized show function', () => {
			const toaster = createToaster()
			const show = toaster.withOptions({
				duration: 3000,
			})
			expect(() => show({ duration: 1, text: 'some text' })).not.toThrowError()
		})
	})

	describe('.show()', () => {
		it('can push', async () => {
			const toaster = createToaster({
				animationFrame: createAnimationFrameMock(),
			})
			toaster._internal_pls_dont_touch.subscribe(() => {})
			const toast = toaster.show({ duration: 1, text: 'example toast' })

			expect(toast.text).toBe('example toast')
			await expect(toast.done).resolves.toBe('deleted')
		})

		it('correctly handles durations', async () => {
			const toaster = createToaster({
				animationFrame: createAnimationFrameMock(),
			})
			toaster._internal_pls_dont_touch.subscribe(() => {})

			const wait = (ms: number) =>
				new Promise((_resolve, reject) => {
					globalThis.setTimeout(() => {
						reject(new Error(`timeout after ${ms}ms`))
					}, ms)
				})

			const fastToast = toaster.show({ duration: 1, text: 'fast toast' })
			await expect(Promise.race([fastToast.done, wait(10)])).resolves.toBe(
				'deleted',
			)

			const slowToast = toaster.show({ duration: 100, text: 'slow toast' })
			await expect(Promise.race([slowToast.done, wait(200)])).resolves.toBe(
				'deleted',
			)

			const superSlowToast = toaster.show({
				duration: 500,
				text: 'super slow toast',
			})
			await expect(
				Promise.race([superSlowToast.done, wait(200)]),
			).rejects.toThrow('timeout')
		})

		it('can push custom data', async () => {
			const custom = { testing: true }

			const toaster = createToaster<{
				default: Record<string, never>
				test: { testing: boolean }
			}>({
				animationFrame: createAnimationFrameMock(),
			})
			toaster._internal_pls_dont_touch.subscribe(() => {})
			const toast = toaster.show({
				custom,
				duration: 1,
				text: 'example toast',
				type: 'test',
			})

			expect(toast.custom).toEqual(custom)
			await expect(toast.done).resolves.toBe('deleted')
		})

		it('can push with metadata.id', async () => {
			const toaster = createToaster({
				animationFrame: createAnimationFrameMock(),
			})
			toaster._internal_pls_dont_touch.subscribe(() => {})
			const toast = toaster.show({
				duration: 1,
				metadata: { id: 'foo' },
				text: 'example toast',
			})

			expect(toast.metadata.id).toEqual('foo')
			await expect(toast.done).resolves.toBe('deleted')
		})

		it('can push with metadata.abortController', async () => {
			const toaster = createToaster({
				animationFrame: createAnimationFrameMock(),
			})
			const abortController = new globalThis.AbortController()
			const toast = toaster.show({
				duration: 1,
				metadata: { abortController },
				text: 'example toast',
			})

			expect(toast.metadata.abortController).toBe(abortController)
			expect(() => {
				toast.abort()
			}).not.toThrow()
			expect(abortController.signal.aborted).toBe(true)
			await expect(toast.done).rejects.toThrow('INTERNAL_ABORT')
		})

		describe('returns', () => {
			it('.abort()', async () => {
				const toaster = createToaster({
					animationFrame: createAnimationFrameMock(),
				})
				toaster._internal_pls_dont_touch.subscribe(() => {})
				const toast = toaster.show({ duration: 1, text: '42' })

				expect(toast.metadata.abortController.signal.aborted).toBe(false)
				toast.abort()
				expect(toast.metadata.abortController.signal.aborted).toBe(true)
				await expect(toast.done).rejects.toThrow('INTERNAL_ABORT')
			})

			it('supports await toast.done', async () => {
				const toaster = createToaster({
					animationFrame: createAnimationFrameMock(),
				})
				toaster._internal_pls_dont_touch.subscribe(() => {})
				const toast = toaster.show({ duration: 10, text: '42' })

				await expect(toast.done).resolves.toBe('deleted')
			})
		})
	})

	describe('._internal_pls_dont_touch', () => {
		describe('.requestDelete()', () => {
			it('deletes a toast', async () => {
				const toaster = createToaster({
					animationFrame: createAnimationFrameMock(),
				})
				toaster._internal_pls_dont_touch.subscribe(() => {})

				let testPromiseIsDone = false

				const toast = toaster.show({ text: 'test' })

				void toast.done.then(() => {
					testPromiseIsDone = true
				})

				expect(testPromiseIsDone).toBe(false)
				toaster._internal_pls_dont_touch.requestDelete(toast.metadata.id)
				await new Promise((res) => globalThis.setTimeout(res, 1))
				expect(testPromiseIsDone).toBe(true)
			})
		})

		describe('.subscribe()', () => {
			it('can subscribe', () => {
				const toaster = createToaster({
					animationFrame: createAnimationFrameMock(),
				})
				const handler = vitest.fn()

				toaster._internal_pls_dont_touch.subscribe(handler)

				expect(handler.mock.calls).toEqual([[[]]])
				toaster.show({ text: 'test' })
				expect(handler.mock.calls).toEqual([[[]], [[expect.anything()]]])
			})

			it('correctly handles old toasts upon subscribing', () => {
				const toaster = createToaster({
					animationFrame: createAnimationFrameMock(),
				})
				const handler = vitest.fn()

				toaster.show({ text: 'test' })

				expect(handler.mock.calls).toEqual([])
				toaster._internal_pls_dont_touch.subscribe(handler)
				expect(handler.mock.calls).toEqual([
					[
						[
							{
								custom: {},
								duration: null,
								header: null,
								metadata: expect.anything(),
								progress: null,
								text: 'test',
								type: 'default',
							},
						],
					],
				])
			})

			it('prevents multiple simultaneous subscriptions', () => {
				const toaster = createToaster()
				const handler = () => {}

				expect(() => {
					toaster._internal_pls_dont_touch.subscribe(handler)
				}).not.toThrow()

				expect(() => {
					toaster._internal_pls_dont_touch.subscribe(handler)
				}).toThrow('toaster already has a subscriber')
			})

			it('receives messages in FIFO order', async () => {
				const toaster = createToaster({
					animationFrame: createAnimationFrameMock(),
				})
				const handler = vitest.fn()

				const toast1 = toaster.show({ duration: 50, text: 'test' })
				const toast2 = toaster.show({ duration: 50, text: 'test 2' })

				expect(handler.mock.calls).toEqual([])
				toaster._internal_pls_dont_touch.subscribe(handler)
				expect(handler.mock.lastCall![0][0]).toMatchObject({ text: 'test' })
				expect(handler.mock.lastCall![0][1]).toMatchObject({ text: 'test 2' })

				await Promise.all([toast1.done, toast2.done])

				expect(handler.mock.lastCall).toEqual([[]])

				const toast3 = toaster.show({ duration: 50, text: 'test 3' })
				expect(handler.mock.lastCall![0][0]).toMatchObject({ text: 'test 3' })

				await toast3.done
				expect(handler.mock.lastCall).toEqual([[]])
			})
		})

		describe('.unsubscribe()', () => {
			it('can unsubscribe', () => {
				const toaster = createToaster()
				const handler = vitest.fn()

				toaster._internal_pls_dont_touch.subscribe(handler)
				toaster._internal_pls_dont_touch.unsubscribe()

				expect(handler.mock.calls).toEqual([[[]]])
				toaster.show({ text: 'test' })
				expect(handler.mock.calls).toEqual([[[]]])
			})

			it('throws when unsubscribe without a subscription', () => {
				const toaster = createToaster()

				expect(() => {
					toaster._internal_pls_dont_touch.unsubscribe()
				}).toThrow('toaster currently has no subscriber')
			})
		})
	})
})

// type-level tests
// HACK: These tests don’t actually need to be run, they work by letting tsc report any type errors
const doNotRun = () => {
	const toaster = createToaster<{
		default: Record<string, never>
		error: { error: 'error' }
	}>()

	// @ts-expect-error wrong, can not pass arbitrary arguments
	toaster.withOptions({
		any: 'thing',
		type: 'error',
	})({
		custom: { error: 'error' },
		text: 'wow',
	})

	// @ts-expect-error wrong, text is not allowed
	toaster.withOptions({ text: 'something' })

	// @ts-expect-error wrong, custom is not supported in withOptions
	toaster.withOptions({ custom: {}, type: 'default' })({
		// @ts-expect-error wrong, overriding types is not supported in withOptions
		custom: { error: 'error' },
		text: 'error',
		// @ts-expect-error wrong, overriding types is not supported in withOptions
		type: 'error',
	})

	// @ts-expect-error wrong, custom should be empty
	toaster.withOptions({ custom: {}, type: 'default' })({ text: 'wow' })

	// @ts-expect-error wrong, custom should not be empty
	toaster.withOptions({
		custom: {},
		type: 'error',
	})

	toaster.withOptions({ type: 'default' })({ text: 'wow' })
	toaster.withOptions({ type: 'default' })({ custom: {}, text: 'wow' })

	// @ts-expect-error wrong, can not override type
	toaster.withOptions({ type: 'error' })({
		custom: {
			error: 'error',
		},
		text: 'wow',
		type: 'default',
	})

	toaster.withOptions({ type: 'error' })({
		// @ts-expect-error wrong, custom should not be empty
		custom: {},
		text: 'wow',
	})

	toaster.withOptions({ type: 'error' })({
		custom: { error: 'error' },
		text: 'wow',
	})
	toaster.withOptions({
		duration: 5000,
		type: 'error',
	})({
		custom: { error: 'error' },
		duration: 6000,
		text: 'wow',
	})

	// @ts-expect-error wrong, text was not provided
	toaster.withOptions({ type: 'default' })({
		duration: 4000,
	})

	// @ts-expect-error wrong, custom was not provided
	toaster.withOptions({ type: 'error' })({
		text: 'wow',
	})

	// @ts-expect-error wrong, text was not provided
	toaster.withOptions({ type: 'error' })({
		custom: { error: 'error' },
	})

	toaster.withOptions({ type: 'default' })({
		// @ts-expect-error wrong, can not override type
		custom: { error: 'error' },
		text: 'wow',
		// @ts-expect-error wrong, can not override type
		type: 'error',
	})

	// @ts-expect-error wrong, custom should not be empty
	toaster.withOptions({ duration: 5000 })({
		custom: {}, // wrong
		text: 'wow',
		type: 'error',
	})

	toaster.withOptions({ duration: 5000 })({
		// @ts-expect-error wrong, custom should be empty
		custom: { error: 'error' },
		text: 'wow',
		type: 'default',
	})

	toaster.withOptions({ duration: 5000 })({
		custom: { error: 'error' },
		text: 'wow',
		type: 'error',
	})

	// return types

	const myToaster = createToaster<{
		default: Record<string, never>
		error: { error: 'error' }
		success: { success: 'success' }
	}>()

	const res1 = myToaster.show({
		custom: {
			error: 'error',
			key: true, // error
		},
		text: 'wow',
		type: 'error',
	})

	// @ts-expect-error expected type test failurue, should only allow toast1.custom.success
	res1.custom.success
	res1.custom.error

	res1.metadata
}

// make linters happy
if (Math.random() > 2) doNotRun()
