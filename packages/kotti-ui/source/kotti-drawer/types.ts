import { z } from 'zod'

export namespace KottiDrawer {
	export const propsSchema = z.object({
		defaultWidth: z.string().nullable().default(null),
		disallowCloseOutside: z.boolean().default(false),
		expandWidth: z.string().nullable().default(null),
		isExpanded: z.boolean().default(false),
		isWide: z.boolean().default(false),
	})

	export type PropsInternal = z.output<typeof propsSchema>

	export type Props = z.input<typeof propsSchema>
}
