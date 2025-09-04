import { z } from 'zod'

export namespace KottiPagination {
	export enum PagingStyle {
		EXPAND = 'expand',
		FLEX = 'flex',
		FRACTION = 'fraction',
	}

	export const propsSchema = z.object({
		adjacentAmount: z.number().default(1),
		fixedWidth: z.boolean().default(false),
		page: z.number(),
		pageSize: z.number().default(10),
		pagingStyle: z.nativeEnum(PagingStyle).default(PagingStyle.EXPAND),
		total: z.number().nullable().default(null),
	})

	export type PropsInternal = z.output<typeof propsSchema>
	export type Props = z.input<typeof propsSchema>
}
