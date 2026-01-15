import { z } from 'zod'

import { KottiField } from '../kotti-field/types'

export namespace KottiFieldTextArea {
	export const modelValueSchema = z.string().nullable()
	export type ModelValue = z.output<typeof modelValueSchema>

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
			modelValue: modelValueSchema.default(null),
			placeholder: z.string().nullable().default(null),
			// eslint-disable-next-line no-magic-numbers
			rows: z.number().default(5),
		})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
