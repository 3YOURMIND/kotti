import { z } from 'zod'

import { defaultParser, defaultPostEsapeParser } from './utilities'

export namespace KottiComment {
	export const commentSchema = z.object({
		createdTime: z.string(),
		id: z.union([z.number(), z.string()]),
		isDeletable: z.boolean().default(false),
		isEditable: z.boolean().default(false),
		message: z.string(),
		userAvatar: z.string(),
		userId: z.number(),
		userName: z.string(),
	})

	const parseFunctionSchema = z.function().args(z.string()).returns(z.string())

	export const propsSchema = commentSchema.extend({
		dangerouslyOverrideParser: parseFunctionSchema.default(defaultParser),
		postEscapeParser: parseFunctionSchema.default(defaultPostEsapeParser),
		replies: z.array(commentSchema),
	})

	export type PropsInternal = z.output<typeof propsSchema>
	export type Props = z.input<typeof propsSchema>
}
