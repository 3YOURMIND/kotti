/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { setColumnsArray } from './column'

function getFilteredColumnIndex(state: any, column: any) {
	return state.filteredColumns.findIndex(
		({ prop }: any) => prop === column.prop,
	)
}

export const defaultState = {
	filteredColumns: [],
}

export const mutations = {
	setFilteredColumns(store: any, columns: any = store.state.filteredColumns) {
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
