import { z } from 'zod'

import { SpecifyRequiredProps } from '../types/utilities'

export namespace KottiLine {
	export const propsInternalSchema = z.object({
		text: z.string(),
	})
	export type PropsInternal = z.infer<typeof propsInternalSchema>

	export type Props = SpecifyRequiredProps<PropsInternal, never>
}
