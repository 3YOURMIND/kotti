import { z } from 'zod'

import { KottiField } from '../kotti-field/types'
import { refinementNonEmpty } from '../zod-refinements'

export module KottiFieldRadioGroup {
	export const valueSchema = z
		.union([z.string(), z.number(), z.boolean()])
		.nullable()
	export type Value = z.output<typeof valueSchema>

	export const entrySchema = z.object({
		dataTest: z.string().optional(),
		isDisabled: z.boolean().optional(),
		label: z.string(),
		tooltip: z.string().optional(),
		value: valueSchema,
	})
	export type Entry = z.output<typeof entrySchema>

	export const propsSchema = KottiField.propsSchema
		.merge(KottiField.potentiallySupportedPropsSchema.pick({ tabIndex: true }))
		.extend({
			isInline: z.boolean().default(false),
			options: z
				.array(entrySchema)
				.refine(...refinementNonEmpty)
				.refine(
					(options) =>
						new Set(options.map(({ value }) => value)).size === options.length,
					{ message: 'options need to be unique by `value`' },
				),
			value: valueSchema.default(null),
		})
	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
