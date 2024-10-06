import { nanoid } from 'nanoid'
import { z } from 'zod'

const internalMessageSchema = z
	.object({
		abort: z.function(z.tuple([]), z.void()),
		done: z.promise(z.void()),
		metadata: z
			.object({
				abortController: z.instanceof(AbortController),
				id: z.string(),
			})
			.strict(),
	})
	.strict()

export type InternalMessage = z.output<typeof internalMessageSchema>

const pushResultSchema = z
	.object({
		abort: z.function(z.tuple([]), z.void()),
		done: z.promise(z.void()),
		metadata: z.object({
			abortController: z.instanceof(AbortController),
			id: z.string(),
		}),
	})
	.strict()

const messageSchema = z
	.object({
		custom: z.record(z.unknown()).optional(),
		id: z.string().default(nanoid), // TODO: re-consider defaulting here
		text: z.string(),
		metadata: z
			.object({
				abortController: z.instanceof(AbortController),
				id: z.string(),
			})
			.strict()
			.optional(),
	})
	.strict()

const pushOptionsSchema = z
	.object({
		custom: z.record(z.unknown()).default(() => ({})),
		duration: z.number().positive().finite().int().nullable().default(null),
		id: z.string().default(nanoid),
		type: z.string(),
	})
	.strict()
const pushSchema = z.function().args(messageSchema).returns(pushResultSchema)

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
			pollMessage: z
				.function()
				.args()
				.returns(internalMessageSchema.nullable()),
			subscribe: z
				.function()
				.args(
					z
						.function()
						.args()
						.returns(z.union([z.promise(z.void()), z.void()])),
				)
				.returns(z.void()),
			unsubscribe: z.function().args().returns(z.void()),
		})
		.strict(),
})

type ToasterReturn = z.output<typeof toasterReturnSchema>

export const createToaster = (): ToasterReturn => {
	let toastReceiver: (() => Promise<void> | void) | null = null

	const fifoToasterQueue: Array<InternalMessage> = []

	const push: ToasterReturn['push'] = (message) => {
		const options = messageSchema.parse(message)

		const { id } = options
		// const parsedArguments = value.schema.parse(rawArguments)
		const abortController = new AbortController()
		const signal = abortController.signal

		const donePromise = new Promise<void>((resolve, reject) => {
			if (signal.aborted) return reject(signal.reason)

			console.log('showing notification')
			const timeout = globalThis.setTimeout(() => {
				resolve()
			}, 5000) // options.duration

			// TODO: possible memory leak
			signal.addEventListener('abort', () => {
				console.log('deleting notification')
				globalThis.clearTimeout(timeout)
				reject(signal.reason)
			})
		})

		const queueItem: InternalMessage = {
			abort: () => abortController.abort(),
			// custom: {},
			done: donePromise,
			metadata: {
				abortController,
				id,
			},
		}
		fifoToasterQueue.push(queueItem)

		toastReceiver?.()

		return queueItem
	}

	return {
		abort: (id: string) => {
			console.log(`aborting ${id}`)

			const toBeRemovedIndex = fifoToasterQueue.findIndex(
				({ metadata }) => metadata.id === id,
			)

			if (toBeRemovedIndex === -1)
				throw new Error(`could not find to be removed notification “${id}”`)

			const removedQueueItem = fifoToasterQueue.slice(toBeRemovedIndex, 1)[0]

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
			pollMessage: () => {
				return fifoToasterQueue.shift() ?? null
			},
			subscribe: (handler: () => Promise<void> | void) => {
				if (toastReceiver)
					throw new Error(
						'create-toaster: toaster already has a subscriber, aborting',
					)

				toastReceiver = handler

				// TODO: Consider calling toastReceiver here to get things started
				// toastReceiver()
			},
			unsubscribe: () => {
				if (!toastReceiver)
					throw new Error(
						'create-toaster: toaster currently has no subscriber, aborting',
					)

				toastReceiver = null
			},
		},
		push,
	}
}

// export function useDebouncedRef(value, delay = 200) {
// 	let timeout
// 	return customRef((track, trigger) => {
// 		return {
// 			get() {
// 				track()
// 				return value
// 			},
// 			set(newValue) {
// 				clearTimeout(timeout)
// 				timeout = setTimeout(() => {
// 					value = newValue
// 					trigger()
// 				}, delay)
// 			},
// 		}
// 	})
// }
