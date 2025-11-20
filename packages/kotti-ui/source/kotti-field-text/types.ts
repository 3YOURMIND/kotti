import { z } from 'zod'

import { KottiField } from '../kotti-field/types'

export namespace KottiFieldText {
	export const modelValueSchema = z.string().nullable()
	export type ModelValue = z.output<typeof modelValueSchema>

	export const propsSchema = KottiField.propsSchema
		.merge(KottiField.potentiallySupportedPropsSchema)
		.extend({
			modelValue: modelValueSchema.default(null),
			placeholder: z.string().nullable().default(null),
		})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
