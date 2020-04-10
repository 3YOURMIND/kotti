import { setColumnsArray } from './column'

export const defaultState = {
	hiddenColumns: [],
}

export const mutations = {
	hide(store, column, hide = !column.hidden) {
		const { state } = store
		column.hidden = hide

		if (column.hidden) {
			setHiddenColumn(state, column)
		} else {
			removeHiddenColumn(state, column)
		}
		store.commit('updateColumns')
		store.emit('hiddenChange', state.hiddenColumns)
	},
	showAll(store) {
		store.state._columnsArray.forEach((column) => (column.hidden = false))
		store.state.hiddenColumns = []

		store.commit('updateColumns')
		store.emit('hiddenChange', store.state.hiddenColumns)
	},
	setHiddenColumns(store, columns = store.state.hiddenColumns) {
		setColumnsArray(store.state, 'hiddenColumns', ['prop', 'hidden'], columns)
		store.commit('updateColumns', { emitChange: false })
	},
}

export const getters = {}

export function setHiddenColumn(state, column) {
	const columnIndex = getHiddenColumnIndex(state, column)
	if (columnIndex !== -1) {
		state.hiddenColumns[columnIndex] = column
	} else {
		state.hiddenColumns.push(column)
	}
}

function removeHiddenColumn(state, column) {
	const columnIndex = getHiddenColumnIndex(state, column)
	if (columnIndex !== -1) {
		state.hiddenColumns.splice(columnIndex, 1)
	}
}

export function getHiddenColumnIndex(state, column) {
	return state.hiddenColumns.findIndex(({ prop }) => prop === column.prop)
}

export function getResolvedHiddenColumns(columns) {
	return columns.filter(({ _deleted, hidden }) => !_deleted && !hidden)
}
