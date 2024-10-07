import { nanoid } from 'nanoid'
import { z } from 'zod'

const customSchema = z.record(z.unknown())

const durationSchema = z.number().int().finite().positive().nullable()

const metadataSchema = z
	.object({
		abortController: z.instanceof(AbortController),
		id: z.string(),
	})
	.strict()

const internalMessageSchema = z
	.object({
		abort: z.function(z.tuple([]), z.void()),
		custom: customSchema,
		done: z.promise(z.void()),
		metadata: metadataSchema,
		text: z.string(),
	})
	.strict()

export type InternalMessage = z.output<typeof internalMessageSchema>

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
					.instanceof(AbortController)
					.default(() => new AbortController()),
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

		const { signal } = options.metadata.abortController

		const donePromise = new Promise<void>((resolve, reject) => {
			// FIXME: this function needs to be redone

			if (signal.aborted) return reject(signal.reason)

			const timeout = globalThis.setTimeout(() => {
				const toBeRemovedIndex = fifoToasterQueue.findIndex(
					({ metadata }) => metadata.id === options.metadata.id,
				)

				if (toBeRemovedIndex === -1)
					throw new Error(
						`could not find to be removed notification “${options.metadata.id}”`,
					)

				fifoToasterQueue.splice(toBeRemovedIndex, 1)

				resolve()
			}, options.duration ?? 3000) // TODO: persistent toast support

			// TODO: possible memory leak
			signal.addEventListener('abort', () => {
				globalThis.clearTimeout(timeout)
				reject(signal.reason)
			})
		})

		const queueItem: InternalMessage = {
			abort: () => options.metadata.abortController.abort(),
			custom: options.custom,
			done: donePromise,
			metadata: options.metadata,
			text: options.text,
		}
		fifoToasterQueue.push(queueItem)

		toastReceiver?.()

		return queueItem
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
			pollMessage: () => {
				// FIXME: this function needs to be redone
				return fifoToasterQueue.shift() ?? null
			},
			subscribe: (handler: () => Promise<void> | void) => {
				if (toastReceiver)
					throw new Error(
						'create-toaster: toaster already has a subscriber, aborting',
					)

				toastReceiver = handler

				// TODO: Consider always calling toastReceiver here (?)
				if (fifoToasterQueue.length) toastReceiver()
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
