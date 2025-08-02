import { z } from 'zod'

import { KottiField } from '../kotti-field/types'

export namespace KottiFieldCurrency {
	const VALUE_PROP_REGEX = /^-?(0?|([1-9]\d*))?(\.\d+)?$/
	export const modelValueSchema = z.string().regex(VALUE_PROP_REGEX).nullable()
	export type ModelValue = z.output<typeof modelValueSchema>

	export const propsSchema = KottiField.propsSchema
		.merge(
			KottiField.potentiallySupportedPropsSchema.pick({
				autoComplete: true,
				isBorderless: true,
				tabIndex: true,
			}),
		)
		.extend({
			currency: z.string(),
			maximum: z.number().nullable().default(null),
			minimum: z.number().nullable().default(null),
			modelValue: modelValueSchema.default(null),
			placeholder: z.string().nullable().default(null),
		})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
