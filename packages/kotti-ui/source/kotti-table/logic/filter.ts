/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { setColumnsArray } from './column'
import type { Store } from './types'

function getFilteredColumnIndex(state: any, column: any) {
	return state.filteredColumns.findIndex(
		({ prop }: any) => prop === column.prop,
	)
}

export const defaultState: Store.StateComponents.Filter = {
	filteredColumns: [],
}

export const mutations: Store.MutationComponents.Filter = {
	setFilteredColumns(store, columns = store.state.filteredColumns) {
		setColumnsArray(store.state, 'filteredColumns', ['prop', 'hidden'], columns)
		store.commit('updateColumns', { emitChange: false })
	},
}

export const getters = {}

export function setFilteredColumn(state: any, column: any) {
	const columnIndex = getFilteredColumnIndex(state, column)
	if (columnIndex !== -1) {
		state.filteredColumns[columnIndex] = column
	} else {
		state.filteredColumns.push(column)
	}
}
