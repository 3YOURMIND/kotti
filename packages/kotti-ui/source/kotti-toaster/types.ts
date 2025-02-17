import { z } from 'zod'

import { KottiBanner } from '../kotti-banner/types'

export namespace KottiToaster {
	export const propsSchema = z.object({
		toaster: z.object({
			_internal_pls_dont_touch: z.object({}).passthrough(),
			abort: z.function(),
			show: z.function(),
			withOptions: z.function(),
		}),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}

export namespace KottiToast {
	export const propsSchema = z.object({
		header: z.string().nullable().default(null),
		progress: z.number().int().finite().positive().nullable().default(null),
		text: z.string().nullable().default(null),
		type: z
			.union([
				KottiBanner.styleSchema,
				z.enum(['error', 'info', 'success', 'warning']),
			])
			.default('info'),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
