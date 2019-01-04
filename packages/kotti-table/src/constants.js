export const SORT_ASC = 'ascending'
export const SORT_DSC = 'descending'
export const SORT_NONE = null

export const KT_TABLE = 'KT_TABLE'
export const KT_STORE = 'KT_STORE'
export const KT_LAYOUT = 'KT_LAYOUT'
export const KT_TABLE_STATE_PROVIDER = 'KT_TABLE_STATE_PROVIDER'
export const COLUMN_TYPE = Symbol('kt-table-column')

export const DEFAULT_RENDER_CELL = function DEFAULT_RENDER_CELL(
	h,
	{ row, rowIndex, column, columnIndex, value },
) {
	return [
		column.formatter(value, row, column, columnIndex, rowIndex) ||
			(typeof column.default === 'function'
				? column.default(value, row, column, columnIndex, rowIndex)
				: column.default),
	]
}

export const DEFAULT_RENDER_HEADER = function DEFAULT_RENDER_HEADER(
	h,
	{ column },
) {
	return [column.label === undefined ? column.prop : column.label]
}
