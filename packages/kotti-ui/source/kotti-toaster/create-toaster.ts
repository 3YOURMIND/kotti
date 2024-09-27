import { nanoid } from 'nanoid'
import { z } from 'zod'

// const types: Record<string, { schema: z.Schema<unknown> }> = {
// 	success: {
// 		schema: z.object({}).strict(),
// 	},
// }

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
type PusherReturn = z.output<typeof pushResultSchema>

const pushOptionsSchema = z
	.object({
		custom: z.record(z.unknown()).default(() => ({})),
		duration: z.number().positive().finite().int().nullable().default(null),
		id: z.string().default(nanoid),
		type: z.string(),
	})
	.strict()
type PushOptions = z.output<typeof pushOptionsSchema>

const pushSchema = z.function(z.tuple([pushOptionsSchema]), pushResultSchema)

const queueItemSchema = z
	.object({
		abort: z.function(z.tuple([]), z.void()),
		custom: z.record(z.unknown()).optional(),
		done: z.promise(z.void()),
		metadata: z
			.object({
				abortController: z.instanceof(AbortController),
				id: z.string(),
			})
			.strict(),
	})
	.strict()
type QueueItem = z.output<typeof queueItemSchema>

export const toasterSchema = z
	.object({
		createPusher: z.function(
			z.tuple([pushOptionsSchema.partial()]),
			pushSchema,
		),
		abort: z.function(z.tuple([z.string()]), z.void()),
		push: pushSchema,
	})
	.strict()
export type Toaster = z.output<typeof toasterSchema>

export const createToaster = (/* toasterOptions = {} */): Toaster => {
	const queue: QueueItem[] = []

	const push = (options: PushOptions): PusherReturn => {
		const { id } = options
		// const parsedArguments = value.schema.parse(rawArguments)

		console.log('pushing')

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

		const queueItem: QueueItem = {
			abort: () => abortController.abort(),
			done: donePromise,
			custom: {},
			metadata: {
				abortController,
				id,
			},
		}

		queue.push(queueItem)

		return queueItem
	}

	return {
		abort: (id: string) => {
			console.log(`aborting ${id}`)
			const toBeRemovedIndex = queue.findIndex(
				({ metadata }) => metadata.id === id,
			)

			if (toBeRemovedIndex === -1)
				throw new Error(`could not find to be removed notification “${id}”`)

			const removedQueueItem = queue.slice(toBeRemovedIndex, 1)[0]

			if (!removedQueueItem)
				throw new Error(`could not find to be removed notification “${id}”`)

			removedQueueItem.metadata.abortController.abort()

			// delete from queue
		},
		createPusher: (options: Partial<PushOptions> = {}) => {
			return (pushOptions: PushOptions) => push({ ...options, ...pushOptions })
		},
		push,
	}
}
