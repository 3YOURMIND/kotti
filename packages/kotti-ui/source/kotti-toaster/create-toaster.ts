import { nanoid } from 'nanoid'
import { z } from 'zod'

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
		type: z.string(),
	})
	.strict()

export type QueuedToast = z.output<typeof queuedToastSchema>

const renderedMessageSchema = z
	.object({
		custom: customSchema,
		metadata: metadataSchema,
		progress: z.number().min(0).max(1).nullable(),
		text: z.string(),
		type: z.string(),
	})
	.strict()

export type RenderedMessage = z.output<typeof renderedMessageSchema>

const messageSchema = z
	.object({
		custom: customSchema.default(() => ({})),
		duration: durationSchema.default(null),
		metadata: z
			.object({
				abortController: z
					.instanceof(globalThis.AbortController)
					.default(() => new globalThis.AbortController()),
				id: z.string().default(nanoid),
			})
			.strict()
			.default(() => ({})),
		text: z.string(),
		type: z.string().default('default'),
	})
	.strict()

const showResultSchema = z
	.object({
		abort: z.function(z.tuple([]), z.void()),
		custom: customSchema,
		done: z.promise(z.literal('deleted')),
		metadata: metadataSchema,
		text: z.string(),
	})
	.strict()

// const showSchema = z.function().args(messageSchema).returns(showResultSchema)

const subscribeHandlerSchema = z
	.function()
	.args(z.array(renderedMessageSchema))
	.returns(z.union([z.promise(z.void()), z.void()]))

type SubscribeHandler = z.output<typeof subscribeHandlerSchema>

type IsEmptyObject<T> = T extends Record<string, never> ? true : false

type Message<TYPES extends Record<string, Record<string, unknown>>> = {
	[TYPE in keyof TYPES]: (IsEmptyObject<TYPES[TYPE]> extends true
		? { custom?: TYPES[TYPE] }
		: { custom: TYPES[TYPE] }) &
		(TYPE extends 'default' ? { type?: 'default' } : { type: TYPE })
}[keyof TYPES] &
	Omit<z.input<typeof messageSchema>, 'custom' | 'type'>

type Show<
	TYPES extends Record<string, Record<string, unknown>>,
	TYPE extends keyof TYPES = keyof TYPES,
> = (message: Message<Record<TYPE, TYPES[TYPE]>>) => {
	abort: () => void
	custom: TYPES[TYPE]
	done: Promise<'deleted'>
	metadata: z.output<typeof metadataSchema>
	text: string
}

// type Prettify<T> = {
// 	[K in keyof T]: T[K]
// } & {}

type WithOptions2<TYPES extends Record<string, Record<string, unknown>>> = {
	[TYPE in keyof TYPES]: (options: {
		custom?: TYPES[TYPE]
		duration?: number | null
		type?: TYPE
	}) => Show<Record<TYPE, TYPES[TYPE]>, TYPE>
}[keyof TYPES]

type WithOptions<
	TYPES extends Record<string, Record<string, unknown>>,
	TYPE extends keyof TYPES = keyof TYPES,
	OPTIONS extends Partial<Parameters<Show<TYPES, TYPE>>[0]> = Partial<
		Parameters<Show<TYPES, TYPE>>[0]
	>,
> = (options: OPTIONS) => (
	message: Omit<Message<Record<TYPE, TYPES[TYPE]>>, keyof OPTIONS>,
) => {
	abort: () => void
	custom: TYPES[TYPE]
	done: Promise<'deleted'>
	metadata: z.output<typeof metadataSchema>
	text: string
}

type X = WithOptions<{ success: { tbd: true } }>

export type ToasterReturn<
	TYPES extends Record<string, Record<string, unknown>>,
> = {
	abort: (toastId: string) => void
	show: Show<Record<'default', {}> & TYPES>
	// withOptions: (
	// 	options: Partial<
	// 		{
	// 			[TYPE in keyof TYPES]: IsEmptyObject<TYPES[TYPE]> extends true
	// 				? {
	// 						custom?: TYPES[TYPE]
	// 						duration: number | null
	// 						type: TYPE
	// 					}
	// 				: {
	// 						custom: TYPES[TYPE]
	// 						duration: number | null
	// 						type: TYPE
	// 					}
	// 		}[keyof TYPES]
	// 	>,
	// ) => Show<TYPES>
	withOptions: WithOptions<TYPES>

	// internal
	_internal_pls_dont_touch: {
		requestDelete: (toastId: string) => void
		subscribe: (handler: z.output<typeof subscribeHandlerSchema>) => void
		unsubscribe: () => void
	}
}

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
				let animationFrameId: number | null = null
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
	beginTime: number
	endTime: number | null
	message: QueuedToast
	progress: number | null
}

const INTERNAL_ABORT = 'INTERNAL_ABORT'

const calculateProgress = (start: number, now: number, end: number): number => {
	const unclamped = (now - start) / (end - start)
	return Math.max(Math.min(unclamped, 1), 0)
}

export const createToaster = <
	T extends Record<string, Record<string, unknown>> = { default: {} },
>(
	_options: CreateToasterOptions = {},
): ToasterReturn<T> => {
	const options = createToasterOptions.parse(_options)

	const fifoToasterQueue: Array<QueuedToast> = []
	const activeToasts: Array<ActiveToast> = []

	let subscriber: SubscribeHandler | null = null
	const notifySubscriber = () => {
		if (subscriber === null) return

		void subscriber(
			activeToasts.map((x) => ({
				custom: x.message.custom,
				metadata: x.message.metadata,
				progress: x.progress,
				text: x.message.text,
				type: x.message.type,
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

	/**
	 * Updates the list of active toasts, managing their display duration and progress.
	 *
	 * - If a toast has an `endTime`, it calculates its progress based on the current time.
	 * - If a toast's progress reaches 100%, it is deleted and resolved.
	 * - If there is room for more toasts, it moves items from the `fifoToasterQueue` to `activeToasts`.
	 * - Manages the animation frame, starting or stopping it based on whether there are active toasts.
	 * - Notifies the subscriber if the state of `activeToasts` changes.
	 */
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

			toast.progress = calculateProgress(
				toast.beginTime,
				Date.now(),
				toast.endTime,
			)
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
				beginTime: Date.now(),
				endTime: message.duration ? Date.now() + message.duration : null,
				message,
				progress: message.duration ? 0 : null,
			})
			dirty = true
		}

		const isRunning = options.animationFrame.getIsRunning()
		const isNowEmpty = activeToasts.length === 0

		if (!isRunning && !isNowEmpty) {
			options.animationFrame.start(() => {
				updateActiveToasts()
			})
		} else if (isRunning && isNowEmpty) {
			options.animationFrame.stop()
		}

		if (dirty) notifySubscriber()
	}

	const show: ToasterReturn<T>['show'] = (message) => {
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
			type: options.type,
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
			type: options.type,
		}
	}

	return {
		abort: (toastId: string) => {
			deleteAndAbortToast('abort', toastId)
		},
		show,
		withOptions: (options = {}) => {
			return (pushOptions) => {
				const mergedOptions = {
					...options,
					...pushOptions,
				}

				return show(mergedOptions)
			}
		},
		/**
		 * The methods in here expose the toasts from `activeToasts` to a single subscriber.
		 * Toasts from `fifoToasterQueue` are kept private.
		 *
		 * The subscriber:
		 * - gets updated whenever `activeToasts` gets mutated
		 * - can delete a specific toast by id
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
	}
}
