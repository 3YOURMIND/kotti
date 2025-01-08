/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */

import pick from 'lodash/pick.js'
import property from 'lodash/property.js'

import { IS_ASC, IS_DSC, PUBLIC_SORT_PROPS } from '../constants'
import { KottiTableLegacy } from '../types'

import { setColumnsArray } from './column'
import type { Store } from './types'

function getSortedColumnIndex(state: any, column: any) {
	return state.sortedColumns.findIndex(({ prop }: any) => prop === column.prop)
}

export function setSortedColumn(state: any, column: any) {
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

function getSortedColumn(state: any, column: any) {
	return state.sortedColumns[getSortedColumnIndex(state, column)]
}

function getNextSortOrder(column: any) {
	const length = column.sortOrders.length
	// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
	const index = (column.sortOrders.indexOf(column.sortOrder) + 1) % length
	return column.sortOrders[Math.max(index, 0)]
}

function getSortValue({ index, value }: any, by: any) {
	return typeof by === 'string' ? property(by)(value) : by(value, index)
}

function compareArray(a: any, b: any, sortArray: any) {
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

function compare(
	order: any,
	a: any,
	b: any,
	{ sortBy, sortMethod, sortOrder }: any,
) {
	// eslint-disable-next-line sonarjs/no-parameter-reassignment
	order = sortMethod ? sortMethod(a.value, b.value) : compareArray(a, b, sortBy)
	if (!order) {
		// make stable https://en.wikipedia.org/wiki/sortOrder_algorithm#Stability
		order = a.index - b.index
	}
	return order * sortOrder
}

function orderBy(array: any, sortedColumns: any) {
	const columns = sortedColumns.map((column: any) => {
		const { prop, sortMethod } = column

		let { sortBy = prop, sortOrder } = column

		if (typeof sortOrder === 'string') {
			sortOrder =
				sortOrder === KottiTableLegacy.Column.SortOrders.DESCENDING ? -1 : 1
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
		.map((value: any, index: number) => ({ index, value }))
		.sort((a: any, b: any) =>
			columns.reduce(
				(order: any, column: any) => order || compare(order, a, b, column),
				0,
			),
		)
		.map((item: any) => item.value)
}
export function sortData(data: any, state: any) {
	const sortedColumnNotYetSet = !state.sortedColumns
	const isSortingThroughAPICall = state.remoteSort
	if (sortedColumnNotYetSet || isSortingThroughAPICall) {
		return data
	}
	return orderBy(data, state.sortedColumns)
}

export const defaultState: Store.StateComponents.Sort = {
	remoteSort: false,
	sortable: false,
	sortedColumns: [],
	sortMultiple: false,
}

export const mutations: Store.MutationComponents.Sort = {
	changeSortConditions(store, options) {
		const { state } = store
		state.rows = sortData(state.filteredData || state._data || [], state)

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!options?.silent) {
			const sortedColumns = state.sortedColumns.map((column: any) => {
				return {
					...pick(column, PUBLIC_SORT_PROPS),
					sortBy: column.sortBy || column.prop,
				}
			})
			store.emit('sortChange', {
				column: options.column,
				prop: options.column.prop,
				sortBy: options.column.sortBy || options.column.prop,
				sortedColumns,
				sortOrder: options.column.sortOrder,
			})
		}
	},
	removeSortedColumn(store, column) {
		const { state } = store
		const index = getSortedColumnIndex(state, column)
		const isInsortOrder = index !== -1
		if (isInsortOrder) {
			state.sortedColumns.splice(index, 1)
		}
		column.sortOrder = KottiTableLegacy.Column.SortOrders.NONE
		store.commit('changeSortConditions', { column })
	},
	setSortedColumns(store, columns) {
		setColumnsArray(store.state, 'sortedColumns', PUBLIC_SORT_PROPS, columns)
		store.commit('updateColumns', { emitChange: false })
	},
	sort(store, options) {
		const { column, order } = options
		setSortedColumn(store.state, column)
		column.sortOrder = order || getNextSortOrder(column)
		if (column.sortOrder === KottiTableLegacy.Column.SortOrders.NONE) {
			store.commit('removeSortedColumn', column)
		} else {
			store.commit('changeSortConditions', { column })
		}
	},
}

export const getters: Store.GetterComponents.Sort = {
	canSort(state: any, column: any) {
		return column.sortable || (state.sortable && column.sortable !== false)
	},
	hasSortOrder(state: any, column: any) {
		column = getSortedColumn(state, column)
		return column && column.sortOrder !== false
	},
	isSorted(state: any, column: any) {
		column = getSortedColumn(state, column)
		return (
			column && column.sortOrder !== KottiTableLegacy.Column.SortOrders.NONE
		)
	},
	isSortedByAsc(state: any, column: any) {
		column = getSortedColumn(state, column)
		return column && IS_ASC.test(String(column.sortOrder))
	},
	isSortedByDsc(state: any, column: any) {
		column = getSortedColumn(state, column)
		return column && IS_DSC.test(String(column.sortOrder))
	},
}
/* eslint-enable no-param-reassign */
/* eslint-enable @typescript-eslint/no-explicit-any */
/* eslint-enable @typescript-eslint/explicit-module-boundary-types */
