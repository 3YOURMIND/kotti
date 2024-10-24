import { z } from 'zod'

export module KottiTable {
	export const propsSchema = z
		.object({
			id: z.string(),
			isNotScrollable: z.boolean().default(false),
		})
		.strict()
}

export type AnyRow = Record<string, unknown>
