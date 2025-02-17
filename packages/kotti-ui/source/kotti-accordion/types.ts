import { z } from 'zod'

import { yocoIconSchema } from '@3yourmind/yoco'

export namespace KottiAccordion {
	export const propsSchema = z.object({
		dataTest: z.string().optional(),
		icon: yocoIconSchema.nullable().default(null),
		isClosed: z.boolean().default(false),
		title: z.string(),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
