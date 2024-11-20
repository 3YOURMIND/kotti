import type { Ref } from 'vue'
import { computed, watch } from 'vue'

import { useKottiTable } from '../table/hooks'
import type { AnyRow } from '../table/types'
import type { KottiTable } from '../table/types'

import type { StandardTableContext } from './context'
import { useProvideStandardTableContext } from './context'
import { KottiStandardTable } from './types'

type KottiStandardTableParameters<
	ROW extends AnyRow,
	COLUMN_IDS extends string = string,
> = Ref<{
	columns: KottiTable.Column<ROW, COLUMN_IDS>[]
	data: ROW[]
	filters?: KottiStandardTable.Filter[]
	id: string
	isLoading?: boolean
	pagination: KottiStandardTable.Pagination
}>

export const useKottiStandardTable = <ROW extends AnyRow>(
	params: KottiStandardTableParameters<ROW>,
): {
	context: StandardTableContext<ROW>
	tableHook: ReturnType<typeof useKottiTable<ROW>>
} => {
	const paginationParams = computed(() =>
		KottiStandardTable.paginationSchema.parse(params.value.pagination),
	)

	const tableHook = useKottiTable<ROW>(
		computed(() => ({
			columns: params.value.columns,
			data: params.value.data,
			getRowBehavior: ({ row }: { row: ROW }) => ({
				id: String(row.id),
			}),
			hasDragAndDrop: true,
			id: params.value.id,
			isSelectable: true,
			pagination:
				paginationParams.value.type === KottiStandardTable.PaginationType.LOCAL
					? {
							state: {
								pageIndex: 0,
								pageSize: paginationParams.value.pageSize,
							},
							type: KottiStandardTable.PaginationType.LOCAL,
						}
					: {
							rowCount: paginationParams.value.rowCount,
							state: {
								pageIndex: 0,
								pageSize: paginationParams.value.pageSize,
							},
							type: KottiStandardTable.PaginationType.REMOTE,
						},
		})),
	)

	const standardTableContext: StandardTableContext<ROW> = computed(() => ({
		internal: {
			columns: params.value.columns,
			filters: params.value.filters ?? [],
			getFilter: (id) =>
				(params.value.filters ?? []).find((filter) => filter.id === id) ?? null,
			isLoading: params.value.isLoading ?? false,
			pageSizeOptions: paginationParams.value.pageSizeOptions,
			paginationType: paginationParams.value.type,
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
