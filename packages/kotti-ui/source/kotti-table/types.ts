import { z } from 'zod'

export module KottiTable {
	export const propsSchema = z
		.object({
			id: z.string(),
			isNotScrollable: z.boolean().default(false),
		})
		.strict()
}

export module KottiStandardTable {
	export const propsSchema = z.object({
		itemsPerPage: z.number().default(10),
		itemsPerPageOptions: z
			.array(z.number().min(5).int().finite())
			.default(() => [10, 25, 50, 100]),
	})
}

export type AnyRow = Record<string, unknown>
