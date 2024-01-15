import { z } from 'zod'

import { defaultParser, defaultPostEscapeParser } from './utilities'

const idSchema = z.union([z.number(), z.string()])

export module KottiComment {
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
		isInternal: z.boolean().default(false),
		isModified: z.boolean().default(false),
		message: z.string(),
		user: userSchema,
	})

	const parseFunctionSchema = z.function().args(z.string()).returns(z.string())

	const sharedSchema = commentSchema.extend({
		allowInternal: z.boolean().default(false),
		dangerouslyOverrideParser: parseFunctionSchema.default(defaultParser),
		isReadOnly: z.boolean().default(false),
		postEscapeParser: parseFunctionSchema.default(defaultPostEscapeParser),
		tabIndex: z.number().default(0),
		userAvatar: userSchema.shape.avatar,
	})

	export module Reply {
		export const schema = commentSchema
		export type Props = z.input<typeof schema>
		export type PropsInternal = z.output<typeof schema>
	}

	export const propsSchema = sharedSchema.extend({
		dataTest: z.string().optional(),
		replies: z.array(Reply.schema),
	})
	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>

	export module Entry {
		export const schema = sharedSchema.omit({ userAvatar: true }).extend({
			dataTest: z.string(),
			isReply: z.boolean().default(false),
			parentId: idSchema.optional(),
		})
		export type PropsInternal = z.output<typeof schema>
	}

	export module Actions {
		export const schema = sharedSchema
			.pick({
				isDeletable: true,
				isEditable: true,
				tabIndex: true,
			})
			.merge(
				Entry.schema.pick({
					dataTest: true,
					isReply: true,
				}),
			)
		export type PropsInternal = z.output<typeof schema>
	}

	export module Header {
		export const schema = commentSchema
			.pick({
				createdAt: true,
				isInternal: true,
				isModified: true,
				user: true,
			})
			.merge(
				Entry.schema.pick({
					isReply: true,
				}),
			)
		export type PropsInternal = z.output<typeof schema>
	}

	export module InlineEdit {
		export const schema = sharedSchema
			.pick({
				allowInternal: true,
				dangerouslyOverrideParser: true,
				id: true,
				isInternal: true,
				message: true,
				postEscapeParser: true,
				tabIndex: true,
			})
			.merge(
				Entry.schema.pick({
					dataTest: true,
					isReply: true,
					parentId: true,
				}),
			)
			.extend({
				isEditing: z.boolean().default(false),
			})
		export type PropsInternal = z.output<typeof schema>
	}

	export module TextArea {
		export const schema = InlineEdit.schema
			.pick({
				allowInternal: true,
				dataTest: true,
				isInternal: true,
				isReply: true,
				tabIndex: true,
			})
			.extend({
				autofocus: z.boolean().default(false),
				placeholder: z.string().optional(),
				value: InlineEdit.schema.shape.message,
			})
		export type PropsInternal = z.output<typeof schema>
	}

	export module Events {
		export type Add = {
			isInternal?: PropsInternal['isInternal']
			message: PropsInternal['message']
			parentId?: PropsInternal['id']
			replyToUserId?: PropsInternal['user']['id']
		}

		export type Delete = {
			id: PropsInternal['id']
			parentId?: PropsInternal['id']
		}

		export type Edit = {
			id: PropsInternal['id']
			isInternal?: PropsInternal['isInternal']
			message: PropsInternal['message']
			parentId?: PropsInternal['id']
		}
	}

	export type Translations = {
		cancelMessage: string
		clickToCancelLabel: string
		deleteButton: string
		editButton: string
		editedLabel: string
		internalLabel: string
		lockedHelpText: string
		postButton: string
		replyButton: string
		replyToLabel: string
		unlockedHelpText: string
	}
}

export module KottiCommentInput {
	export const propsSchema = KottiComment.propsSchema
		.pick({
			allowInternal: true,
			dataTest: true,
			isInternal: true,
			tabIndex: true,
		})
		.merge(
			KottiComment.TextArea.schema.pick({
				autofocus: true,
				placeholder: true,
			}),
		)
		.merge(
			KottiComment.Entry.schema.pick({
				isReply: true,
				parentId: true,
			}),
		)
		.extend({
			replyToUserId: KottiComment.userSchema.shape.id.optional(),
			userAvatar: KottiComment.userSchema.shape.avatar,
		})
	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
