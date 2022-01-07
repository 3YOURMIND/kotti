import { z } from 'zod'

import { KottiField } from '../kotti-field/types'

export namespace KottiFieldNumber {
	export const valueSchema = z.number().nullable()
	export type Value = z.output<typeof valueSchema>

	export const propsSchema = KottiField.propsSchema
		.merge(KottiField.potentiallySupportedPropsSchema)
		.extend({
			// eslint-disable-next-line no-magic-numbers
			decimalPlaces: z.number().default(3),
			hideChangeButtons: z.boolean().default(false),
			hideMaximum: z.boolean().default(false),
			maximum: z.number().nullable().default(null),
			minimum: z.number().nullable().default(null),
			placeholder: z.string().nullable().default(null),
			step: z.number().min(0).default(1),
			value: valueSchema.default(null),
		})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
