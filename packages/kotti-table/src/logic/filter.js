import { setColumnsArray, getColumnsArray } from './column'

export const defaultState = {
	filteredColumns: [],
}

export const mutations = {
	setFilteredColumns(store, columns = store.state.filteredColumns) {
		setColumnsArray(store.state, 'filteredColumns', ['prop', 'hidden'], columns)
		store.commit('updateColumns', { emitChange: false })
	},
}

export const getters = {
	getfilteredColumns(state) {
		return getColumnsArray(state, 'filteredColumns')
	},
}

export function setFilterColumn(state, column) {
	const columnIndex = getfilterdColumnIndex(state, column)
	if (columnIndex > 0) {
		state.filteredColumns[columnIndex] = column
	} else {
		state.filteredColumns.push(column)
	}
}

export function removefilterdColumn(state, column) {
	const columnIndex = getfilterdColumnIndex(state, column)
	if (columnIndex > 0) {
		state.filteredColumns.splice(columnIndex, 1)
	}
}
export function getfilterdColumn(state, column) {
	return state.filteredColumns[getfilterdColumnIndex(state, column)]
}
export function getfilterdColumnIndex(state, column) {
	return state.filteredColumns.findIndex(({ prop }) => prop === column.prop)
}
