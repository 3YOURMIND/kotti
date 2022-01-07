import { z } from 'zod'

import { KottiField } from '../kotti-field/types'

export namespace KottiFieldPassword {
	export const valueSchema = z.string().nullable()
	export type Value = z.output<typeof valueSchema>

	enum AutoComplete {
		CURRENT = 'current-password',
		NEW = 'new-passowrd',
	}
	export const propsSchema = KottiField.propsSchema.extend({
		placeholder: z.string().nullable().default(null),
		autoComplete: z.union([
			z.literal(AutoComplete.CURRENT),
			z.literal(AutoComplete.NEW),
		]),
		value: valueSchema.default(null),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
