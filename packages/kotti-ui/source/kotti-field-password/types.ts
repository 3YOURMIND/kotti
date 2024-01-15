import { z } from 'zod'

import { KottiField } from '../kotti-field/types'

export module KottiFieldPassword {
	export const valueSchema = z.string().nullable()
	export type Value = z.output<typeof valueSchema>

	export enum AutoComplete {
		CURRENT = 'current-password',
		NEW = 'new-password',
	}
	export const propsSchema = KottiField.propsSchema
		.merge(KottiField.potentiallySupportedPropsSchema)
		.extend({
			placeholder: z.string().nullable().default(null),
			autoComplete: z.nativeEnum(AutoComplete),
			value: valueSchema.default(null),
		})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
