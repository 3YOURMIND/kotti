import { z } from 'zod'

import { defaultParser, defaultPostEscapeParser } from './utilities'

const idSchema = z.union([z.number(), z.string()])

export namespace KottiComment {
	export enum EntryType {
		POST = 'POST',
		REPLY = 'REPLY',
	}
	export const entryTypeSchema = z.nativeEnum(EntryType)

	export const userSchema = z.object({
		avatar: z.string().optional(),
		id: idSchema,
		name: z.string(),
	})
	export type User = z.output<typeof userSchema>

	export const commentSchema = z.object({
		createdAt: z.string().nullable().default(null),
		id: idSchema,
		isDeletable: z.boolean().default(false),
		isEditable: z.boolean().default(false),
		isInternalThread: z.boolean().default(false),
		isModified: z.boolean().default(false),
		message: z.string(),
		user: userSchema,
	})

	const parseFunctionSchema = z.function().args(z.string()).returns(z.string())

	const sharedSchema = commentSchema.extend({
		dangerouslyOverrideParser: parseFunctionSchema.default(defaultParser),
		postEscapeParser: parseFunctionSchema.default(defaultPostEscapeParser),
	})

	export namespace Reply {
		export const schema = commentSchema.omit({ isInternalThread: true })
		export type Props = z.input<typeof schema>
		export type PropsInternal = z.output<typeof schema>
	}

	export const propsSchema = sharedSchema.extend({
		replies: z.array(Reply.schema),
	})
	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>

	export namespace Actions {
		export const schema = commentSchema
			.pick({
				isDeletable: true,
				isEditable: true,
			})
			.extend({
				showReply: z.boolean().default(false),
			})
		export type PropsInternal = z.output<typeof schema>
	}

	export namespace Entry {
		export const schema = sharedSchema.extend({
			type: entryTypeSchema,
			parentId: idSchema.optional(),
		})
		export type PropsInternal = z.output<typeof schema>
	}

	export namespace Header {
		export const schema = commentSchema.pick({
			createdAt: true,
			isInternalThread: true,
			isModified: true,
			user: true,
		})
		export type PropsInternal = z.output<typeof schema>
	}

	export namespace Events {
		export type Add = {
			message: PropsInternal['message']
			parentId?: PropsInternal['id']
			replyToUserId: PropsInternal['user']['id']
		}

		export type Delete = {
			id: PropsInternal['id']
			parentId?: PropsInternal['id']
		}

		export type Edit = {
			id: PropsInternal['id']
			message: PropsInternal['message']
			parentId?: PropsInternal['id']
		}
	}

	export type Translations = {
		deleteButton: string
		editButton: string
		editedLabel: string
		internalThreadLabel: string
		postButton: string
		replyButton: string
		replyToLabel: string
	}
}

export namespace KottiCommentInput {
	export const propsSchema = z.object({
		isInline: z.boolean().default(false),
		parentId: idSchema.optional(),
		placeholder: z.string().optional(),
		replyToUserId: z.number().optional(),
		userAvatar: z.string().optional(),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
