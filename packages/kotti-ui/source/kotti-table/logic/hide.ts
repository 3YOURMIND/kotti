/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { setColumnsArray } from './column'
import type { Store } from './types'

function getHiddenColumnIndex(state: any, column: any) {
	return state.hiddenColumns.findIndex(({ prop }: any) => prop === column.prop)
}

export function getResolvedHiddenColumns(columns: any) {
	return columns.filter(({ _deleted, hidden }: any) => !_deleted && !hidden)
}

function removeHiddenColumn(state: any, column: any) {
	const columnIndex = getHiddenColumnIndex(state, column)
	if (columnIndex !== -1) {
		state.hiddenColumns.splice(columnIndex, 1)
	}
}

export function setHiddenColumn(state: any, column: any) {
	const columnIndex = getHiddenColumnIndex(state, column)
	if (columnIndex !== -1) {
		state.hiddenColumns[columnIndex] = column
	} else {
		state.hiddenColumns.push(column)
	}
}

export const defaultState: Store.StateComponents.Hide = {
	hiddenColumns: [],
}

export const mutations = {
	hide(store: any, column: any, hide: any = !column.hidden) {
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
	showAll(store: any) {
		store.state._columnsArray.forEach((column: any) => (column.hidden = false))
		store.state.hiddenColumns = []

		store.commit('updateColumns')
		store.emit('hiddenChange', store.state.hiddenColumns)
	},
	setHiddenColumns(store: any, columns = store.state.hiddenColumns) {
		setColumnsArray(store.state, 'hiddenColumns', ['prop', 'hidden'], columns)
		store.commit('updateColumns', { emitChange: false })
	},
}

export const getters = {}
