// import { yocoIconSchema } from '@3yourmind/yoco'
import { z } from 'zod'

export namespace KottiInlineEdit2 {
	export const propsSchema = z.object({
		label: z.string().nullable().default(null),
		placeholder: z.string().nullable().default(null),
		isMultiLine: z.boolean().default(false),
		value: z.string(),
	})

	export type PropsInternal = z.output<typeof propsSchema>
	export type Props = z.input<typeof propsSchema>
}
