import { describe, expect, it, jest } from 'bun:test'

import { createToaster } from './create-toaster'

describe('createToaster', () => {
	it('returns things', () => {
		const toaster = createToaster()

		expect(toaster).toEqual({
			_internal_pls_dont_touch: expect.anything(),
			abort: expect.anything(),
			createPusher: expect.anything(),
			push: expect.anything(),
		} as any)
	})

	describe('.abort()', () => {
		it('can abort a toast', () => {
			const toaster = createToaster()
			const toast = toaster.push({ duration: 1, text: 'test' })
			expect(() => toaster.abort(toast.metadata.id)).not.toThrow()
			expect(toast.metadata.abortController.signal.aborted).toBe(true)
			expect(toast.done).rejects.toThrow('The operation was aborted.')
		})

		it('throws for unknown toasts', () => {
			const toaster = createToaster()
			const toast = toaster.push({ duration: 1, text: 'test' })
			expect(() => toaster.abort('not-a-real-toast')).toThrow(
				'could not find to be removed notification “not-a-real-toast”',
			)
			expect(toast.metadata.abortController.signal.aborted).toBe(false)
			expect(toast.done).resolves.toBe(undefined)
		})
	})

	describe('.createPusher()', () => {
		it('can create a pusher', () => {
			const toaster = createToaster()
			const pusher = toaster.createPusher({
				/* type: 'success' */
			})
			expect(pusher).toBeFunction()
		})

		it('can push to a pusher', () => {
			const toaster = createToaster()
			const pusher = toaster.createPusher({
				/* type: 'success' */
			})
			expect(() =>
				pusher({ duration: 1, text: 'some text' }),
			).not.toThrowError()
		})
	})

	describe('.push()', () => {
		it('can push', () => {
			const toaster = createToaster()
			const toast = toaster.push({ duration: 1, text: 'example toast' })

			expect(toast.text).toBe('example toast')
			expect(toast.done).resolves.toBe(undefined)
		})

		it('correctly handles durations', async () => {
			const toaster = createToaster()

			const wait = (ms: number) =>
				new Promise((_resolve, reject) => {
					setTimeout(() => reject(`timeout after ${ms}ms`), ms)
				})

			const fastToast = toaster.push({ duration: 1, text: 'fast toast' })
			expect(Promise.race([fastToast.done, wait(10)])).resolves.toBe(undefined)

			const slowToast = toaster.push({ duration: 100, text: 'slow toast' })
			expect(Promise.race([slowToast.done, wait(200)])).resolves.toBe(undefined)

			const superSlowToast = toaster.push({
				duration: 500,
				text: 'super slow toast',
			})
			expect(Promise.race([superSlowToast.done, wait(200)])).rejects.toThrow(
				'timeout',
			)
		})

		it('can push custom data', () => {
			const custom = { testing: true }

			const toaster = createToaster()
			const toast = toaster.push({ custom, duration: 1, text: 'example toast' })

			expect(toast.custom).toEqual(custom)
			expect(toast.done).resolves.toBe(undefined)
		})

		it('can push with metadata.id', () => {
			const toaster = createToaster()
			const toast = toaster.push({
				duration: 1,
				metadata: { id: 'foo' },
				text: 'example toast',
			})

			expect(toast.metadata.id).toEqual('foo')
			expect(toast.done).resolves.toBe(undefined)
		})

		it('can push with metadata.abortController', () => {
			const toaster = createToaster()
			const abortController = new AbortController()
			const toast = toaster.push({
				duration: 1,
				metadata: { abortController },
				text: 'example toast',
			})

			expect(toast.metadata.abortController).toBe(abortController)
			expect(() => toast.abort()).not.toThrow()
			expect(abortController.signal.aborted).toBe(true)
			expect(toast.done).rejects.toThrow('aborted')
		})

		describe('returns', () => {
			it('.abort()', () => {
				const toaster = createToaster()
				const toast = toaster.push({ duration: 1, text: '42' })

				expect(toast.metadata.abortController.signal.aborted).toBe(false)
				toast.abort()
				expect(toast.metadata.abortController.signal.aborted).toBe(true)
				expect(toast.done).rejects.toThrow('The operation was aborted')
			})

			it('supports await toast.done', async () => {
				const toaster = createToaster()
				const toast = toaster.push({ duration: 10, text: '42' })

				await toast.done
				expect(toaster._internal_pls_dont_touch.pollMessage()).toBe(null)
			})
		})
	})

	describe('._internal_pls_dont_touch', () => {
		describe('.pollMessage()', () => {
			it.skip('receives messages in FIFO order', () => {
				const toaster = createToaster()
				const handler = jest.fn()

				toaster.push({ text: 'test' })
				toaster.push({ text: 'test 2' })

				const { pollMessage } = toaster._internal_pls_dont_touch

				expect(handler.mock.calls).toEqual([])
				toaster._internal_pls_dont_touch.subscribe(handler)
				expect(handler.mock.calls).toEqual([[]])
				expect(pollMessage()!.text).toBe('test')
				expect(pollMessage()!.text).toBe('test 2')
				expect(pollMessage()).toBe(null)

				toaster.push({ text: 'test 3' })
				expect(handler.mock.calls).toEqual([[], []])
				expect(pollMessage()!.text).toBe('test 3')
				expect(pollMessage()).toBe(null)
			})
		})

		describe('.subscribe()', () => {
			it('can subscribe', () => {
				const toaster = createToaster()
				const handler = jest.fn()

				toaster._internal_pls_dont_touch.subscribe(handler)

				expect(handler.mock.calls).toEqual([])
				toaster.push({ text: 'test' })
				expect(handler.mock.calls).toEqual([[]])
			})

			it('correctly handles old toasts upon subscribing', () => {
				const toaster = createToaster()
				const handler = jest.fn()

				toaster.push({ text: 'test' })

				expect(handler.mock.calls).toEqual([])
				toaster._internal_pls_dont_touch.subscribe(handler)
				expect(handler.mock.calls).toEqual([[]])
			})

			it('prevents multiple simultaneous subscriptions', () => {
				const toaster = createToaster()
				const handler = () => {}

				expect(() =>
					toaster._internal_pls_dont_touch.subscribe(handler),
				).not.toThrow()

				expect(() =>
					toaster._internal_pls_dont_touch.subscribe(handler),
				).toThrow('toaster already has a subscriber')
			})
		})

		describe('.unsubscribe()', () => {
			it('can unsubscribe', () => {
				const toaster = createToaster()
				const handler = jest.fn()

				toaster._internal_pls_dont_touch.subscribe(handler)
				toaster._internal_pls_dont_touch.unsubscribe()

				expect(handler.mock.calls).toEqual([])
				toaster.push({ text: 'test' })
				expect(handler.mock.calls).toEqual([])
			})

			it('throws when unsubscribe without a subscription', () => {
				const toaster = createToaster()

				expect(() => toaster._internal_pls_dont_touch.unsubscribe()).toThrow(
					'toaster currently has no subscriber',
				)
			})
		})
	})
})
