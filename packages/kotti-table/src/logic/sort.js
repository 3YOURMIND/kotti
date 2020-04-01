import pick from 'lodash/pick'
import property from 'lodash/property'
import { setColumnsArray, getColumnsArray, getColumn } from './column'
import {
	IS_ASC,
	IS_DSC,
	SORT_DSC,
	SORT_NONE,
	PUBLIC_SORT_PROPS,
} from '../constants'

export const defaultState = {
	sortMultiple: false,
	remoteSort: false,
	sortable: false,
	sortedColumns: [],
}

export const mutations = {
	sort(store, options) {
		const { column, order } = options
		setSortedColumn(store.state, column)
		column.sortOrder = order || getNextSortOrder(column)
		if (column.sortOrder === SORT_NONE) {
			store.commit('removeSortedColumn', column)
		} else {
			store.commit('changeSortConditions', { column })
		}
	},

	removeSortedColumn(store, column) {
		const { state } = store
		const index = getSortedColumnIndex(state, column)
		const isInsortOrder = index !== -1
		if (isInsortOrder) {
			state.sortedColumns.splice(index, 1)
		}
		column.sortOrder = SORT_NONE
		store.commit('changeSortConditions', { column })
	},

	changeSortConditions(store, options) {
		const { state } = store
		state.rows = sortData(state.filteredData || state._data || [], state)

		if (!options || !options.silent) {
			const sortedColumns = state.sortedColumns.map((column) => {
				column = pick(column, PUBLIC_SORT_PROPS)
				return {
					...column,
					sortBy: column.sortBy || column.prop,
				}
			})
			store.emit('sortChange', {
				sortedColumns,
				column: options.column,
				prop: options.column.prop,
				sortBy: options.column.sortBy || options.column.prop,
				sortOrder: options.column.sortOrder,
			})
		}
	},
	setSortedColumns(store, columns = store.state.sortedColumns) {
		setColumnsArray(store.state, 'sortedColumns', PUBLIC_SORT_PROPS, columns)
		store.commit('updateColumns', { emitChange: false })
	},
}

export const getters = {
	hasSortOrder(state, column) {
		column = getSortedColumn(state, column)
		return column && column.sortOrder !== false
	},
	canSort(state, column) {
		return column.sortable || (state.sortable && column.sortable !== false)
	},
	isSorted(state, column) {
		column = getSortedColumn(state, column)
		return column && column.sortOrder !== SORT_NONE
	},
	isSortedByAsc(state, column) {
		column = getSortedColumn(state, column)
		return column && IS_ASC.test(String(column.sortOrder))
	},
	isSortedByDsc(state, column) {
		column = getSortedColumn(state, column)
		return column && IS_DSC.test(String(column.sortOrder))
	},
	getSortedColumns(state) {
		return getColumnsArray(state, 'sortedColumns')
	},
}

export function setSortedColumn(state, column) {
	if (!state.sortMultiple) {
		state.sortedColumns = [column]
	} else {
		const columnIndex = getSortedColumnIndex(state, column)
		if (columnIndex !== -1) {
			state.sortedColumns[columnIndex] = column
		} else {
			state.sortedColumns = [...state.sortedColumns, column]
		}
	}
}

export function setSortedColumns(state, columns) {
	state.sortedColumns = columns.map((column) => {
		column = pick(column, ['prop', 'sortOrder'])
		const oldColumn = getColumn(state, column) || {}
		return Object.assign(oldColumn, column)
	})
}
export function getSortedColumn(state, column) {
	return state.sortedColumns[getSortedColumnIndex(state, column)]
}
export function getSortedColumnIndex(state, column) {
	return state.sortedColumns.findIndex(({ prop }) => prop === column.prop)
}

export function getNextSortOrder(column) {
	const length = column.sortOrders.length
	const index = (column.sortOrders.indexOf(column.sortOrder) + 1) % length
	return column.sortOrders[Math.max(index, 0)]
}

export function sortData(data, state) {
	const sortedColumnNotYetSet = !state.sortedColumns
	const isSortingThroughAPICall = state.remoteSort
	if (sortedColumnNotYetSet || isSortingThroughAPICall) {
		return data
	}
	return orderBy(data, state.sortedColumns)
}

export function orderBy(array, sortedColumns) {
	const columns = sortedColumns.map((column) => {
		let { prop, sortOrder, sortMethod, sortBy = prop } = column
		if (typeof sortOrder === 'string') {
			sortOrder = sortOrder === SORT_DSC ? -1 : 1
		} else {
			sortOrder = sortOrder && sortOrder < 0 ? -1 : 1
		}
		if (!Array.isArray(sortBy)) {
			sortBy = [sortBy]
		}
		return {
			sortBy,
			sortMethod,
			sortOrder,
		}
	})
	return array
		.map((value, index) => ({ value, index }))
		.sort((a, b) =>
			columns.reduce(
				(order, column) => order || compare(order, a, b, column),
				0,
			),
		)
		.map((item) => item.value)
}

function compare(order, a, b, { sortMethod, sortBy, sortOrder }) {
	if (sortMethod) {
		order = sortMethod(a.value, b.value)
	} else {
		order = compareArray(a, b, sortBy)
	}
	if (!order) {
		// make stable https://en.wikipedia.org/wiki/sortOrder_algorithm#Stability
		order = a.index - b.index
	}
	return order * sortOrder
}

function compareArray(a, b, sortArray) {
	for (const byProp of sortArray) {
		const aVal = getSortValue(a, byProp)
		const bVal = getSortValue(b, byProp)
		if (typeof aVal === 'string') {
			return aVal.localeCompare(bVal)
		} else {
			if (aVal < bVal) {
				return -1
			}
			if (aVal > bVal) {
				return 1
			}
		}
	}
	return 0
}

function getSortValue({ value, index }, by) {
	return typeof by === 'string' ? property(by)(value) : by(value, index)
}
