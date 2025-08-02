import { z } from 'zod'

import { KottiField } from '../kotti-field/types'
import { createLooseZodEnumSchema } from '../zod-utilities/enums'

export namespace KottiFieldPassword {
	export const valueSchema = z.string().nullable()
	export type Value = z.output<typeof valueSchema>

	export enum AutoComplete {
		CURRENT = 'current-password',
		NEW = 'new-password',
		ONE_TIME_CODE = 'one-time-code',
	}
	export const propsSchema = KottiField.propsSchema
		.merge(
			KottiField.potentiallySupportedPropsSchema.omit({ autoComplete: true }),
		)
		.extend({
			autoComplete: createLooseZodEnumSchema(AutoComplete),
			modelValue: valueSchema.default(null),
			placeholder: z.string().nullable().default(null),
			showVisibilityToggle: z.boolean().default(false),
		})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
