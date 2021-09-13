import { Yoco } from '@3yourmind/yoco'
import { z } from 'zod'

import { yocoIconSchema } from '../validators'

export namespace KottiBanner {
	export const propsSchema = z.object({
		actionText: z.string().nullable().default(null),
		expandCloseLabel: z.string().nullable().default(null),
		expandLabel: z.string().nullable().default(null),
		icon: yocoIconSchema.default(Yoco.Icon.ANNOUNCE),
		isGray: z.boolean().default(false),
		message: z.string(),
	})

	export type PropsInternal = z.output<typeof propsSchema>
	export type Props = z.input<typeof propsSchema>

	export type Translations = {
		expandCloseLabel: string
		expandLabel: string
	}
}
