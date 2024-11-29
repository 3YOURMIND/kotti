import type { Ref, UnwrapRef } from 'vue'
import { computed, watch } from 'vue'
import { z } from 'zod'

import type { KottiTableParameter } from '../table/hooks'
import {
	paramsSchema as KottiTableHookParamsSchema,
	useKottiTable,
} from '../table/hooks'
import type { AnyRow } from '../table/types'

import type { StandardTableContext } from './context'
import { useProvideStandardTableContext } from './context'
import { KottiStandardTable } from './types'

type KottiStandardTableParameters<
	ROW extends AnyRow,
	COLUMN_IDS extends string = string,
> = Ref<{
	filters?: KottiStandardTable.Filter[]
	id: string
	isLoading?: boolean
	options?: KottiStandardTable.Options
	pagination: KottiStandardTable.Pagination
	table: Omit<
		UnwrapRef<KottiTableParameter<ROW, COLUMN_IDS>>,
		'id' | 'pagination'
	>
}>

const paramsSchema = z.object({
	filters: KottiStandardTable.filterSchema.array().default(() => []),
	id: z.string(),
	isLoading: z.boolean().default(false),
	options: KottiStandardTable.optionsSchema.optional(),
	pagination: KottiStandardTable.paginationSchema,
	table: KottiTableHookParamsSchema.omit({
		id: true,
		pagination: true,
	}),
})

export const useKottiStandardTable = <ROW extends AnyRow>(
	_params: KottiStandardTableParameters<ROW>,
): {
	context: StandardTableContext<ROW>
	tableHook: ReturnType<typeof useKottiTable<ROW>>
} => {
	const params = computed(() => paramsSchema.parse(_params.value))

	const tableHook = useKottiTable<ROW>(
		computed(() => ({
			..._params.value.table,
			id: params.value.id,
			pagination:
				params.value.pagination.type === KottiStandardTable.PaginationType.LOCAL
					? {
							state: {
								pageIndex: 0,
								pageSize: params.value.pagination.pageSize,
							},
							type: KottiStandardTable.PaginationType.LOCAL,
						}
					: {
							rowCount: params.value.pagination.rowCount,
							state: {
								pageIndex: 0,
								pageSize: params.value.pagination.pageSize,
							},
							type: KottiStandardTable.PaginationType.REMOTE,
						},
		})),
	)

	const standardTableContext: StandardTableContext<ROW> = computed(() => ({
		internal: {
			columns: _params.value.table.columns,
			filters: params.value.filters,
			getFilter: (id) =>
				params.value.filters.find((filter) => filter.id === id) ?? null,
			isLoading: params.value.isLoading,
			options: params.value.options,
			pageSizeOptions: params.value.pagination.pageSizeOptions,
			paginationType: params.value.pagination.type,
		},
	}))
	useProvideStandardTableContext(params.value.id, standardTableContext)

	watch(
		() =>
			tableHook.tableContext.value.internal.table.value.getState().pagination
				.pageSize,
		() => {
			tableHook.tableContext.value.internal.table.value.setPageIndex(0)
		},
	)

	return {
		context: standardTableContext,
		tableHook: tableHook,
	}
}
