import { z } from 'zod'

import { KottiField } from '../kotti-field/types'
import { refinementNonEmpty } from '../zod-refinements'

export namespace KottiFieldToggle {
	export enum Type {
		SWITCH = 'switch',
		CHECKBOX = 'checkbox',
	}

	export const valueSchema = z.boolean().nullable().default(null)
	export type Value = z.output<typeof valueSchema>

	export const propsSchema = KottiField.propsSchema.extend({
		type: z
			.union([z.literal(Type.SWITCH), z.literal(Type.CHECKBOX)])
			.default(z.literal(Type.CHECKBOX).value),
		value: valueSchema,
	})
	export type Props = z.input<typeof propsSchema>

	export type PropsInternal = z.output<typeof propsSchema>
}

export namespace KottiFieldToggleGroup {
	export const valueSchema = z
		.record(z.boolean().nullable())
		.nullable()
		.default(null)
	export type Value = z.output<typeof valueSchema>

	export const entrySchema = z.object({
		isDisabled: z.boolean().optional(),
		// equivalent to NonNullable<valueSchema>.keySchema
		key: valueSchema.removeDefault().unwrap().keySchema,
		label: z.string(),
		tooltip: z.string().optional(),
	})
	export type Entry = z.output<typeof entrySchema>

	export const propsSchema = KottiFieldToggle.propsSchema.extend({
		isInline: z.boolean().default(false),
		options: z
			.array(entrySchema)
			.refine(...refinementNonEmpty)
			.refine(
				(options) =>
					new Set(options.map(({ key }) => key)).size === options.length,
				{ message: 'options need to be unique by `key`' },
			),
		value: valueSchema,
	})
	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
