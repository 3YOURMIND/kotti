import { z } from 'zod'

import { KottiField } from '../kotti-field/types'

export namespace KottiFieldText {
	export const valueSchema = z.string().nullable().default(null)
	export type Value = z.input<typeof valueSchema>

	export const propsSchema = KottiField.propsSchema.extend({
		placeholder: z.string().nullable().default(null),
		value: valueSchema,
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
