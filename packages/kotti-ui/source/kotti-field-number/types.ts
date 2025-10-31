import { z } from 'zod'

import { KottiField } from '../kotti-field/types'
import { createLooseZodEnumSchema } from '../zod-utilities/enums'

export namespace KottiFieldNumber {
	export const modelValueSchema = z.number().nullable()
	export type ModelValue = z.output<typeof modelValueSchema>

	export enum Align {
		LEFT = 'left',
		RIGHT = 'right',
	}

	export const propsSchema = KottiField.propsSchema
		.merge(
			KottiField.potentiallySupportedPropsSchema.pick({
				autoComplete: true,
				isBorderless: true,
				leftIcon: true,
				prefix: true,
				rightIcon: true,
				suffix: true,
				tabIndex: true,
			}),
		)
		.extend({
			align: createLooseZodEnumSchema(Align).default(Align.LEFT),
			// eslint-disable-next-line no-magic-numbers
			decimalPlaces: z.number().default(3),
			hideChangeButtons: z.boolean().default(false),
			hideMaximum: z.boolean().default(false),
			maximum: z.number().nullable().default(null),
			minimum: z.number().nullable().default(null),
			modelValue: modelValueSchema.default(null),
			placeholder: z.string().nullable().default(null),
			step: z.number().min(0).default(1),
		})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
