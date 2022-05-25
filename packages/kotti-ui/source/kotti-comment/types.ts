import { z } from 'zod'

import { defaultParser, defaultPostEscapeParser } from './utilities'

const commentIdSchema = z.union([z.number(), z.string()])
export namespace KottiComment {
	const parseFunctionSchema = z.function().args(z.string()).returns(z.string())

	export const commentSchema = z.object({
		createdTime: z.string().optional(),
		id: commentIdSchema.optional(),
		isDeletable: z.boolean().default(false),
		isEditable: z.boolean().default(false),
		message: z.string(),
		userAvatar: z.string().optional(),
		userId: z.number().optional(),
		userName: z.string().optional(),
	})

	export const propsSchema = commentSchema.extend({
		dangerouslyOverrideParser: parseFunctionSchema.default(defaultParser),
		postEscapeParser: parseFunctionSchema.default(defaultPostEscapeParser),
		replies: z.array(commentSchema).optional(),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>

	export namespace Events {
		export type Delete = {
			id: string | number
			parentId: string | number | null
		}

		export type Edit = {
			id: string | number
			message: string
		}

		export type Submit = {
			message: string
			replyToUserId: number
			parentId: string | number
		}
	}

	export type Translations = {
		deleteButton: string
		editButton: string
		postButton: string
		replyButton: string
		replyPlaceholder: string
	}
}

export namespace KottiCommentInput {
	export const propsSchema = z.object({
		isInline: z.boolean().default(false),
		parentId: commentIdSchema.optional(),
		placeholder: z.string().optional(),
		replyToUserId: z.number().optional(),
		userAvatar: z.string().optional(),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
