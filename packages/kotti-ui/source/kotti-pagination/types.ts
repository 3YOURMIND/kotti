import { z } from 'zod'

export namespace KottiPagination {
	export enum PagingStyle {
		EXPAND = 'expand',
		FLEX = 'flex',
		FRACTION = 'fraction',
	}

	export const propsSchema = z.object({
		adjacentAmount: z.number().nullable().default(1),
		fixedWidth: z.boolean().nullable().default(false),
		page: z.number().nullable().default(1),
		pageSize: z.number().nullable().default(10),
		pagingStyle: z.nativeEnum(PagingStyle).default(PagingStyle.EXPAND),
		total: z.number(),
	})

	export type PropsInternal = z.output<typeof propsSchema>
	export type Props = z.input<typeof propsSchema>
}
