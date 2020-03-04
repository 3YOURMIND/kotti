import { setColumnsArray } from './column'

export const defaultState = {
	filteredColumns: [],
}

export const mutations = {
	setFilteredColumns(store, columns = store.state.filteredColumns) {
		setColumnsArray(store.state, 'filteredColumns', ['prop', 'hidden'], columns)
		store.commit('updateColumns', { emitChange: false })
	},
}

export const getters = {}

export function setFilteredColumn(state, column) {
	const columnIndex = getFilteredColumnIndex(state, column)
	if (columnIndex > -1) {
		state.filteredColumns[columnIndex] = column
	} else {
		state.filteredColumns.push(column)
	}
}

function getFilteredColumnIndex(state, column) {
	return state.filteredColumns.findIndex(({ prop }) => prop === column.prop)
}
