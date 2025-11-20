import { z } from 'zod'

import { KottiField } from '../kotti-field/types'

export namespace KottiLabel {
	export const valueSchema = z.string().nullable()
	export type Value = z.output<typeof valueSchema>

	export const propsSchema = KottiField.propsSchema
		.pick({
			helpDescription: true,
			helpText: true,
			label: true,
		})
		.extend({
			inputId: z.string().nullable().default(null),
			isRequired: z.boolean().default(false),
			validationState: z
				.enum(['empty', 'error', 'success', 'warning'])
				.default('empty'),
		})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
