import { z } from 'zod'

import { KottiField } from '../kotti-field/types'

export module KottiValueLabel {
	export const validationSchema = z.union([
		KottiField.Validation.errorSchema,
		KottiField.Validation.successSchema,
		KottiField.Validation.warningSchema,
	])

	export const propsSchema = KottiField.propsSchema
		.pick({
			dataTest: true,
			helpDescription: true,
			helpText: true,
			isLoading: true,
			label: true,
		})
		.extend({
			isUnset: z.boolean().default(false),
			validation: validationSchema.nullable().default(null),
			value: z.union([z.number(), z.string()]).nullable().default(null),
		})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>

	export type Translations = {
		notSet: string
	}
}
