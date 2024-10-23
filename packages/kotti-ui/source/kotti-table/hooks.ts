import type { ColumnMeta } from '@tanstack/table-core'
import {
	type CellContext,
	createColumnHelper,
	getCoreRowModel,
	type HeaderContext,
} from '@tanstack/table-core'
import { computed, h, provide, type Ref } from 'vue'

import ToggleInner from '../shared-components/toggle-inner/ToggleInner.vue'

import { getTableContextKey, type TableContext } from './context'
import { useVueTable } from './tanstack-table'
import type { AnyRow } from './types'

type ResolvedColumnDisplay = {
	align: 'center' | 'left' | 'right'
	isNumeric: boolean
}

type KottiTableParameter<ROW extends AnyRow> = {
	columns: Ref<
		{
			dataType: ResolvedColumnDisplay | keyof typeof columnDisplayMap
			getData: (row: ROW) => unknown /* TODO: <DATA> */
			id: string /* number | symbol */
			label: string
		}[]
	>
	data: Ref<ROW[]>
	id: string
	selection?: {
		getRowId: (row: ROW) => string // maybe needed in other places?
		onSelectionUpdate: (updated: Record<string, boolean>) => void
		selectedRows: Ref<Record<string, boolean>>
	}
}

const columnDisplayMap = {
	DATE: { align: 'right', isNumeric: false },
	DATETIME: { align: 'right', isNumeric: false },
	INTEGER: { align: 'right', isNumeric: true },
	NUMERICAL: { align: 'right', isNumeric: true },
	TEXT: { align: 'left', isNumeric: false },
} satisfies Record<string, ResolvedColumnDisplay>

const resolveColumnDisplay = (
	dataType: ResolvedColumnDisplay | keyof typeof columnDisplayMap,
): ResolvedColumnDisplay => {
	if (typeof dataType === 'object') return dataType

	return columnDisplayMap[dataType]
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
							columnHelper.display({
								cell: ({ row }: CellContext<ROW, unknown>) =>
									h(
										'div',
										{
											class: 'kt-table-selection',
											on: {
												click: () => {
													row.toggleSelected(!row.getIsSelected())
												},
											},
										},
										[
											h(ToggleInner, {
												props: {
													component: 'div',
													inputProps: {
														// TODO: pass data-test
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
											on: {
												click: () => {
													table.toggleAllRowsSelected(
														!table.getIsAllRowsSelected(),
													)
												},
											},
										},
										[
											h(ToggleInner, {
												props: {
													component: 'div',
													inputProps: {
														// TODO: pass data-test
													},
													isDisabled: false,
													value: table.getIsAllRowsSelected(),
												},
											}),
										],
									),
								id: `${params.id}-inner-select`,
								meta: {
									cellClasses: 'kt-table-cell',
									headerClasses: 'kt-table-cell',
								},
							}),
						]
					: []),
				...params.columns.value.map((column) => {
					const columnDisplay = resolveColumnDisplay(column.dataType)
					const alignmentClass: string = Object.entries({
						[`kt-table-cell--is-${columnDisplay.align}-aligned`]: true,
						'kt-table-cell--displays-number': columnDisplay.isNumeric,
					})
						.filter(([_, isTrue]) => isTrue)
						.map(([className, _]) => className)
						.join(' ')

					return columnHelper.accessor(column.getData, {
						cell: (info) => info.getValue(),
						header: () => column.label,
						id: column.id,
						meta: {
							cellClasses: alignmentClass,
							headerClasses: alignmentClass,
						} satisfies ColumnMeta<ROW, unknown>,
					})
				}),
			],
			data: params.data.value,
			getCoreRowModel: getCoreRowModel(),
			getRowId: params.selection?.getRowId,
			onRowSelectionChange: (updateOrValue) => {
				if (!params.selection) throw new Error('no selection available')

				const updatedSelection =
					typeof updateOrValue === 'function'
						? updateOrValue(params.selection.selectedRows.value)
						: updateOrValue
				params.selection.selectedRows.value = updatedSelection
			},
			state: {
				rowSelection: params.selection?.selectedRows.value,
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
