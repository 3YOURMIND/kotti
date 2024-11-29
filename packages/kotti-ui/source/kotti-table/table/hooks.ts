import { Dashes } from '@metatypes/typography'
import type {
	CellContext,
	HeaderContext,
	PaginationState,
	RowSelectionState,
	SortingState,
	VisibilityState,
} from '@tanstack/table-core'
import {
	createColumnHelper,
	getCoreRowModel,
	getExpandedRowModel,
	getPaginationRowModel,
} from '@tanstack/table-core'
import { computed, h, ref, type Ref, watch } from 'vue'
import { z } from 'zod'

import { Yoco } from '@3yourmind/yoco'

import { useI18nContext } from '../../kotti-i18n/hooks'
import ToggleInner from '../../shared-components/toggle-inner/ToggleInner.vue'

import { resolveColumnDisplay } from './column'
import { type TableContext, useProvideTableContext } from './context'
import { useState, useVueTable } from './tanstack-table'
import type { GetRowBehavior } from './types'
import type { AnyRow } from './types'
import { KottiTable } from './types'

export const EXPANSION_COLUMN_ID = 'kt-table-inner-expand'
export const SELECTION_COLUMN_ID = 'kt-table-inner-select'
export const ARRAY_START = 2

export type KottiTableParameter<
	ROW extends AnyRow,
	COLUMN_IDS extends string = string,
> = Ref<{
	columns: KottiTable.Column<ROW, COLUMN_IDS>[]
	data: ROW[]
	getRowBehavior: GetRowBehavior<ROW>
	hasDragAndDrop?: boolean
	id: string
	isExpandable?: boolean
	isSelectable?: boolean //{
	// mode: 'single-page' | 'global'   // Consider negative selection for global case
	// onSelectionUpdate: (updated: Record<string, boolean>) => void
	// selectedRows: Ref<Record<string, boolean>>
	//}
	pagination?: KottiTable.Pagination
}>

export const paramsSchema = z
	.object({
		//TODO:
		// actions : list of buttons (based on baseOptionSchema)
		columns: z.array(KottiTable.columnSchema),
		data: z.array(z.any()),
		/**
		 * Keep in sync with type expression
		 * @see GetRowBehavior
		 */
		getRowBehavior: z
			.function()
			.args(z.object({ row: z.record(z.unknown()), rowIndex: z.number() }))
			.returns(
				z.object({
					classes: z.array(z.string()).optional(),
					click: z
						.union([
							z.object({
								component: z.null(),
								onClick: z
									.function()
									.args()
									.returns(z.union([z.void(), z.promise(z.void())])),
							}),
							z.object({
								component: z.literal('a'),
								on: z.record(z.unknown()).optional(),
								props: z.object({ href: z.string() }).passthrough(),
							}),
							z.object({
								component: z.string().regex(/^[^a]($|.+)/),
								on: z.record(z.unknown()).optional(),
								props: z.record(z.unknown()).optional(),
							}),
							z.literal('expand'),
						])
						.optional(),
					disable: z
						.object({
							click: z.boolean(),
							expand: z.boolean(),
							select: z.boolean(),
						})
						.optional(),
					id: z.string(),
				}),
			),
		hasDragAndDrop: z.boolean().default(false),
		id: z.string(),
		isExpandable: z.boolean().default(false),
		isSelectable: z.boolean().default(false),
		pagination: KottiTable.paginationSchema.optional(),
	})
	.strict()

// TODO: check for Exclude<> issue with generic
export const useKottiTable = <ROW extends AnyRow>(
	_params: KottiTableParameter<ROW>,
): {
	columnOrder: Ref<string[]>
	hiddenColumns: Ref<Set<string>>
	ordering: Ref<KottiTable.Ordering[]>
	rowSelection: Ref<RowSelectionState>
	tableContext: TableContext<ROW>
} => {
	const params = computed(() => paramsSchema.parse(_params.value))
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
	// const hasActionSlot = ref(false)

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
	const [pagination, setPagination] = useState<PaginationState>(
		params.value.pagination?.state ?? {
			pageIndex: 0,
			pageSize: 10,
		},
	)
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
	const [sorting, setSorting] = useState<SortingState>([])
	const [visibilityState, setVisibiltyState] = useState<VisibilityState>(
		Object.fromEntries(params.value.columns.map((column) => [column.id, true])),
	)

	const draggedColumnIndex = ref<number | null>(null)
	const dropTargetColumnIndex = ref<number | null>(null)
	const successfullyDroppedColumnId = ref<string | null>(null)

	const moveColumnTo = (fromIndex: number, toIndex: number): string[] => {
		// console.log({ fromIndex, name: 'moveColumnTo', toIndex })
		const droppedColumnId = columnOrderInternal.value[fromIndex]
		if (!droppedColumnId) throw new Error('index is out of bound')

		const spliced = columnOrderInternal.value.toSpliced(fromIndex, 1)
		spliced.splice(
			toIndex > fromIndex ? toIndex - 1 : toIndex,
			0,
			droppedColumnId,
		)
		// TODO setting this should not happen in this util function
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

	const table = useVueTable<ROW>(
		computed(() => ({
			columns: [
				...(params.value.isExpandable
					? [
							columnHelper.display({
								cell: ({ row }: CellContext<ROW, unknown>) => {
									const rowBehavior = params.value.getRowBehavior({
										row: row.original,
										rowIndex: row.index,
									})
									const isDisabled = rowBehavior.disable?.expand ?? false

									return h(
										'div',
										{
											class: {
												'kt-table-expand': true,
												yoco: true,
											},
											domProps: {
												ariaDisabled: String(isDisabled),
												ariaExpanded: String(row.getIsExpanded()),
												role: 'button',
												// tabindex: 0, focus css
											},
											on: {
												click: (event: MouseEvent) => {
													event.stopPropagation()
													event.preventDefault()
													if (isDisabled) return
													row.toggleExpanded(!row.getIsExpanded())
												},
											},
										},
										row.getIsExpanded()
											? Yoco.Icon.CHEVRON_DOWN
											: Yoco.Icon.CHEVRON_RIGHT,
									)
								},
								id: EXPANSION_COLUMN_ID,
								meta: {
									cellClasses: 'kt-table-cell kt-table-cell--is-body',
									disableCellClick: true,
									headerClasses: 'kt-table-cell kt-table-cell--is-header',
									type: 'text',
								},
							}),
						]
					: []),
				...(params.value.isSelectable
					? [
							columnHelper.display({
								cell: ({ row }: CellContext<ROW, unknown>) =>
									h(
										'div',
										{
											class: 'kt-table-selection',
											on: {
												click: (event: MouseEvent) => {
													event.stopPropagation()
													event.preventDefault()
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
														id: `${params.value.id}-${row.id}-select`,
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
														id: `${params.value.id}-header-select-all`,
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
									disableCellClick: true,
									headerClasses: 'kt-table-cell kt-table-cell--is-header',
									type: 'text',
								},
							}),
						]
					: []),
				...params.value.columns.map((column) => {
					const columnDisplay = resolveColumnDisplay(column.display)
					const index = columnOrderInternal.value.indexOf(column.id)

					// TODO: The alignmentClass generation is a bit complex. You could simplify this by directly joining classes without filtering when boolean values are true, or consider a helper function to manage conditional classes. — ChatGippety
					const getCellClasses = (
						cellType: 'body' | 'header',
					): Record<string, boolean> => ({
						[`kt-table-cell--is-${cellType}`]: true,
						[`kt-table-cell--is-${columnDisplay.align}-aligned`]: true,
						'kt-table-cell': true,
						'kt-table-cell--displays-number': columnDisplay.isNumeric,
						'kt-table-cell--has-drop-indicator':
							index === dropTargetColumnIndex.value,
						'kt-table-cell--has-drop-indicator-right':
							index + 1 === dropTargetColumnIndex.value &&
							columnOrderInternal.value.length - 1 === index,
						'kt-table-cell--is-dragged': index === draggedColumnIndex.value,
						'kt-table-cell--was-successfully-dropped':
							column.id === successfullyDroppedColumnId.value,
					})

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
						enableSorting: column.isSortable,
						header: () => h('div', { style: { flex: 1 } }, column.label),
						id: column.id,
						meta: {
							cellClasses: getCellClasses('body'),
							disableCellClick: columnDisplay.disableCellClick,
							headerClasses: getCellClasses('header'),
							type: column.display.type,
						},
					})
				}),
				// Column for actions may not need to exist in tanstack
				// ...(hasActionSlot.value
				// 	? [
				// 			columnHelper.display({
				// 				id: ACTION_COLUMN_ID,
				// 				meta: {
				// 					cellClasses: 'kt-table-cell kt-table-cell--is-actions',
				// 					headerClasses: 'kt-table-cell',
				// 					meta: '',
				// 				},
				// 			}),
				// 		]
				// 	: []),
			],
			data: params.value.data,
			enableRowSelection: (row) => {
				if (!params.value.isSelectable) return false

				const behavior = params.value.getRowBehavior({
					row: row.original,
					rowIndex: row.index,
				})
				return !behavior.disable?.select
			},
			getCoreRowModel: getCoreRowModel(),
			getExpandedRowModel: params.value.isExpandable
				? getExpandedRowModel()
				: undefined,
			getPaginationRowModel:
				params.value.pagination?.type === KottiTable.PaginationType.LOCAL
					? getPaginationRowModel()
					: undefined,
			getRowId: (row, rowIndex) =>
				params.value.getRowBehavior({ row, rowIndex }).id,
			manualPagination:
				params.value.pagination?.type === KottiTable.PaginationType.REMOTE,
			onColumnVisibilityChange: setVisibiltyState,
			onPaginationChange: params.value.pagination ? setPagination : undefined,
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
			rowCount:
				params.value.pagination?.type === KottiTable.PaginationType.REMOTE
					? params.value.pagination.rowCount
					: undefined,
			state: {
				columnOrder: columnOrderInternal.value,
				columnVisibility: visibilityState.value,
				pagination: params.value.pagination ? pagination.value : undefined,
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
			getColumnIndex: (columnId: string) => {
				return columnOrderInternal.value.indexOf(columnId)
			},
			getOrdering: () => {
				return ordering.value
			},
			getRowBehavior: params.value.getRowBehavior,
			hasDragAndDrop: Boolean(params.value.hasDragAndDrop),
			isExpandable: Boolean(params.value.isExpandable),
			isSelectable: Boolean(params.value.isSelectable),
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
