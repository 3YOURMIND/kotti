import { z } from 'zod'

export namespace KottiTag {
	export const propsSchema = z.object({
		isDisabled: z.boolean().default(false),
		label: z.string().optional(),
		text: z.string(),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
