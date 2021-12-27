import { z } from 'zod'

import { KottiField } from '../kotti-field/types'

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
	export type Entry = {
		isDisabled?: boolean
		key: keyof Value
		label: string
		tooltip?: string
	}

	export type Props = KottiField.Props & {
		isInline: boolean
		options: Entry[]
		type: 'checkbox' | 'switch'
	}

	export type Value = Record<string, boolean | null>
}
