import { yocoIconSchema } from '@3yourmind/yoco'
import { z } from 'zod'

export namespace KottiInlineEdit {
	export const propsSchema = z.object({
		label: z.string(),
		placeholder: z.string(),
		isMultiLine: z.boolean().default(false),
		value: z.string(),
	})

	export type PropsInternal = z.output<typeof propsSchema>
	export type Props = z.input<typeof propsSchema>
}
