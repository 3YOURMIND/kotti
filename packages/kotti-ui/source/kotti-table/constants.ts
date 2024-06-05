/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { CreateElement } from 'vue'

export const IS_ASC = /ascending|^1/
export const IS_DSC = /descending|^-1/

export const KT_TABLE = 'KT_TABLE'
export const KT_STORE = 'KT_STORE'
export const KT_LAYOUT = 'KT_LAYOUT'
export const KT_TABLE_STATE_PROVIDER = 'KT_TABLE_STATE_PROVIDER'
export const COLUMN_TYPE = Symbol('kt-table-column')

export const DEFAULT_DISABLE_ROW = (): boolean => false

export const PUBLIC_SORT_PROPS = ['prop', 'sortBy', 'sortOrder']
export const PUBLIC_COLUMN_PROPS = ['prop', 'order', 'hidden']

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
