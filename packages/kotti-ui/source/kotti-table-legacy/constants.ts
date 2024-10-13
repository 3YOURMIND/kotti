/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { CreateElement, InjectionKey, VNodeChildren } from 'vue'
import type { Vue as VueType } from 'vue/types/vue'

import type { TypedEmit } from '../types/typed-emit'

import type { TableStore } from './logic/store'
import type { Store } from './logic/types'
import type { KottiTableLegacy } from './types'

export const IS_ASC = /ascending|^1/
export const IS_DSC = /descending|^-1/

interface KottiTableContext {
	_renderActions: (
		h: CreateElement,
		payload: {
			data: KottiTableLegacy.Row.Props
			row: KottiTableLegacy.Row.Props
			rowIndex: number
		},
	) => VNodeChildren
	_renderEmpty: (h: CreateElement) => VNodeChildren
	_renderExpand: (
		h: CreateElement,
		payload: {
			data: KottiTableLegacy.Row.Props
			row: KottiTableLegacy.Row.Props
			rowIndex: number
		},
	) => VNodeChildren
	_renderLoading: (h: CreateElement) => VNodeChildren
	$emit: TypedEmit<{
		activateRow: [unknown, number]
		cellClick: [
			{
				column: Store.StateComponents.ColumnRepresentation
				columnIndex: number
				row: KottiTableLegacy.Row.Props
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
	colSpan: number
	disableRow: KottiTableLegacy.Props['disableRow']
	hasActions: boolean
	headerClass: KottiTableLegacy.Props['headerClass']
	isExpandable: boolean
	isInteractive: KottiTableLegacy.Props['isInteractive']
	isSelectable: KottiTableLegacy.Props['isSelectable']
	loading: boolean
	tdClasses: KottiTableLegacy.Props['tdClasses']
	thClasses: KottiTableLegacy.Props['thClasses']
	trClasses: KottiTableLegacy.Props['trClasses']
	useColumnDragToOrder: KottiTableLegacy.Props['useColumnDragToOrder']
	useQuickSortControl: KottiTableLegacy.Props['useQuickSortControl']
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
	{ column, columnIndex, row, rowIndex, value }: any,
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
/* eslint-enable @typescript-eslint/explicit-module-boundary-types */
/* eslint-enable @typescript-eslint/no-explicit-any */
