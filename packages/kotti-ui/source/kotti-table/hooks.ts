import { Dashes } from '@metatypes/typography'
import type {
	ColumnMeta,
	RowSelectionState,
	SortingState,
	VisibilityState,
} from '@tanstack/table-core'
import {
	type CellContext,
	createColumnHelper,
	getCoreRowModel,
	getExpandedRowModel,
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

export const EXPANSION_COLUMN_ID = 'kt-table-inner-expand'
export const SELECTION_COLUMN_ID = 'kt-table-inner-select'
export const ARRAY_START = 2

type KottiTableParameter<
	ROW extends AnyRow,
	COLUMN_IDS extends string = string,
> = Ref<{
	columns: KottiTable.Column<ROW, COLUMN_IDS>[]
	data: ROW[]
	getRowId: (row: ROW) => string
	hasDragAndDrop?: boolean
	id: string
	isExpandable?: boolean
	selection?: Record<string, never> //{
	// mode: 'single-page' | 'global'   // Consider negative selection for global case
	// onSelectionUpdate: (updated: Record<string, boolean>) => void
	// selectedRows: Ref<Record<string, boolean>>
	//}
}>

// TODO: check for Exclude<> issue with generic
export const useKottiTable = <ROW extends AnyRow>(
	params: KottiTableParameter<ROW>,
): {
	columnOrder: Ref<string[]>
	hiddenColumns: Ref<Set<string>>
	ordering: Ref<KottiTable.Ordering[]>
	rowSelection: Ref<RowSelectionState>
	tableContext: TableContext<ROW>
} => {
	const columnHelper = createColumnHelper<ROW>()
	const i18nContext = useI18nContext()

	const columnIdSet = computed<Set<string>>(
		() => new Set(params.value.columns.map((c) => c.id)),
	)

	const ordering = ref<KottiTable.Ordering[]>([])
	const columnOrderInternal = ref<string[]>([
		EXPANSION_COLUMN_ID,
		SELECTION_COLUMN_ID,
		...params.value.columns.map(({ id }) => id),
	])

	// watch(
	// 	() => params,
	// 	() => {
	// 		columnOrderInternal.value = [
	// 			...(params.value.isExpandable ? [EXPANSION_COLUMN_ID] : []),
	// 			...(params.value.selection ? [SELECTION_COLUMN_ID] : []),
	// 			...columnOrderInternal.value.filter(
	// 				(columnId) =>
	// 					![EXPANSION_COLUMN_ID, SELECTION_COLUMN_ID].includes(columnId),
	// 			),
	// 		]
	// 	},
	// 	{ immediate: true },
	// )

	// TODO: should we do this
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
	const [sorting, setSorting] = useState<SortingState>([])
	const [visibilityState, setVisibiltyState] = useState<VisibilityState>(
		Object.fromEntries(params.value.columns.map((column) => [column.id, true])),
	)

	const draggedColumnIndex = ref<number | null>(null)
	const dropTargetColumnIndex = ref<number | null>(null)
	const successfullyDroppedColumnId = ref<string | null>(null)

	const moveColumnTo = (fromIndex: number, toIndex: number): string[] => {
		console.log({ fromIndex, name: 'moveColumnTo', toIndex })
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
				...(params.value.isExpandable
					? [
							columnHelper.display({
								cell: ({ row }: CellContext<ROW, unknown>) =>
									h('KtButton', {
										on: {
											click: () => {
												row.toggleExpanded(!row.getIsExpanded())
											},
										},
										props: {
											icon: row.getIsExpanded() ? 'chevron_up' : 'chevron_down',
											size: 'small',
											type: 'text',
										},
										style: {
											color: 'var(--icon-02)',
											padding: 0,
										},
									}),
								id: EXPANSION_COLUMN_ID,
								meta: {
									cellClasses: '',
									headerClasses: '',
								},
							}),
						]
					: []),
				...(params.value.selection
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
									cellClasses: 'kt-table-cell kt-table-cell--is-body',
									headerClasses: 'kt-table-cell kt-table-cell--is-header',
								},
							}),
						]
					: []),
				...params.value.columns.map((column, _, columns) => {
					const columnDisplay = resolveColumnDisplay(column.display)
					const index = columnOrderInternal.value.indexOf(column.id)

					// TODO: The alignmentClass generation is a bit complex. You could simplify this by directly joining classes without filtering when boolean values are true, or consider a helper function to manage conditional classes. — ChatGippety
					const getCellClasses = (cellType: 'header' | 'body'): string =>
						Object.entries({
							[`kt-table-cell--is-${cellType}`]: true,
							[`kt-table-cell--is-${columnDisplay.align}-aligned`]: true,
							'kt-table-cell': true,
							'kt-table-cell--displays-number': columnDisplay.isNumeric,
							'kt-table-cell--has-drop-indicator':
								index === dropTargetColumnIndex.value,
							'kt-table-cell--has-drop-indicator-right':
								index + 1 === dropTargetColumnIndex.value &&
								index === columns.length - 1,
							'kt-table-cell--is-dragged': index === draggedColumnIndex.value,
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
						header: () => h('div', { style: { flex: 1 } }, column.label),
						id: column.id,
						meta: {
							cellClasses: getCellClasses('body'),
							headerClasses: getCellClasses('header'),
						} satisfies ColumnMeta<ROW, unknown>,
					})
				}),
			],
			data: params.value.data,
			getCoreRowModel: getCoreRowModel(),
			getExpandedRowModel: params.value.isExpandable
				? getExpandedRowModel()
				: undefined,
			getRowId: params.value.getRowId,
			onColumnVisibilityChange: setVisibiltyState,
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
				columnVisibility: visibilityState.value,
			},
		})),
	)

	const tableContext: TableContext<ROW> = computed(() => ({
		internal: {
			getColumnIndex: (columnId: string) => {
				return columnOrderInternal.value.indexOf(columnId)
			},
			hasDragAndDrop: Boolean(params.value.hasDragAndDrop),
			isExpandable: Boolean(params.value.isExpandable),
			isSelectable: Boolean(params.value.selection),
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
	useProvideTableContext<ROW>(params.value.id, tableContext)

	return {
		columnOrder: computed({
			get: () => columnOrderInternal.value.toSpliced(0, ARRAY_START),
			set: (value) => {
				columnOrderInternal.value = [
					EXPANSION_COLUMN_ID,
					SELECTION_COLUMN_ID,
					...value,
				]
			},
		}),
		hiddenColumns: computed({
			get: () => {
				const result = new Set<string>()

				for (const id of columnIdSet.value) {
					if (visibilityState.value[id] === false) result.add(id)
				}

				return result
			},
			set: (newSet) => {
				const newVisibilityState: VisibilityState = {}

				for (const id of columnIdSet.value) {
					newVisibilityState[id] = !newSet.has(id)
				}

				visibilityState.value = newVisibilityState
			},
		}),
		ordering,
		rowSelection, // TODO: rename
		tableContext,
	}
}
