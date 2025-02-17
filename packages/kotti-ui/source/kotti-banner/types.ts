import { z } from 'zod'

import { yocoIconSchema } from '@3yourmind/yoco'

export namespace KottiBanner {
	export const styleSchema = z
		.object({
			backgroundColor: z.string(),
			darkColor: z.string(),
			icon: yocoIconSchema.nullable(),
			lightColor: z.string(),
		})
		.strict()

	export type Style = z.infer<typeof styleSchema>

	export const propsSchema = z.object({
		action: z.string().nullable().default(null),
		header: z.string().nullable().default(null),
		isCloseable: z.boolean().default(false),
		text: z.string().nullable().default(null),
		type: z
			.union([styleSchema, z.enum(['error', 'info', 'success', 'warning'])])
			.default('info'),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
