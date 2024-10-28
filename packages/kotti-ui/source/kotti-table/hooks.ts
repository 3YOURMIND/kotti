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

export const SELECTION_COLUMN_ID = 'kt-table-inner-select'

type KottiTableParameter<
	ROW extends AnyRow,
	COLUMN_IDS extends string = string,
> = {
	columns: Ref<KottiTable.Column<ROW, COLUMN_IDS>[]>
	data: Ref<ROW[]>
	hasDragAndDrop?: boolean
	id: string
	selection?: {
		getRowId: (row: ROW) => string // maybe needed in other places?
		// mode: 'single-page' | 'global'   // Consider negative selection for global case
		// onSelectionUpdate: (updated: Record<string, boolean>) => void
		// selectedRows: Ref<Record<string, boolean>>
	}
}

// TODO: check for Exclude<> issue with generic
export const useKottiTable = <ROW extends AnyRow>(
	params: KottiTableParameter<ROW>,
): {
	columnOrder: Ref<string[]>
	ordering: Ref<KottiTable.Ordering[]>
	rowSelection: Ref<RowSelectionState>
	tableContext: TableContext<ROW>
} => {
	const columnHelper = createColumnHelper<ROW>()
	const i18nContext = useI18nContext()

	const ordering = ref<KottiTable.Ordering[]>([])
	const columnOrderInternal = ref<string[]>([
		...(params.selection ? [SELECTION_COLUMN_ID] : []),
		...params.columns.value.map(({ id }) => id),
	])

	// TODO: should we do this
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
	const [sorting, setSorting] = useState<SortingState>([])

	const draggedColumnIndex = ref<number | null>(null)
	const dropTargetColumnIndex = ref<number | null>(null)
	const successfullyDroppedColumnId = ref<string | null>(null)

	const moveColumnTo = (fromIndex: number, toIndex: number): string[] => {
		console.log({ name: 'moveColumnTo', fromIndex, toIndex })
		const droppedColumnId = columnOrderInternal.value[fromIndex]
		if (!droppedColumnId) throw new Error('index is out of bound')

		const spliced = columnOrderInternal.value.toSpliced(fromIndex, 1)
		spliced.splice(
			toIndex > fromIndex ? toIndex - 1 : toIndex,
			0,
			droppedColumnId,
		)
		successfullyDroppedColumnId.value = droppedColumnId
		return spliced
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
								id: SELECTION_COLUMN_ID,
								meta: {
									cellClasses: 'kt-table-cell',
									headerClasses: 'kt-table-cell',
								},
							}),
						]
					: []),
				...params.columns.value.map((column, _, columns) => {
					const columnDisplay = resolveColumnDisplay(column.display)
					const index = columnOrderInternal.value.indexOf(column.id)

					// TODO: The alignmentClass generation is a bit complex. You could simplify this by directly joining classes without filtering when boolean values are true, or consider a helper function to manage conditional classes. — ChatGippety
					const alignmentClass: string = Object.entries({
						[`kt-table-cell--is-${columnDisplay.align}-aligned`]: true,
						'kt-table-cell': true,
						'kt-table-cell--displays-number': columnDisplay.isNumeric,
						'kt-table-cell--is-dragged': index === draggedColumnIndex.value,
						'kt-table-cell--has-drop-indicator':
							index === dropTargetColumnIndex.value,
						'kt-table-cell--has-drop-indicator-right':
							index + 1 === dropTargetColumnIndex.value &&
							index === columns.length - 1,
						'kt-table-cell--was-successfully-dropped':
							column.id === successfullyDroppedColumnId.value,
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
				columnOrder: columnOrderInternal.value,
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
			hasDragAndDrop: Boolean(params.hasDragAndDrop),
			isSelectable: Boolean(params.selection),
			setDraggedColumnIndex: (columnIndex: number | null) => {
				draggedColumnIndex.value = columnIndex
			},
			setDropTargetColumnIndex: (columnIndex: number | null) => {
				dropTargetColumnIndex.value = columnIndex
			},
			swapDraggedAndDropTarget: () => {
				if (
					dropTargetColumnIndex.value === null ||
					draggedColumnIndex.value === null
				)
					return

				columnOrderInternal.value = moveColumnTo(
					draggedColumnIndex.value,
					dropTargetColumnIndex.value,
				)
			},
			table,
		},
	}))
	useProvideTableContext<ROW>(params.id, tableContext)

	return {
		columnOrder: computed({
			get: () =>
				columnOrderInternal.value.filter(
					(columnId) => columnId !== SELECTION_COLUMN_ID,
				),
			set: (value) =>
				(columnOrderInternal.value = [
					...(params.selection ? [SELECTION_COLUMN_ID] : []),
					...value,
				]),
		}),
		ordering,
		rowSelection, // TODO: rename
		tableContext,
	}
}
