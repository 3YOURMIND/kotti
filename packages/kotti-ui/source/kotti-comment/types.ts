import { z } from 'zod'

import { defaultParser, defaultPostEsapeParser } from './utilities'

const commentIdSchema = z.union([z.number(), z.string()])
export namespace KottiComment {
	const parseFunctionSchema = z.function().args(z.string()).returns(z.string())

	export const commentSchema = z.object({
		createdTime: z.string(),
		id: commentIdSchema,
		isDeletable: z.boolean().default(false),
		isEditable: z.boolean().default(false),
		message: z.string(),
		userAvatar: z.string(),
		userId: z.number(),
		userName: z.string(),
	})

	export const propsSchema = commentSchema.extend({
		dangerouslyOverrideParser: parseFunctionSchema.default(defaultParser),
		postEscapeParser: parseFunctionSchema.default(defaultPostEsapeParser),
		replies: z.array(commentSchema),
	})

	export type PropsInternal = z.output<typeof propsSchema>
	export type Props = z.input<typeof propsSchema>
}

export namespace KottiCommentInput {
	export const propsSchema = z.object({
		isInline: z.boolean().default(false),
		parentId: commentIdSchema,
		placeholder: z.string(),
		replyToUserId: z.number(),
		userAvatar: z.string(),
	})

	export type PropsInternal = z.output<typeof propsSchema>
	export type Props = z.input<typeof propsSchema>
}
