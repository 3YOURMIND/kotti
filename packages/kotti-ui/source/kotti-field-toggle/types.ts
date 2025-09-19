import { z } from 'zod'

import { KottiField } from '../kotti-field/types'
import { createLooseZodEnumSchema } from '../zod-utilities/enums'
import { refinementNonEmpty } from '../zod-utilities/refinements'

export namespace KottiFieldToggle {
	export namespace Shared {
		export enum Type {
			CHECKBOX = 'checkbox',
			SWITCH = 'switch',
		}
		export const propsSchema = KottiField.propsSchema
			.merge(
				KottiField.potentiallySupportedPropsSchema.pick({ tabIndex: true }),
			)
			.extend({
				type: createLooseZodEnumSchema(Type).default(Type.CHECKBOX),
			})
	}

	export const modelValueSchema = z.boolean().nullable()
	export type ModelValue = z.output<typeof modelValueSchema>

	export const propsSchema = Shared.propsSchema.extend({
		modelValue: modelValueSchema.default(null),
	})
	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}

export namespace KottiFieldToggleGroup {
	export const modelValueSchema = z.record(z.boolean().nullable()).nullable()
	export type ModelValue = z.output<typeof modelValueSchema>

	export const entrySchema = z.object({
		dataTest: z.string().optional(),
		isDisabled: z.boolean().optional(),
		key: z.string(),
		label: z.string(),
		tooltip: z.string().optional(),
	})
	export type Entry = z.output<typeof entrySchema>

	export const propsSchema = KottiFieldToggle.Shared.propsSchema.extend({
		isInline: z.boolean().default(false),
		modelValue: modelValueSchema.default(null),
		options: z
			.array(entrySchema)
			.refine(...refinementNonEmpty)
			.refine(
				(options) =>
					new Set(options.map(({ key }) => key)).size === options.length,
				{ message: 'options need to be unique by `key`' },
			),
	})
	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
