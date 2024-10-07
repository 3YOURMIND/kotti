import { nanoid } from 'nanoid'
import { z } from 'zod'
import dayjs from 'dayjs'
import { Dayjs } from 'dayjs'
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
				promise: z.promise(z.void()),
				reject: z.function().args(z.unknown()).returns(z.void()),
				resolve: z.function().args(z.undefined()).returns(z.void()),
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
		done: z.promise(z.void()),
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

export const createToaster = (
	_options: CreateToasterOptions = {},
): ToasterReturn => {
	const options = createToasterOptions.parse(_options)
	let subscriber: SubscribeHandler | null = null

	const fifoToasterQueue: Array<QueuedToast> = []
	const activeToasts: Array<ActiveToast> = []

	let animationFrameId: number | null = null

	const notifySubscriber = () => {
		if (subscriber === null)
			throw new Error('could not find subscriber to notify')

		void subscriber(
			activeToasts.map((x) => ({
				custom: x.message.custom,
				progress: x.progress,
				metadata: x.message.metadata,
				text: x.message.text,
			})),
		)
	}

	const stop = () => {
		if (animationFrameId) {
			globalThis.cancelAnimationFrame(animationFrameId)
			animationFrameId = null
		}
	}

	const start = () => {
		const animate = () => {
			console.log('animate')
			animationFrameId = globalThis.requestAnimationFrame(animate)
			// eslint-disable-next-line @typescript-eslint/no-use-before-define -- FIXME
			updateActiveToasts()
		}
		animationFrameId = globalThis.requestAnimationFrame(animate)
	}

	const updateActiveToasts = () => {
		if (subscriber === null) return

		const wasEmpty = activeToasts.length === 0

		let dirty = false

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
				activeToasts.splice(index, 1)
				continue
			}
			index++
		}

		while (activeToasts.length < options.numberOfToasts) {
			const message = fifoToasterQueue.shift() ?? null
			if (message === null) break

			// const { signal } = message.metadata.abortController

			// if (signal.aborted) {
			// 	message.deferred.reject(signal.reason)
			// 	continue
			// }

			// const timeout = globalThis.setTimeout(() => {
			// 	const toBeRemovedIndex = fifoToasterQueue.findIndex(
			// 		({ metadata }) => metadata.id === options.metadata.id,
			// 	)

			// 	if (toBeRemovedIndex === -1)
			// 		throw new Error(
			// 			`could not find to be removed notification “${options.metadata.id}”`,
			// 		)

			// 	fifoToasterQueue.splice(toBeRemovedIndex, 1)

			// 	resolve()
			// }, options.duration ?? 3000) // TODO: persistent toast support

			// // TODO: possible memory leak
			// signal.addEventListener('abort', () => {
			// 	globalThis.clearTimeout(timeout)
			// 	reject(signal.reason)
			// })

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

		if (!dirty) return

		notifySubscriber()
		if (wasEmpty && !isNowEmpty) {
			start()
		} else if (!wasEmpty && isNowEmpty) {
			stop()
		}
	}

	const push: ToasterReturn['push'] = (message) => {
		const options = messageSchema.parse(message)

		const doneDeferred = createDeferred()

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
				// TODO: will it work
				options.metadata.abortController.abort()
			},
			custom: options.custom,
			done: doneDeferred.promise,
			metadata: options.metadata,
			text: options.text,
		}
	}

	return {
		abort: (id: string) => {
			// FIXME: this function needs to be redone

			const toBeRemovedIndex = fifoToasterQueue.findIndex(
				({ metadata }) => metadata.id === id,
			)

			if (toBeRemovedIndex === -1)
				throw new Error(`could not find to be removed notification “${id}”`)

			const removedQueueItem = fifoToasterQueue.splice(toBeRemovedIndex, 1)[0]

			if (!removedQueueItem)
				throw new Error(`could not find to be removed notification “${id}”`)

			removedQueueItem.metadata.abortController.abort()
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
		_internal_pls_dont_touch: {
			requestDelete: (deleteId) => {
				const index = activeToasts.findIndex(
					(toast) => toast.message.metadata.id === deleteId,
				)
				if (index === -1)
					throw new Error(`could not find toast with id ${deleteId}`)

				activeToasts.splice(index, 1)
				updateActiveToasts()
			},
			subscribe: (handler) => {
				if (subscriber)
					throw new Error(
						'create-toaster: toaster already has a subscriber, aborting',
					)

				subscriber = handler

				updateActiveToasts()
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
