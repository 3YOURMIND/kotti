import { Dashes } from '@metatypes/typography'
import type {
	ColumnMeta,
	RowSelectionState,
	SortingState,
} from '@tanstack/table-core'
import {
	type CellContext,
	createColumnHelper,
	getCoreRowModel,
	type HeaderContext,
} from '@tanstack/table-core'
import { computed, h, ref, type Ref, watch } from 'vue'

import { useI18nContext } from '../kotti-i18n/hooks'
import ToggleInner from '../shared-components/toggle-inner/ToggleInner.vue'

import { resolveColumnDisplay } from './column'
import type { TableContext } from './context'
import { useProvideTableContext } from './context'
import { useState, useVueTable } from './tanstack-table'
import type { AnyRow, KottiTable } from './types'

type KottiTableParameter<
	ROW extends AnyRow,
	COLUMN_IDS extends string = string,
> = {
	columns: Ref<KottiTable.Column<ROW, COLUMN_IDS>[]>
	data: Ref<ROW[]>
	id: string
	selection?: {
		getRowId: (row: ROW) => string // maybe needed in other places?
		// onSelectionUpdate: (updated: Record<string, boolean>) => void
		// selectedRows: Ref<Record<string, boolean>>
	}
}

// TODO: check for Exclude<> issue with generic
export const useKottiTable = <ROW extends AnyRow>(
	params: KottiTableParameter<ROW>,
): {
	ordering: Ref<KottiTable.Ordering[]>
	rowSelection: Ref<RowSelectionState>
	tableContext: TableContext<ROW>
} => {
	const columnHelper = createColumnHelper<ROW>()
	const i18nContext = useI18nContext()

	const ordering = ref<KottiTable.Ordering[]>([])
	const [columnOrder, setColumnOrder] = useState<string[]>(
		params.columns.value.map(({ id }) => id),
	)

	// TODO: should we do this
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
	const [sorting, setSorting] = useState<SortingState>([])

	const draggedColumnIndex = ref<number | null>(null)
	const dropTargetColumnIndex = ref<number | null>(null)

	const swapColumns = (): string[] => {
		const draggedIndex = draggedColumnIndex.value
		const dropTargetIndex = dropTargetColumnIndex.value
		if (draggedIndex === null || dropTargetIndex === null)
			return columnOrder.value
		return columnOrder.value.map((columnId, index, order) => {
			if (index === draggedIndex) return order[dropTargetIndex] as string
			if (index === dropTargetIndex) return order[draggedIndex] as string
			return columnId
		})
	}

	watch(
		() => sorting.value,
		() => {
			ordering.value = sorting.value.map((x) => ({
				id: x.id,
				value: x.desc ? 'descending' : 'ascending',
			}))
		},
	)

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
														disabled: !row.getCanSelect(), // TODO: make ToggleInner not stupid
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
					const columnDisplay = resolveColumnDisplay(column.display)
					const index = columnOrder.value.indexOf(column.id)

					// TODO: The alignmentClass generation is a bit complex. You could simplify this by directly joining classes without filtering when boolean values are true, or consider a helper function to manage conditional classes. — ChatGippety
					const alignmentClass: string = Object.entries({
						[`kt-table-cell--is-${columnDisplay.align}-aligned`]: true,
						'kt-table-cell': true,
						'kt-table-cell--displays-number': columnDisplay.isNumeric,
						'kt-table-cell--is-dragged': index === draggedColumnIndex.value,
						'kt-table-cell--is-drop-target':
							index === dropTargetColumnIndex.value,
					})
						.filter(([_, isTrue]) => isTrue)
						.map(([className, _]) => className)
						.join(' ')

					return columnHelper.accessor(column.getData, {
						cell: (info) => {
							if (columnDisplay.formatter) {
								return (
									columnDisplay.formatter(info.getValue(), {
										numberFormat: i18nContext.numberFormat,
										options: column.display,
									}) ?? Dashes.EmDash
								)
							}
							return info.getValue() ?? Dashes.EmDash
						},
						enableSorting: column.isSortable ?? false,
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
			onColumnOrderChange: setColumnOrder,
			onRowSelectionChange: setRowSelection,
			// onRowSelectionChange: (updateOrValue) => {
			// 	if (!params.selection) throw new Error('no selection available')

			// 	const updatedSelection =
			// 		typeof updateOrValue === 'function'
			// 			? updateOrValue(params.selection.selectedRows.value)
			// 			: updateOrValue
			// 	params.selection.selectedRows.value = updatedSelection
			// },
			onSortingChange: setSorting,
			// onSortingChange: (_x) => {
			// 	ordering.value = tryUpdater(_x).map((x) => ({
			// 		id: x.id,
			// 		value: x.desc ? 'descending' : 'ascending',
			// 	}))
			// },
			state: {
				columnOrder: columnOrder.value,
				rowSelection: rowSelection.value,
				sorting: sorting.value,
				// sorting: ordering.value.map((x) => ({
				// 	desc: x.value === 'descending',
				// 	id: x.id,
				// })),
			},
		})),
	)

	const tableContext: TableContext<ROW> = computed(() => ({
		internal: {
			setDraggedColumnIndex: (columnId: string | null) => {
				const columnIndex = columnOrder.value.indexOf(columnId ?? '')
				draggedColumnIndex.value = columnIndex >= 0 ? columnIndex : null
			},
			setDropTargetColumnIndex: (columnId: string | null) => {
				const columnIndex = columnOrder.value.indexOf(columnId ?? '')
				dropTargetColumnIndex.value = columnIndex >= 0 ? columnIndex : null
			},
			swapDraggedAndDropTarget: () => {
				if (
					dropTargetColumnIndex.value === null ||
					draggedColumnIndex.value === null
				)
					return
				columnOrder.value = swapColumns()
			},
			table,
		},
	}))
	useProvideTableContext<ROW>(params.id, tableContext)

	return {
		ordering,
		rowSelection, // TODO: rename
		tableContext,
	}
}
