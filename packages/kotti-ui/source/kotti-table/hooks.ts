import {
	type CellContext,
	type ColumnDef,
	createColumnHelper,
	type DisplayColumnDef,
	getCoreRowModel,
	type HeaderContext,
} from '@tanstack/table-core'
import { computed, h, provide, type Ref } from 'vue'

import ToggleInner from '../kotti-field-toggle/components/ToggleInner.vue'

import { getTableContextKey, type TableContext } from './context'
import { useVueTable } from './tanstack-table'
import type { AnyRow } from './types'

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
	selection?: {
		getRowId: (row: ROW) => string // maybe optional? needed for selection
		onSelectionUpdate: (updated: Record<string, boolean>) => void
		selectedRows: Record<string, boolean>
	}
}

export const useKottiTable = <ROW extends AnyRow>(
	params: KottiTableParameter<ROW>,
): {
	tableContext: TableContext<ROW>
} => {
	const columnHelper = createColumnHelper<ROW>()

	const table = useVueTable(
		computed(() => ({
			columns: [
				...(params.selection
					? [
							{
								cell: ({ row }: CellContext<ROW, unknown>) =>
									h(
										'div',
										{
											on: { click: row.getToggleSelectedHandler() },
										},
										[
											h(ToggleInner, {
												props: {
													component: 'label',
													inputProps: {
														// TODO: disable when row is disabled
														disabled: !row.getCanSelect(),
													},
													isDisabled: !row.getCanSelect(),
													value: row.getIsSelected(),
												},
											}),
										],
									),
								header: ({ table }: HeaderContext<ROW, unknown>) =>
									h(
										'div',
										{
											on: { click: table.getToggleAllRowsSelectedHandler() },
										},
										[
											h(ToggleInner, {
												on: {
													input: (value: boolean) => {
														params.selection?.onSelectionUpdate(
															Object.fromEntries(
																table
																	.getRowModel()
																	.rows.map((row) => [
																		params.selection?.getRowId(row.original),
																		value,
																	]),
															),
														)
													},
												},
												props: {
													component: 'label',
													inputProps: {
														// TODO: disable when all rows are disabled
														disabled: false,
													},
													isDisabled: false,
													value: table.getIsAllRowsSelected(),
												},
											}),
										],
									),
								id: `${params.id}-inner-select`,
							} satisfies DisplayColumnDef<ROW>,
						]
					: []),
				...params.columns.value.map((column) =>
					columnHelper.accessor(column.getData, {
						cell: (info) => info.getValue(),
						header: () => column.label,
						id: column.id,
					}),
				),
			] satisfies ColumnDef<ROW>[],
			data: params.data.value,
			getCoreRowModel: getCoreRowModel(),
			getRowId: params.selection?.getRowId,
			state: {
				rowSelection: params.selection?.selectedRows,
			},
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
