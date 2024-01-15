import { z } from 'zod'

import { KottiField } from '../kotti-field/types'

export module KottiFieldText {
	export const valueSchema = z.string().nullable()
	export type Value = z.output<typeof valueSchema>

	export const propsSchema = KottiField.propsSchema
		.merge(KottiField.potentiallySupportedPropsSchema)
		.extend({
			placeholder: z.string().nullable().default(null),
			value: valueSchema.default(null),
		})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
