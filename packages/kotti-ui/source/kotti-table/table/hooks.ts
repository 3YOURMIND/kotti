import { Dashes } from '@metatypes/typography'
import type {
	CellContext,
	ExpandedState,
	HeaderContext,
	RowSelectionState,
	VisibilityState,
} from '@tanstack/table-core'
import {
	createColumnHelper,
	getCoreRowModel,
	getExpandedRowModel,
} from '@tanstack/table-core'
import { useVueTable } from '@tanstack/vue-table'
import classNames from 'classnames'
import { computed, h, ref, type Ref } from 'vue'
import { z } from 'zod'

import { Yoco, yocoIconSchema } from '@3yourmind/yoco'

import { KtButton } from '../../kotti-button/'
import { useI18nContext } from '../../kotti-i18n/hooks'
import ToggleInner from '../../shared-components/toggle-inner/ToggleInner.vue'
import ToggleRadio from '../../shared-components/ToggleRadio.vue'

import { type TableContext, useProvideTableContext } from './context'
import type { GetRowBehavior, KottiTable } from './types'
import { type ReactStyleUpdater, useComputedRef } from './use-computed-ref'

export const EXPANSION_COLUMN_ID = 'internal-expand-column'
export const SELECTION_COLUMN_ID = 'internal-select-column'
const ARRAY_START = 2

type SortingState<COLUMN_ID extends string = string> = {
	desc: boolean
	id: COLUMN_ID
}[]

type InternalColumnId<COLUMN_ID extends string = string> =
	| COLUMN_ID
	| typeof EXPANSION_COLUMN_ID
	| typeof SELECTION_COLUMN_ID

export type KottiTableParameter<
	ROW extends KottiTable.AnyRow,
	COLUMN_ID extends string,
> = {
	columns: KottiTable.Column<ROW, COLUMN_ID>[]
	data: ROW[]
	expandMode?: 'multi' | 'single'
	getRowBehavior: GetRowBehavior<ROW>
	hasDragAndDrop?: boolean
	id: string
	isSelectable?: 'multi' | 'single' | boolean
}

export const paramsSchema = z
	.object({
		columns: z.array(
			z
				.object({
					display: z
						.object({
							align: z.enum(['center', 'left', 'right']),
							disableCellClick: z.boolean(),
							isNumeric: z.boolean(),
							render: z.function(),
							sortBehavior: z.enum(['asc-desc', 'desc-asc']),
						})
						.strict(),
					getData: z.function(),
					id: z.string(),
					isSortable: z.boolean().default(false),
					label: z.string(),
					maxWidth: z.string().optional(),
					minWidth: z.string().optional(),
					width: z.string().optional(),
				})
				.strict(),
		),
		data: z.array(z.any()),
		expandMode: z.enum(['multi', 'single']).nullable().default(null),
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
									tooltip: z.string().optional(),
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
					isLoading: z.boolean().optional(),
				}),
			),
		hasDragAndDrop: z.boolean().default(false),
		id: z.string(),
		isSelectable: z
			.union([z.boolean(), z.enum(['multi', 'single'])])
			.nullable()
			.default(null)
			.transform((val) => {
				if (typeof val === 'string') return val
				return val ? 'multi' : null
			}),
	})
	.strict()

type InternalKottiTableParameters<
	ROW extends KottiTable.AnyRow,
	COLUMN_ID extends string,
> = {
	columns: KottiTable.Column<ROW, COLUMN_ID>[]
	data: ROW[]
	getRowBehavior: GetRowBehavior<ROW>
} & {
	expandMode: 'multi' | 'single' | null
	hasDragAndDrop: boolean
	id: string
	isSelectable: 'multi' | 'single' | null
}

type KottiTableHook<ROW extends KottiTable.AnyRow, COLUMN_ID extends string> = {
	api: KottiTable.Hook.Returns<COLUMN_ID>
	tableContext: TableContext<ROW, COLUMN_ID>
}

export const useKottiTable = <
	ROW extends KottiTable.AnyRow,
	COLUMN_ID extends string,
>(
	_params: Ref<Readonly<KottiTableParameter<ROW, COLUMN_ID>>>,
): KottiTableHook<ROW, COLUMN_ID> => {
	const params = computed(
		() =>
			paramsSchema.parse(_params.value) as InternalKottiTableParameters<
				ROW,
				COLUMN_ID
			>,
	)
	const columnHelper = createColumnHelper<ROW>()
	const i18nContext = useI18nContext()

	const columnIdSet = computed<Set<COLUMN_ID>>(() => {
		const result = new Set(params.value.columns.map((c) => c.id))

		if (result.size !== params.value.columns.length) {
			throw new Error('Column ids should be unique')
		}

		return result
	})
	const rowIdSet = computed<Set<string>>(() => {
		const { data, getRowBehavior } = params.value
		return new Set(
			data.map((row, rowIndex) => getRowBehavior({ row, rowIndex }).id),
		)
	})

	// FIXME: This useComputedRef right now assumes that column ids provdided via params
	// do not change. If a user would change them, it will lead to unintended behavior
	const columnOrder = useComputedRef<InternalColumnId[], COLUMN_ID[]>({
		get: (value) => value.slice(ARRAY_START) as COLUMN_ID[],
		set: (value) => {
			const newValue: InternalColumnId[] = [
				EXPANSION_COLUMN_ID,
				SELECTION_COLUMN_ID,
			]
			// Drop unknown columns from outside value
			for (const columnId of value) {
				if (columnIdSet.value.has(columnId) && !newValue.includes(columnId)) {
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

	// FIXME: This useComputedRef will not clear out row ids that are not present
	// in the data provided via params. That means selection is always global.
	const selectedRows = useComputedRef<RowSelectionState>({
		get: (value) => value,
		set: (value) => {
			return Object.fromEntries(
				Object.entries(value).filter(([_, isSelected]) => isSelected),
			)
		},
		value: ref({}),
	})

	const expandedRows = useComputedRef<ExpandedState, Record<string, boolean>>({
		get: (value) => {
			if (value === true)
				return Object.fromEntries(
					[...rowIdSet.value].map((rowId) => [rowId, true]),
				)

			return value
		},
		set: (value) => {
			switch (params.value.expandMode) {
				case 'multi':
					return Object.fromEntries(
						Object.entries(value).filter(
							([rowId, isExpanded]) => rowIdSet.value.has(rowId) && isExpanded,
						),
					)
				case null:
					return {}
				case 'single': {
					for (const [rowId, isExpanded] of Object.entries(value)) {
						if (rowIdSet.value.has(rowId) && isExpanded) {
							return { [rowId]: true }
						}
					}
					return {}
				}
			}
		},
		value: ref({}),
	})

	// FIXME: This useComputedRef right now assumes that column ids provdided via params
	// do not change. If a user would change them, it will lead to unintended behavior
	const ordering = useComputedRef<
		SortingState<COLUMN_ID>,
		KottiTable.Ordering<COLUMN_ID>[]
	>({
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

	// FIXME: This useComputedRef right now assumes that column ids provdided via params
	// do not change. If a user would change them, it will lead to unintended behavior
	const hiddenColumns = useComputedRef<VisibilityState, Set<COLUMN_ID>>({
		get: (value) => {
			const result = new Set<COLUMN_ID>()

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

	const triggerExpand = (rowId: string) => {
		switch (params.value.expandMode) {
			case 'multi': {
				expandedRows.value = {
					...expandedRows.value,
					[rowId]: !(rowId in expandedRows.value),
				}
				break
			}
			case null: {
				expandedRows.value = {}
				break
			}
			case 'single': {
				// eslint-disable-next-line unicorn/prefer-ternary
				if (rowId in expandedRows.value) {
					expandedRows.value = {}
				} else {
					expandedRows.value = { [rowId]: true }
				}
				break
			}
		}
	}

	const draggedColumnId: Ref<COLUMN_ID | null> = ref(null)
	/**
	 * Primarily used for displaying the drop indicator line
	 */
	const dropTargetColumnIndex = ref<number | null>(null)
	const successfullyDroppedColumnId = ref<string | null>(null)

	/**
	 * Used for selecting multiple rows via shift click
	 */
	const rowSelectionAnchorIndex = ref<{
		rowId: string
		rowIndex: number
	} | null>(null)

	const getMovedColumnOrder = (
		fromColumnId: COLUMN_ID,
		toIndex: number,
	): COLUMN_ID[] => {
		const fromIndex = columnOrder.value.indexOf(fromColumnId)
		if (fromIndex === -1)
			throw new Error(`Could not find column id ${fromColumnId}`)

		const newOrder = [...columnOrder.value]
		newOrder.splice(fromIndex, 1)
		newOrder.splice(
			toIndex > fromIndex ? toIndex - 1 : toIndex,
			0,
			fromColumnId,
		)
		return newOrder
	}

	const table = useVueTable<ROW>({
		get columns() {
			return [
				...(params.value.expandMode !== null
					? [
							columnHelper.display({
								cell: ({ row }: CellContext<ROW, unknown>) => {
									const rowBehavior = params.value.getRowBehavior({
										row: row.original,
										rowIndex: row.index,
									})
									const isDisabled = rowBehavior.disable?.expand ?? false

									return h(KtButton, {
										domProps: {
											ariaExpanded: String(row.getIsExpanded()),
											'data-test': `${params.value.id}.column-${EXPANSION_COLUMN_ID}.row-${row.id}.button`,
											disabled: isDisabled,
										},
										icon: row.getIsExpanded()
											? Yoco.Icon.CHEVRON_DOWN
											: Yoco.Icon.CHEVRON_RIGHT,
										onClick: (event: MouseEvent) => {
											event.stopPropagation()
											event.preventDefault()
											if (isDisabled) return
											triggerExpand(row.id)
										},
										staticClass: 'kt-table-expand',
										type: 'text',
									})
								},
								id: EXPANSION_COLUMN_ID,
								meta: {
									cellClasses: 'kt-table-cell kt-table-cell--is-body',
									disableCellClick: false,
									headerClasses: 'kt-table-cell kt-table-cell--is-header',
								},
							}),
						]
					: []),
				...(params.value.isSelectable === 'multi'
					? [
							columnHelper.display({
								cell: ({ row }: CellContext<ROW, unknown>) =>
									h(
										'div',
										{
											domProps: {
												ariaDisabled: !row.getCanSelect(),
											},
											onClick: (event: MouseEvent) => {
												event.stopPropagation()
												event.preventDefault()

												if (
													event.shiftKey &&
													rowSelectionAnchorIndex.value !== null &&
													rowIdSet.value.has(
														rowSelectionAnchorIndex.value.rowId,
													)
												) {
													const { rowIndex } = rowSelectionAnchorIndex.value
													const rangeStart = Math.min(rowIndex, row.index)
													const rangeEnd = Math.max(rowIndex, row.index)
													const { rows } = table.getRowModel()
													for (let i = rangeStart; i <= rangeEnd; i++) {
														const rowInRange = rows[i]
														// all rows in the range will get the toggle state that the targetted row gets.
														rowInRange?.toggleSelected(!row.getIsSelected())
													}
												} else {
													row.toggleSelected(!row.getIsSelected())
												}
												rowSelectionAnchorIndex.value = {
													rowId: row.id,
													rowIndex: row.index,
												}
											},
											staticClass: 'kt-table-selection',
											// this prevents table content selection that would happen with shift clicking
											onMousedown: (event: MouseEvent) => {
												event.preventDefault()
											},
										},
										() => [
											h(ToggleInner, {
												component: 'div',
												inputProps: {
													'data-test': `${params.value.id}.column-${SELECTION_COLUMN_ID}.row-${row.id}.checkbox`,
													disabled: !row.getCanSelect(),
													id: `${params.value.id}-${row.id}-select`,
													tabindex: 1,
												},
												isDisabled: !row.getCanSelect(),
												modelValue: row.getIsSelected(),
											}),
										],
									),
								header: ({ table }: HeaderContext<ROW, unknown>) =>
									h(
										'div',
										{
											onClick: () => {
												table.toggleAllRowsSelected(
													!table.getIsAllRowsSelected(),
												)
											},
										},
										() => [
											h(ToggleInner, {
												component: 'div',
												inputProps: {
													'data-test': `${params.value.id}.column-${SELECTION_COLUMN_ID}.header.checkbox`,
													disabled: false,
													id: `${params.value.id}-column-select-header`,
													tabindex: 1,
												},
												isDisabled: false,
												modelValue:
													table.getIsAllRowsSelected() ||
													table
														.getRowModel()
														// eslint-disable-next-line sonarjs/no-nested-functions
														.rows.some((row) => row.getIsSelected())
														? null
														: false,
											}),
										],
									),
								id: SELECTION_COLUMN_ID,
								meta: {
									cellClasses: 'kt-table-cell kt-table-cell--is-body',
									disableCellClick: false,
									headerClasses: 'kt-table-cell kt-table-cell--is-header',
								},
							}),
						]
					: []),
				...(params.value.isSelectable === 'single'
					? [
							columnHelper.display({
								cell: ({ row }: CellContext<ROW, unknown>) =>
									h(
										'div',
										{
											domProps: {
												ariaDisabled: !row.getCanSelect(),
											},
											on: {
												click: (event: MouseEvent) => {
													if (!row.getCanSelect()) return

													event.stopPropagation()
													event.preventDefault()

													const isSelected = !row.getIsSelected()
													table.toggleAllRowsSelected(false)
													row.toggleSelected(isSelected)
												},
												// this prevents table content selection that would happen with shift clicking
												mousedown: (event: MouseEvent) => {
													event.preventDefault()
												},
											},
											staticClass: 'kt-table-selection',
										},
										[
											h(ToggleRadio, {
												props: {
													isChecked: row.getIsSelected(),
													isDisabled: !row.getCanSelect(),
												},
											}),
										],
									),
								header: () => null,
								id: SELECTION_COLUMN_ID,
								meta: {
									cellClasses: 'kt-table-cell kt-table-cell--is-body',
									disableCellClick: false,
									headerClasses: 'kt-table-cell kt-table-cell--is-header',
								},
							}),
						]
					: []),
				...params.value.columns.map((column) => {
					const index = columnOrder.value.indexOf(column.id)

					const getCellClasses = (cellType: 'body' | 'header') =>
						classNames({
							[`kt-table-cell--is-${cellType}`]: true,
							[`kt-table-cell--is-${column.display.align}-aligned`]: true,
							'kt-table-cell': true,
							'kt-table-cell--displays-number': column.display.isNumeric,
							'kt-table-cell--has-drop-indicator':
								index === dropTargetColumnIndex.value,
							'kt-table-cell--has-drop-indicator-right':
								index + 1 === dropTargetColumnIndex.value &&
								columnOrder.value.length - 1 === index,
							'kt-table-cell--is-dragged': column.id === draggedColumnId.value,
							'kt-table-cell--was-successfully-dropped':
								column.id === successfullyDroppedColumnId.value,
						})

					return columnHelper.accessor(column.getData, {
						cell: (info) => {
							const value = info.getValue()

							return (
								column.display.render(value, {
									i18n: i18nContext,
								}) ?? Dashes.EmDash
							)
						},
						enableSorting: column.isSortable,
						header: () => h('div', column.label),
						id: column.id,
						meta: {
							cellClasses: getCellClasses('body'),
							disableCellClick: column.display.disableCellClick,
							headerClasses: getCellClasses('header'),
							sortBehavior: column.display.sortBehavior,
							style: {
								'max-width': column.maxWidth,
								'min-width': column.minWidth,
								width: column.width,
							},
						},
					})
				}),
			]
		},
		get data() {
			return params.value.data
		},
		enableRowSelection: (row) => {
			if (!params.value.isSelectable) return false

			const behavior = params.value.getRowBehavior({
				row: row.original,
				rowIndex: row.index,
			})
			return !behavior.disable?.select
		},
		getCoreRowModel: getCoreRowModel(),
		getExpandedRowModel:
			params.value.expandMode !== null ? getExpandedRowModel() : undefined,
		getRowId: (row, rowIndex) =>
			params.value.getRowBehavior({ row, rowIndex }).id,
		onColumnVisibilityChange: hiddenColumns.tanstackSetter,
		onRowSelectionChange: selectedRows.tanstackSetter,
		onSortingChange: ordering.tanstackSetter as ReactStyleUpdater<unknown>,
		state: {
			get columnOrder() {
				return columnOrder.tanstackGetter()
			},
			get columnVisibility() {
				return hiddenColumns.tanstackGetter()
			},
			get expanded() {
				return expandedRows.tanstackGetter()
			},
			get rowSelection() {
				return selectedRows.tanstackGetter()
			},
			get sorting() {
				return ordering.tanstackGetter()
			},
		},
	})

	const tableContext: TableContext<ROW, COLUMN_ID> = computed(() => ({
		internal: {
			getColumnIndex: (columnId) => {
				return columnOrder.value.indexOf(columnId)
			},
			getOrdering: () => {
				return ordering.value
			},
			getRowBehavior: params.value.getRowBehavior,
			hasDragAndDrop: params.value.hasDragAndDrop,
			isDragAndDropActive: draggedColumnId.value !== null,
			isExpandable: params.value.expandMode !== null,
			selectionCount: Object.values(selectedRows.value).length,
			setDraggedColumnId: (columnId) => {
				draggedColumnId.value = columnId
			},
			setDropTargetColumnIndex: (columnIndex) => {
				dropTargetColumnIndex.value = columnIndex
			},
			swapDraggedAndDropTarget: () => {
				if (
					dropTargetColumnIndex.value === null ||
					draggedColumnId.value === null
				)
					return

				columnOrder.value = getMovedColumnOrder(
					draggedColumnId.value,
					dropTargetColumnIndex.value,
				)

				successfullyDroppedColumnId.value = draggedColumnId.value
			},
			table,
			triggerExpand,
			unselectAllRows: () => {
				selectedRows.value = {}
			},
			unsetDroppedColumnId: () => {
				// Avoid eventual redraws since method will be called once per row
				if (successfullyDroppedColumnId.value === null) return

				successfullyDroppedColumnId.value = null
			},
			visibleColumns: hiddenColumns.tanstackGetter(),
		},
	}))
	useProvideTableContext<ROW, COLUMN_ID>(params.value.id, tableContext)

	return {
		api: {
			columnOrder,
			expandedRows,
			hiddenColumns,
			ordering,
			selectedRows,
		},
		tableContext,
	}
}
