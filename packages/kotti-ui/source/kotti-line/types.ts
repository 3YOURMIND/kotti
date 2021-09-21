import { z } from 'zod'

export namespace KottiLine {
	export const propsSchema = z.object({
		text: z.string().nullable().default(null),
	})

	export type PropsInternal = z.output<typeof propsSchema>
	export type Props = z.input<typeof propsSchema>
}
