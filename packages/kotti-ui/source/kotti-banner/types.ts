import { yocoIconSchema } from '@3yourmind/yoco'
import { z } from 'zod'

import { SpecifyRequiredProps } from '../types/utilities'

export namespace KottiBanner {
	export const propsInternalSchema = z.object({
		actionText: z.string().nullable(),
		expandCloseLabel: z.string().nullable(),
		expandLabel: z.string().nullable(),
		icon: yocoIconSchema,
		isGray: z.boolean(),
		message: z.string(),
	})
	export type PropsInternal = z.infer<typeof propsInternalSchema>

	export type Props = SpecifyRequiredProps<PropsInternal, 'message'>

	export type Translations = {
		expandCloseLabel: string
		expandLabel: string
	}
}
