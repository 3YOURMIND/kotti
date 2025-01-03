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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
		header: z.string().nullable(),
		metadata: metadataSchema,
		text: z.string(),
		type: z.string(),
	})
	.strict()

export type QueuedToast = z.output<typeof queuedToastSchema>

const renderedMessageSchema = z
	.object({
		custom: customSchema,
		duration: z.number().positive().finite().nullable(),
		header: z.string().nullable(),
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
		header: z.string().nullable().default(null),
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

const subscribeHandlerSchema = z
	.function()
	.args(z.array(renderedMessageSchema))
	.returns(z.union([z.promise(z.void()), z.void()]))

type SubscribeHandler = z.output<typeof subscribeHandlerSchema>

// utilties

type IsEmptyObject<T> = T extends Record<string, never> ? true : false

// messages

type MessageTypes = {
	[key: string]: Record<string, unknown>
	default: Record<string, never>
}

type Messages<MESSAGE_TYPES extends MessageTypes> = {
	[TYPE in keyof MESSAGE_TYPES]: Omit<
		z.input<typeof messageSchema>,
		'custom' | 'type'
	> &
		(IsEmptyObject<MESSAGE_TYPES[TYPE]> extends true
			? { custom?: MESSAGE_TYPES[TYPE] }
			: { custom: MESSAGE_TYPES[TYPE] }) &
		(TYPE extends 'default' ? { type?: 'default' } : { type: TYPE })
}

type MessagesNoDefault<MESSAGE_TYPES extends MessageTypes> = {
	[KEY in keyof MESSAGE_TYPES]: {
		duration?: number | null
		header?: string | null
		text: string
		type: KEY
	} & (IsEmptyObject<MESSAGE_TYPES[KEY]> extends true
		? { custom?: MESSAGE_TYPES[KEY] }
		: { custom: MESSAGE_TYPES[KEY] })
}

// show etc.

type ShowResult<
	MESSAGE_TYPES extends MessageTypes,
	TYPE extends keyof MESSAGE_TYPES,
> = {
	abort: () => void
	custom: MESSAGE_TYPES[TYPE]
	done: Promise<'deleted'>
	header: string | null
	metadata: z.output<typeof metadataSchema>
	text: string
}

type Show<MESSAGE_TYPES extends MessageTypes> = <
	MESSAGE extends Messages<MESSAGE_TYPES>[keyof MESSAGE_TYPES & string],
>(
	message: Exclude<
		keyof MESSAGE,
		keyof Messages<MESSAGE_TYPES>[keyof MESSAGE_TYPES & string]
	> extends never
		? MESSAGE
		: never,
) => ShowResult<
	MESSAGE_TYPES,
	MESSAGE extends { type: infer TYPE } ? TYPE : 'default'
>

type WithInferredOptions<
	MESSAGE_TYPES extends MessageTypes,
	OPTIONS extends {
		duration?: number | null
		type?: keyof MESSAGE_TYPES
	},
> = OPTIONS extends {
	duration?: number | null
	type: infer TYPE extends keyof MESSAGE_TYPES
}
	?
			| MessagesNoDefault<MESSAGE_TYPES>[TYPE]
			| Omit<Messages<MESSAGE_TYPES>[TYPE], 'type'>
	: Messages<MESSAGE_TYPES>[keyof MESSAGE_TYPES]

type WithOptions<MESSAGE_TYPES extends MessageTypes> = <
	BASE_OPTIONS extends {
		duration?: number | null
		type?: keyof MESSAGE_TYPES
	},
>(
	baseOptions: Exclude<keyof BASE_OPTIONS, 'duration' | 'type'> extends never
		? BASE_OPTIONS
		: `Argument "${Exclude<keyof BASE_OPTIONS & string, 'duration' | 'type'>}" is not supported`,
) => <OPTIONS extends WithInferredOptions<MESSAGE_TYPES, BASE_OPTIONS>>(
	options: Exclude<
		keyof OPTIONS,
		keyof WithInferredOptions<MESSAGE_TYPES, BASE_OPTIONS>
	> extends never
		? OPTIONS
		: `Argument "${Exclude<keyof OPTIONS & string, 'duration' | 'type'>}" is not supported`,
) => ShowResult<
	MESSAGE_TYPES,
	BASE_OPTIONS & OPTIONS extends {
		type: infer TYPE extends keyof MESSAGE_TYPES
	}
		? TYPE
		: 'default'
>

export type ToasterReturn<MESSAGE_TYPES extends MessageTypes> = {
	abort: (toastId: string) => void
	show: Show<MESSAGE_TYPES>
	withOptions: WithOptions<MESSAGE_TYPES>

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
							// Leave console log for now, so issues with the toaster have a chance to be detected
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
		// eslint-disable-next-line no-magic-numbers
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

// --------------------------------------------------------------- //
// --------------------------------------------------------------- //
// -- Begin of implementation ------------------------------------ //
// --------------------------------------------------------------- //
// --------------------------------------------------------------- //

export const createToaster = <
	MESSAGE_TYPES extends MessageTypes = { default: Record<string, never> },
>(
	_options: CreateToasterOptions = {},
): ToasterReturn<MESSAGE_TYPES> => {
	const options = createToasterOptions.parse(_options)

	const fifoToasterQueue: Array<QueuedToast> = []
	const activeToasts: Array<ActiveToast> = []

	let subscriber: SubscribeHandler | null = null
	const notifySubscriber = () => {
		if (subscriber === null) return

		void subscriber(
			activeToasts.map((toast) => ({
				custom: toast.message.custom,
				duration: toast.message.duration,
				header: toast.message.header,
				metadata: toast.message.metadata,
				progress: toast.progress,
				text: toast.message.text,
				type: toast.message.type,
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
	// eslint-disable-next-line sonarjs/cognitive-complexity
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

	const show: Show<MESSAGE_TYPES> = <
		MESSAGE,
		TYPE extends keyof MESSAGE_TYPES = MESSAGE extends {
			type: infer TYPE extends keyof MESSAGE_TYPES
		}
			? TYPE
			: 'default',
	>(
		message: MESSAGE,
	) => {
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
			header: options.header,
			metadata: options.metadata,
			text: options.text,
			type: options.type,
		})

		updateActiveToasts()

		return {
			abort: () => {
				deleteAndAbortToast('abort', options.metadata.id)
			},
			custom: options.custom as MESSAGE_TYPES[TYPE],
			done: doneDeferred.promise,
			header: options.header,
			metadata: options.metadata,
			text: options.text,
			type: options.type as TYPE,
		}
	}

	return {
		abort: (toastId: string) => {
			deleteAndAbortToast('abort', toastId)
		},
		show,
		withOptions: (baseOptions) => (options) =>
			show({
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				...(baseOptions as any),
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				...(options as any),
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			}) as any,
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

				options.animationFrame.stop()

				subscriber = null
			},
		},
	}
}
