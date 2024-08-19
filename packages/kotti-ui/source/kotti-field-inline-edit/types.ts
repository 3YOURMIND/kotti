import { z } from 'zod'

import { KottiField } from '../kotti-field/types'
import { createLooseZodEnumSchema } from '../zod-utilities/enums'

export module KottiFieldInlineEdit {
	export const valueSchema = z.string().nullable()
	export type Value = z.output<typeof valueSchema>

	export enum ConfirmationValidation {
		ERROR = 'error',
		WARNING = 'warning',
		NEVER = 'never',
	}

	export enum TextStyle {
		HEADER_ONE = 'h1',
		HEADER_TWO = 'h2',
		HEADER_THREE = 'h3',
	}

	export const propsSchema = KottiField.propsSchema
		.merge(
			KottiField.potentiallySupportedPropsSchema.pick({
				autoComplete: true,
				tabIndex: true,
			}),
		)
		.extend({
			isReadonly: z.boolean().default(false),
			isMultiline: z.boolean().default(false),
			preventConfirmationOn: createLooseZodEnumSchema(
				ConfirmationValidation,
			).default(ConfirmationValidation.NEVER),
			placeholder: z.string().nullable().default(null),
			textStyle: createLooseZodEnumSchema(TextStyle).nullable().default(null),
			value: valueSchema.default(null),
		})
	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>

	export module Events {
		export type Confirm = KottiFieldInlineEdit.Value
	}

	export type Translations = {
		placeholder: string
	}
}

export type FieldInlineEditElement = HTMLInputElement | HTMLTextAreaElement
