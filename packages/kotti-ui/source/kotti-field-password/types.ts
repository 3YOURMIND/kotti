import { z } from 'zod'

import { KottiField } from '../kotti-field/types'

export namespace KottiFieldPassword {
	export const valueSchema = z.string().nullable().default(null)
	export type Value = z.output<typeof valueSchema>

	export const propsSchema = KottiField.propsSchema.extend({
		placeholder: z.string().nullable().default(null),
		autoComplete: z.union([
			z.literal('current-password'),
			z.literal('new-password'),
		]),
		value: valueSchema,
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
