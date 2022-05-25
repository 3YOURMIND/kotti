import { z } from 'zod'

import { defaultParser, defaultPostEscapeParser } from './utilities'

const commentIdSchema = z.union([z.number(), z.string()])

export namespace KottiComment {
	const parseFunctionSchema = z.function().args(z.string()).returns(z.string())

	export const commentSchema = z.object({
		createdTime: z.string().nullable().default(null),
		id: commentIdSchema.nullable().default(null),
		isDeletable: z.boolean().default(false),
		isEditable: z.boolean().default(false),
		message: z.string(),
		userAvatar: z.string().nullable().default(null),
		userId: z.number().nullable().default(null),
		userName: z.string().optional(),
	})

	const sharedSchema = commentSchema.extend({
		dangerouslyOverrideParser: parseFunctionSchema.default(defaultParser),
		postEscapeParser: parseFunctionSchema.default(defaultPostEscapeParser),
	})

	export namespace Reply {
		export type Props = z.input<typeof sharedSchema>
		export type PropsInternal = z.output<typeof sharedSchema>
	}

	export const propsSchema = sharedSchema.extend({
		replies: z.array(commentSchema).optional(),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>

	export namespace Events {
		export type Delete = {
			id: string | number
			parentId: string | number | null
		}

		/**
		 * Internal: editing one comment or one reply
		 */
		export type Edit = {
			id: string | number
			message: string
		}

		/**
		 * External: editing replies array
		 */
		export type EditReplies = PropsInternal['replies']

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

	export type UserData = Pick<PropsInternal, 'userName' | 'userId'>
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
