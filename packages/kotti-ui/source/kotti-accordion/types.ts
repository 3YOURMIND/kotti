import { yocoIconSchema } from '@3yourmind/yoco'
import { z } from 'zod'

export namespace KottiAccordion {
	export const propsSchema = z.object({
		icon: yocoIconSchema.nullable().default(null),
		isClosed: z.boolean().default(false),
		title: z.string(),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
