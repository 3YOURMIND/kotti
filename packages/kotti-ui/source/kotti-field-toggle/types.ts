import { z } from 'zod'

import { KottiField } from '../kotti-field/types'
import { refinementNonEmpty } from '../zod-refinements'

export namespace KottiFieldToggle {
	export namespace Shared {
		export enum Type {
			SWITCH = 'switch',
			CHECKBOX = 'checkbox',
		}
		export const propsSchema = KottiField.propsSchema
			.merge(
				KottiField.potentiallySupportedPropsSchema.pick({ tabIndex: true }),
			)
			.extend({
				type: z.nativeEnum(Type).default(Type.CHECKBOX),
			})
	}

	export const valueSchema = z.boolean().nullable()
	export type Value = z.output<typeof valueSchema>

	export const propsSchema = Shared.propsSchema.extend({
		value: valueSchema.default(null),
	})
	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}

export namespace KottiFieldToggleGroup {
	export const valueSchema = z.record(z.boolean().nullable()).nullable()
	export type Value = z.output<typeof valueSchema>

	export const entrySchema = z.object({
		isDisabled: z.boolean().optional(),
		key: z.string(),
		label: z.string(),
		tooltip: z.string().optional(),
	})
	export type Entry = z.output<typeof entrySchema>

	export const propsSchema = KottiFieldToggle.Shared.propsSchema.extend({
		isInline: z.boolean().default(false),
		options: z
			.array(entrySchema)
			.refine(...refinementNonEmpty)
			.refine(
				(options) =>
					new Set(options.map(({ key }) => key)).size === options.length,
				{ message: 'options need to be unique by `key`' },
			),
		value: valueSchema.default(null),
	})
	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
