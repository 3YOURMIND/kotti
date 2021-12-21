import { z } from 'zod'

import { KottiField } from '../kotti-field/types'

export namespace KottiFieldNumber {
	export const valueSchema = z.number().nullable().default(null)
	export type Value = z.input<typeof valueSchema>
	export type ValueInternal = z.output<typeof valueSchema>

	export const propsSchema = KottiField.propsSchema.extend({
		decimalPlaces: z.number().default(3),
		hideChangeButtons: z.boolean().default(false),
		hideMaximum: z.boolean().default(false),
		maximum: z.number().nullable().default(null),
		minimum: z.number().nullable().default(null),
		placeholder: z.string().nullable().default(null),
		step: z.number().min(0).default(1),
		value: valueSchema,
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
