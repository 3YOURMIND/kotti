/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { CreateElement, InjectionKey, VNodeChildren } from 'vue'
import type { Vue as VueType } from 'vue/types/vue'

import type { KottiTable } from './types'
import type { TypedEmit } from '../types/typed-emit'
import type { TableStore } from './logic/store'
import type { Store } from './logic/types'

export const IS_ASC = /ascending|^1/
export const IS_DSC = /descending|^-1/

interface KottiTableContext {
	$emit: TypedEmit<{
		activateRow: [unknown, number]
		cellClick: [
			{
				column: Store.StateComponents.ColumnRepresentation
				columnIndex: number
				row: KottiTable.Row.Props
				rowIndex: number
				value: unknown
			},
		]
		columnsChange: unknown[]
		expand: unknown[]
		expandChange: unknown[]
		hiddenChange: unknown[]
		orderChange: unknown[]
		rowBlur: [unknown, number]
		rowClick: [unknown, number]
		rowFocus: [unknown, number]
		select: unknown[]
		selectAll: unknown[]
		selectionChange: unknown[]
		sortChange: unknown[]
	}>
	$listeners: VueType['$listeners']
	_renderActions: (
		h: CreateElement,
		payload: {
			data: KottiTable.Row.Props
			row: KottiTable.Row.Props
			rowIndex: number
		},
	) => VNodeChildren
	_renderEmpty: (h: CreateElement) => VNodeChildren
	_renderExpand: (
		h: CreateElement,
		payload: {
			data: KottiTable.Row.Props
			row: KottiTable.Row.Props
			rowIndex: number
		},
	) => VNodeChildren
	_renderLoading: (h: CreateElement) => VNodeChildren
	colSpan: number
	disableRow: KottiTable.Props['disableRow']
	hasActions: boolean
	headerClass: KottiTable.Props['headerClass']
	isExpandable: boolean
	isInteractive: KottiTable.Props['isInteractive']
	isSelectable: KottiTable.Props['isSelectable']
	loading: boolean
	tdClasses: KottiTable.Props['tdClasses']
	thClasses: KottiTable.Props['thClasses']
	trClasses: KottiTable.Props['trClasses']
	useColumnDragToOrder: KottiTable.Props['useColumnDragToOrder']
	useQuickSortControl: KottiTable.Props['useQuickSortControl']
}

/**
 * HACK: This is a string type-masquerading as a symbol, because
 *   - using a string works perfectly fine at runtime
 *   - an InjectionKey needs to be a symbol
 *   - using a Symbol will produce strange runtime issues
 *
 * Plan for now: probably this needs to be done for the other injection keys as well.
 * At a later stage of refactoring the table to composition API we can probably use actual symbols
 */
export const KT_TABLE: InjectionKey<KottiTableContext> =
	'KT_TABLE' as unknown as symbol
export const KT_STORE: InjectionKey<TableStore> =
	'KT_STORE' as unknown as symbol
export const KT_TABLE_STATE_PROVIDER = 'KT_TABLE_STATE_PROVIDER'
export const COLUMN_TYPE = Symbol('kt-table-column')

export const DEFAULT_DISABLE_ROW = (): boolean => false

export const PUBLIC_SORT_PROPS = [
	'prop',
	'sortBy',
	'sortOrder',
] satisfies (keyof Store.StateComponents.ColumnRepresentation)[]
export const PUBLIC_COLUMN_PROPS = [
	'prop',
	'order',
	'hidden',
] satisfies (keyof Store.StateComponents.ColumnRepresentation)[]

export const DEFAULT_RENDER_CELL = function defaultRenderCell(
	_h: CreateElement,
	{ row, rowIndex, column, columnIndex, value }: any,
): [any] {
	return [
		column.formatter(value, row, column, columnIndex, rowIndex) ??
			column.default,
	]
}

export const DEFAULT_RENDER_HEADER = function defaultRenderHeader(
	_h: CreateElement,
	{ column }: any,
): [any] {
	return [column.label === undefined ? column.prop : column.label]
}
