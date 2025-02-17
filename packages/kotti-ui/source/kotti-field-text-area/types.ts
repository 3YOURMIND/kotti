import { z } from 'zod'

import { KottiField } from '../kotti-field/types'

export namespace KottiFieldTextArea {
	export const valueSchema = z.string().nullable()
	export type Value = z.output<typeof valueSchema>

	export const propsSchema = KottiField.propsSchema
		.merge(
			KottiField.potentiallySupportedPropsSchema.pick({
				autoComplete: true,
				isBorderless: true,
				tabIndex: true,
			}),
		)
		.extend({
			autoSize: z.boolean().default(false),
			maxHeight: z.number().nullable().default(null),
			placeholder: z.string().nullable().default(null),
			// eslint-disable-next-line no-magic-numbers
			rows: z.number().default(5),
			value: valueSchema.default(null),
		})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
