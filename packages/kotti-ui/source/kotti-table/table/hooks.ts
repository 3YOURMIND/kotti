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
import { computed, h, ref, type Ref } from 'vue'
import { z } from 'zod'

import { Yoco, yocoIconSchema } from '@3yourmind/yoco'

import { useI18nContext } from '../../kotti-i18n/hooks'
import ToggleInner from '../../shared-components/toggle-inner/ToggleInner.vue'

import { resolveColumnDisplay } from './column'
import { type TableContext, useProvideTableContext } from './context'
import { useVueTable } from './tanstack-table'
import { useComputedRef } from './todo'
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
					actions: z
						.array(
							z
								.object({
									dataTest: z.string().optional(),
									icon: yocoIconSchema,
									isDisabled: z.boolean().optional(),
									onClick: z
										.function()
										.args()
										.returns(z.union([z.void(), z.promise(z.void())])),
								})
								.strict(),
						)
						.optional(),
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
							actions: z.boolean(),
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
	api: {
		columnOrder: Ref<string[]>
		hiddenColumns: Ref<Set<string>>
		ordering: Ref<KottiTable.Ordering[]>
		pagination: Ref<KottiTable.Pagination['state']>
		selectedRows: Ref<RowSelectionState>
	}
	tableContext: TableContext<ROW>
} => {
	const params = computed(() => paramsSchema.parse(_params.value))
	const columnHelper = createColumnHelper<ROW>()
	const i18nContext = useI18nContext()

	const columnIdSet = computed<Set<string>>(
		() => new Set(params.value.columns.map((c) => c.id)),
	)

	const columnOrder = useComputedRef<string[]>({
		get: (value) => value.toSpliced(0, ARRAY_START),
		set: (value) => {
			const newValue = [EXPANSION_COLUMN_ID, SELECTION_COLUMN_ID]
			// Drop unknown columns from outside value
			for (const columnId of value) {
				if (columnIdSet.value.has(columnId)) {
					newValue.push(columnId)
				} else {
					// eslint-disable-next-line no-console
					console.warn(`useKottiTable: dropped unknown column "${columnId}"`)
				}
			}
			// Append missing column ids
			for (const column of params.value.columns) {
				if (!newValue.includes(column.id)) {
					newValue.push(column.id)
				}
			}
			return newValue
		},
		value: ref([
			EXPANSION_COLUMN_ID,
			SELECTION_COLUMN_ID,
			...params.value.columns.map(({ id }) => id),
		]),
	})

	const pagination = useComputedRef<PaginationState>({
		get: (value) => value,
		set: (value) => {
			const currentRow = value.pageIndex * value.pageSize
			// @ts-expect-error TODO: fix pagination api
			if (currentRow > params.value.pagination?.rowCount) {
				return {
					...value,
					pageIndex: 0,
				}
			}
			return value
		},
		value: ref(
			params.value.pagination?.state ?? {
				pageIndex: 0,
				pageSize: 10,
			},
		),
	})

	const selectedRows = useComputedRef<RowSelectionState>({
		get: (value) => value,
		set: (value) => value,
		value: ref({}),
	})

	const ordering = useComputedRef<SortingState, KottiTable.Ordering[]>({
		get(value) {
			return value.map((sorting) => ({
				id: sorting.id,
				value: sorting.desc ? ('descending' as const) : ('ascending' as const),
			}))
		},
		set(value) {
			return (
				value
					// Remove entries that do not have a valid column
					.filter((sorting) => columnIdSet.value.has(sorting.id))
					.map((sorting) => ({
						desc: sorting.value === 'descending',
						id: sorting.id,
					}))
			)
		},
		value: ref([]),
	})

	const hiddenColumns = useComputedRef<VisibilityState, Set<string>>({
		get: (value) => {
			const result = new Set<string>()

			for (const id of columnIdSet.value) {
				if (value[id] === false) result.add(id)
			}

			return result
		},
		set: (newSet) => {
			const newVisibilityState: VisibilityState = {}

			for (const id of columnIdSet.value) {
				newVisibilityState[id] = !newSet.has(id)
			}

			return newVisibilityState
		},
		value: ref(
			Object.fromEntries(
				params.value.columns.map((column) => [column.id, true]),
			),
		),
	})

	const draggedColumnIndex = ref<number | null>(null)
	const dropTargetColumnIndex = ref<number | null>(null)
	const successfullyDroppedColumnId = ref<string | null>(null)

	const moveColumnTo = (fromIndex: number, toIndex: number): string[] => {
		// console.log({ fromIndex, name: 'moveColumnTo', toIndex })
		const droppedColumnId = columnOrder.tanstackGetter()[fromIndex]
		if (!droppedColumnId) throw new Error('index is out of bound')

		const spliced = columnOrder.tanstackGetter().toSpliced(fromIndex, 1)
		spliced.splice(
			toIndex > fromIndex ? toIndex - 1 : toIndex,
			0,
			droppedColumnId,
		)
		// TODO setting this should not happen in this util function
		successfullyDroppedColumnId.value = droppedColumnId
		return spliced
	}

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
					const index = columnOrder.tanstackGetter().indexOf(column.id)

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
							columnOrder.tanstackGetter().length - 1 === index,
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
			onColumnVisibilityChange: hiddenColumns.tanstackSetter,
			onPaginationChange: params.value.pagination
				? pagination.tanstackSetter
				: undefined,
			onRowSelectionChange: selectedRows.tanstackSetter,
			onSortingChange: ordering.tanstackSetter,
			rowCount:
				params.value.pagination?.type === KottiTable.PaginationType.REMOTE
					? params.value.pagination.rowCount
					: undefined,
			state: {
				columnOrder: columnOrder.tanstackGetter(),
				columnVisibility: hiddenColumns.tanstackGetter(),
				pagination: params.value.pagination
					? pagination.tanstackGetter()
					: undefined,
				rowSelection: selectedRows.tanstackGetter(),
				sorting: ordering.tanstackGetter(),
			},
		})),
	)

	const tableContext: TableContext<ROW> = computed(() => ({
		internal: {
			getColumnIndex: (columnId: string) => {
				return columnOrder.tanstackGetter().indexOf(columnId)
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

				columnOrder.tanstackSetter(
					moveColumnTo(draggedColumnIndex.value, dropTargetColumnIndex.value),
				)
			},
			table,
		},
	}))
	useProvideTableContext<ROW>(params.value.id, tableContext)

	return {
		api: {
			columnOrder,
			hiddenColumns,
			ordering,
			pagination,
			selectedRows,
		},
		tableContext,
	}
}
