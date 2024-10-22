import { computed, provide, type Ref } from 'vue'
import { useVueTable } from './tanstack-table'
import { createColumnHelper, getCoreRowModel } from '@tanstack/table-core'

import { type TableContext, getTableContextKey } from './context'
import { AnyRow } from './types'

type KottiTableParameter<ROW extends AnyRow> = {
	columns: Ref<
		{
			getData: (row: ROW) => unknown /* TODO: <DATA> */
			id: string /* number | symbol */
			label: string
		}[]
	>
	data: Ref<ROW[]>
	id: string
}

export const useKottiTable = <ROW extends AnyRow>(
	params: KottiTableParameter<ROW>,
) => {
	const columnHelper = createColumnHelper<ROW>()

	const table = useVueTable(
		computed(() => ({
			columns: params.columns.value.map((column) =>
				columnHelper.accessor(column.getData, {
					cell: (info) => info.getValue(),
					header: () => column.label,
					id: column.id,
				}),
			),
			data: params.data.value,
			getCoreRowModel: getCoreRowModel(),
		})),
	)

	const tableContext: TableContext<ROW> = computed(() => ({
		internal: {
			table,
		},
	}))
	provide<TableContext<ROW>>(getTableContextKey(params.id), tableContext)

	return {
		tableContext,
	}
}
