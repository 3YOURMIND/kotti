import { z } from 'zod'

import { KottiField } from '../kotti-field/types'
import { createLooseZodEnumSchema } from '../zod-utilities/enums'

export namespace KottiFieldInlineEdit {
	export const modelValueSchema = z.string().nullable()
	export type ModelValue = z.output<typeof modelValueSchema>

	export enum ConfirmationValidation {
		ERROR = 'error',
		NEVER = 'never',
		WARNING = 'warning',
	}

	export enum TextStyle {
		HEADER_ONE = 'h1',
		HEADER_THREE = 'h3',
		HEADER_TWO = 'h2',
	}

	export const propsSchema = KottiField.propsSchema
		.merge(
			KottiField.potentiallySupportedPropsSchema.pick({
				autoComplete: true,
				tabIndex: true,
			}),
		)
		.extend({
			isMultiline: z.boolean().default(false),
			isReadonly: z.boolean().default(false),
			modelValue: modelValueSchema.default(null),
			placeholder: z.string().nullable().default(null),
			preventConfirmationOn: createLooseZodEnumSchema(
				ConfirmationValidation,
			).default(ConfirmationValidation.NEVER),
			textStyle: createLooseZodEnumSchema(TextStyle).nullable().default(null),
		})
	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>

	export namespace Events {
		export type Confirm = KottiFieldInlineEdit.ModelValue
	}

	export type Translations = {
		placeholder: string
	}
}

export type FieldInlineEditElement = HTMLInputElement | HTMLTextAreaElement
