import { z } from 'zod'

import { KottiField } from '../kotti-field/types'
import { refinementNonEmpty } from '../zod-utilities/refinements'

export namespace KottiFieldRadioGroup {
	export const modelValueSchema = z
		.union([z.string(), z.number(), z.boolean()])
		.nullable()
	export type ModelValue = z.output<typeof modelValueSchema>

	export const entrySchema = z.object({
		dataTest: z.string().optional(),
		isDisabled: z.boolean().optional(),
		label: z.string(),
		tooltip: z.string().optional(),
		value: modelValueSchema,
	})
	export type Entry = z.output<typeof entrySchema>

	export const propsSchema = KottiField.propsSchema
		.merge(KottiField.potentiallySupportedPropsSchema.pick({ tabIndex: true }))
		.extend({
			isInline: z.boolean().default(false),
			modelValue: modelValueSchema.default(null),
			options: z
				.array(entrySchema)
				.refine(...refinementNonEmpty)
				.refine(
					(options) =>
						new Set(options.map(({ value }) => value)).size === options.length,
					{ message: 'options need to be unique by `value`' },
				),
		})
	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
