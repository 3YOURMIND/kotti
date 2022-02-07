import { z } from 'zod'

import { KottiField } from '../kotti-field/types'

import { VALUE_PROP_REGEX } from './constants'

export namespace KottiFieldCurrency {
	export const valueSchema = z.string().regex(VALUE_PROP_REGEX).nullable()
	export type Value = z.output<typeof valueSchema>

	export const propsSchema = KottiField.propsSchema
		.merge(
			KottiField.potentiallySupportedPropsSchema.pick({
				tabIndex: true,
			}),
		)
		.extend({
			currency: z.string(),
			maximum: z.number().nullable().default(null),
			minimum: z.number().nullable().default(null),
			placeholder: z.string().nullable().default(null),
			value: valueSchema.default(null),
		})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
