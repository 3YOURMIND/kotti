export const SORT_ASC = 'ascending'
export const IS_ASC = /ascending|^1/
export const SORT_DSC = 'descending'
export const IS_DSC = /descending|^-1/
export const SORT_NONE = null

export const KT_TABLE = 'KT_TABLE'
export const KT_STORE = 'KT_STORE'
export const KT_LAYOUT = 'KT_LAYOUT'
export const KT_TABLE_STATE_PROVIDER = 'KT_TABLE_STATE_PROVIDER'
export const COLUMN_TYPE = Symbol('kt-table-column')

export const DEFAULT_DISABLE_ROW = () => false

export const PUBLIC_SORT_PROPS = ['prop', 'sortBy', 'sortOrder']
export const PUBLIC_COLUMN_PROPS = ['prop', 'order', 'hidden']

export const DEFAULT_RENDER_CELL = function DEFAULT_RENDER_CELL(
	h,
	{ row, rowIndex, column, columnIndex, value },
) {
	return [
		column.formatter(value, row, column, columnIndex, rowIndex) ??
			column.default,
	]
}

export const DEFAULT_RENDER_HEADER = function DEFAULT_RENDER_HEADER(
	h,
	{ column },
) {
	return [column.label === undefined ? column.prop : column.label]
}
