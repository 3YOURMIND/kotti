import { z } from 'zod'

import { Kotti } from '../types'

import { defaultParser, defaultPostEscapeParser } from './utilities'

const commentIdSchema = z.union([z.number(), z.string()])

export namespace KottiComment {
	const parseFunctionSchema = z.function().args(z.string()).returns(z.string())

	export const commentSchema = z.object({
		createdTime: z.string().nullable().default(null),
		id: commentIdSchema.nullable().default(null),
		isDeletable: z.boolean().default(false),
		isEditable: z.boolean().default(false),
		isInternalThread: z.boolean().default(false),
		isModified: z.boolean().default(false),
		message: z.string(),
		userAvatar: z.string().nullable().default(null),
		userId: z.number().nullable().default(null),
		userName: z.string().optional(),
	})

	const sharedSchema = commentSchema.extend({
		dangerouslyOverrideParser: parseFunctionSchema.default(defaultParser),
		postEscapeParser: parseFunctionSchema.default(defaultPostEscapeParser),
	})

	export const propsSchema = sharedSchema.extend({
		replies: z.array(commentSchema).optional(),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>

	export type UserData = Pick<PropsInternal, 'userName' | 'userId'>

	export namespace CommentHeader {
		export const schema = commentSchema.pick({
			createdTime: true,
			isInternalThread: true,
			isModified: true,
			userName: true,
		})
		export type Props = z.output<typeof schema>
	}

	export namespace Reply {
		export type Props = z.input<typeof sharedSchema>
		export type PropsInternal = z.output<typeof sharedSchema>
	}

	export namespace Events {
		type CommonPayload = {
			id: NonNullable<KottiComment.PropsInternal['id']>
			parentId: KottiComment.PropsInternal['id']
		}

		export type Delete = CommonPayload

		export type Edit = CommonPayload & {
			message: Kotti.Comment.PropsInternal['message']
		}

		export type InternalEdit = Pick<Kotti.Comment.Events.Edit, 'message' | 'id'>

		export type Submit = {
			message: KottiComment.PropsInternal['message']
			parentId: CommonPayload['parentId']
			replyToUserId: KottiComment.PropsInternal['userId']
		}
	}

	export type Translations = {
		deleteButton: string
		editButton: string
		editedLabel: string
		internalThreadLabel: string
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
