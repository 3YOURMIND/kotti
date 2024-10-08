import { nanoid } from 'nanoid'
import { z } from 'zod'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { createDeferred } from './create-deferred'

const customSchema = z.record(z.unknown())

const durationSchema = z.number().int().finite().positive().nullable()

const metadataSchema = z
	.object({
		abortController: z.instanceof(globalThis.AbortController),
		id: z.string(),
	})
	.strict()

const queuedToastSchema = z
	.object({
		custom: customSchema,
		deferred: z
			.object({
				promise: z.promise(z.literal('deleted')),
				reject: z.function().args(z.unknown()).returns(z.void()),
				resolve: z.function().args(z.literal('deleted')).returns(z.void()),
			})
			.strict(),
		duration: durationSchema,
		metadata: metadataSchema,
		text: z.string(),
	})
	.strict()

export type QueuedToast = z.output<typeof queuedToastSchema>

const renderedMessageSchema = z
	.object({
		custom: customSchema,
		metadata: metadataSchema,
		progress: z.number().min(0).max(1),
		text: z.string(),
	})
	.strict()

export type RenderedMessage = z.output<typeof renderedMessageSchema>

const pushResultSchema = z
	.object({
		abort: z.function(z.tuple([]), z.void()),
		custom: customSchema,
		done: z.promise(z.literal('deleted')),
		text: z.string(),
		metadata: metadataSchema,
	})
	.strict()

const messageSchema = z
	.object({
		custom: customSchema.default(() => ({})),
		duration: durationSchema.default(null),
		text: z.string(),
		metadata: z
			.object({
				abortController: z
					.instanceof(globalThis.AbortController)
					.default(() => new globalThis.AbortController()),
				id: z.string().default(nanoid),
			})
			.strict()
			.default(() => ({})),
	})
	.strict()

const pushOptionsSchema = z
	.object({
		custom: customSchema.default(() => ({})),
		duration: durationSchema.default(null),
		id: z.string().default(nanoid),
		type: z.string(),
	})
	.strict()
const pushSchema = z.function().args(messageSchema).returns(pushResultSchema)

const subscribeHandlerSchema = z
	.function()
	.args(z.array(renderedMessageSchema))
	.returns(z.union([z.promise(z.void()), z.void()]))

type SubscribeHandler = z.output<typeof subscribeHandlerSchema>

export const toasterReturnSchema = z.object({
	abort: z.function(z.tuple([z.string()]), z.void()),
	createPusher: z
		.function()
		.args(pushOptionsSchema.partial())
		.returns(pushSchema),
	push: pushSchema,

	// internal
	_internal_pls_dont_touch: z
		.object({
			requestDelete: z.function().args(z.string()).returns(z.void()),
			subscribe: z.function().args(subscribeHandlerSchema).returns(z.void()),
			unsubscribe: z.function().args().returns(z.void()),
		})
		.strict(),
})

type ToasterReturn = z.output<typeof toasterReturnSchema>

const createToasterOptions = z
	.object({
		animationFrame: z
			.object({
				getIsRunning: z.function().args().returns(z.boolean()),
				start: z
					.function()
					.args(z.function().args().returns(z.void()))
					.returns(z.void()),
				stop: z.function().args().returns(z.void()),
			})
			.strict()
			.default(() => {
				let animationFrameId: null | number = null
				return {
					getIsRunning: () => animationFrameId !== null,
					start: (update) => {
						const animate = () => {
							// eslint-disable-next-line no-console
							console.log('create-toaster: update')
							animationFrameId = globalThis.requestAnimationFrame(animate)
							update()
						}
						animationFrameId = globalThis.requestAnimationFrame(animate)
					},
					stop: () => {
						if (animationFrameId) {
							globalThis.cancelAnimationFrame(animationFrameId)
							animationFrameId = null
						}
					},
				}
			}),
		numberOfToasts: z.number().int().positive().finite().default(3),
	})
	.strict()
	.default(() => ({}))

type CreateToasterOptions = z.input<typeof createToasterOptions>

type ActiveToast = {
	beginTime: Dayjs
	endTime: Dayjs | null
	message: QueuedToast
	progress: number
}

const INTERNAL_ABORT = 'INTERNAL_ABORT'

export const createToaster = (
	_options: CreateToasterOptions = {},
): ToasterReturn => {
	const options = createToasterOptions.parse(_options)
	let subscriber: SubscribeHandler | null = null

	const fifoToasterQueue: Array<QueuedToast> = []
	const activeToasts: Array<ActiveToast> = []

	// let animationFrameId: number | null = null

	const notifySubscriber = () => {
		if (subscriber === null) return

		void subscriber(
			activeToasts.map((x) => ({
				custom: x.message.custom,
				progress: x.progress,
				metadata: x.message.metadata,
				text: x.message.text,
			})),
		)
	}

	const deleteToastFromActiveToasts = (toastId: string) => {
		const index = activeToasts.findIndex(
			(toast) => toast.message.metadata.id === toastId,
		)
		if (index === -1)
			throw new Error(
				`could not find toast in activeToasts with id “${toastId}”`,
			)

		const removedToast = activeToasts.splice(index, 1)[0]

		if (!removedToast)
			throw new Error(
				`could not find toast in activeToasts with id “${toastId}”`,
			)

		notifySubscriber()
		return removedToast.message
	}

	const deleteToastFromFifoQueue = (toastId: string) => {
		const index = fifoToasterQueue.findIndex(
			(toast) => toast.metadata.id === toastId,
		)
		if (index === -1)
			throw new Error(
				`could not find toast in fifoToasterQueue with id “${toastId}”`,
			)

		const removedToast = fifoToasterQueue.splice(index, 1)[0]

		if (!removedToast)
			throw new Error(
				`could not find toast in fifoToasterQueue with id “${toastId}”`,
			)

		// TODO notifySubscriber()
		return removedToast
	}

	const deleteAndAbortToast = (mode: 'abort' | 'delete', toastId: string) => {
		const removedToast = activeToasts.some(
			(toast) => toast.message.metadata.id === toastId,
		)
			? deleteToastFromActiveToasts(toastId)
			: deleteToastFromFifoQueue(toastId)

		switch (mode) {
			case 'abort': {
				const { abortController } = removedToast.metadata
				if (!abortController.signal.aborted) {
					abortController.abort(INTERNAL_ABORT)
				}
				removedToast.deferred.reject(
					abortController.signal.aborted
						? abortController.signal.reason
						: 'aborted',
				)
				break
			}
			case 'delete': {
				removedToast.deferred.resolve('deleted')
				break
			}
		}
	}

	// const stop = () => {
	// 	if (animationFrameId) {
	// 		globalThis.cancelAnimationFrame(animationFrameId)
	// 		animationFrameId = null
	// 	}
	// }

	// const start = () => {
	// 	const animate = () => {
	// 		console.log('animate')
	// 		animationFrameId = globalThis.requestAnimationFrame(animate)
	// 		// eslint-disable-next-line @typescript-eslint/no-use-before-define -- FIXME
	// 		updateActiveToasts()
	// 	}
	// 	animationFrameId = globalThis.requestAnimationFrame(animate)
	// }

	const updateActiveToasts = (_dirty = false) => {
		if (subscriber === null) return
		let dirty = _dirty

		let index = 0
		while (index < activeToasts.length) {
			const toast = activeToasts[index] as ActiveToast

			if (toast.endTime === null) {
				index++
				continue
			}
			const now = dayjs()

			const current = now.valueOf() - toast.beginTime.valueOf()
			const delta = toast.endTime.valueOf() - toast.beginTime.valueOf()

			toast.progress = Math.max(Math.min(current / delta, 1), 0)
			dirty = true

			if (toast.progress >= 1) {
				deleteAndAbortToast('delete', toast.message.metadata.id)
				continue
			}
			index++
		}

		while (activeToasts.length < options.numberOfToasts) {
			const message = fifoToasterQueue.shift() ?? null
			if (message === null) break

			activeToasts.push({
				beginTime: dayjs(),
				endTime: message.duration
					? dayjs().add(message.duration, 'milliseconds')
					: null,
				message,
				progress: 0,
			})
			dirty = true
		}

		const isNowEmpty = activeToasts.length === 0

		if (!options.animationFrame.getIsRunning() && !isNowEmpty) {
			options.animationFrame.start(() => {
				updateActiveToasts()
			})
		} else if (options.animationFrame.getIsRunning() && isNowEmpty) {
			options.animationFrame.stop()
		}

		if (!dirty) return

		notifySubscriber()
	}

	const push: ToasterReturn['push'] = (message) => {
		const options = messageSchema.parse(message)

		const doneDeferred = createDeferred<'deleted'>()
		const { signal } = options.metadata.abortController

		signal.addEventListener('abort', () => {
			if (signal.reason !== INTERNAL_ABORT)
				deleteAndAbortToast('abort', options.metadata.id)
		})

		fifoToasterQueue.push({
			custom: options.custom,
			deferred: doneDeferred,
			duration: options.duration,
			metadata: options.metadata,
			text: options.text,
		})

		updateActiveToasts()

		return {
			abort: () => {
				deleteAndAbortToast('abort', options.metadata.id)
			},
			custom: options.custom,
			done: doneDeferred.promise,
			metadata: options.metadata,
			text: options.text,
		}
	}

	return {
		abort: (toastId: string) => {
			deleteAndAbortToast('abort', toastId)
		},
		createPusher: (options = {}) => {
			return (pushOptions) => {
				const mergedOptions = {
					...options,
					...pushOptions,
				}

				return push(mergedOptions)
			}
		},
		/**
		 * The methods in here expose the toasts from `activeToasts` to a single subscriber.
		 * Toasts from `fifoToasterQueue` are kept private.
		 * The subscriber:
		 *   - gets updated whenever `activeToasts` gets mutated
		 *   - can delete a specific toast by id
		 */
		_internal_pls_dont_touch: {
			requestDelete: (deleteId) => {
				deleteAndAbortToast('delete', deleteId)
				updateActiveToasts(true)
			},
			subscribe: (handler) => {
				if (subscriber)
					throw new Error(
						'create-toaster: toaster already has a subscriber, aborting',
					)

				subscriber = handler

				updateActiveToasts(true)
			},
			unsubscribe: () => {
				if (!subscriber)
					throw new Error(
						'create-toaster: toaster currently has no subscriber, aborting',
					)

				subscriber = null
			},
		},
		push,
	}
}
