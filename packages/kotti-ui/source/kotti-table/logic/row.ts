/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { updateAllSelected, cleanSelection, clearSelection } from './select'
import { sortData } from './sort'
import type { Store } from './types'

export const defaultState: Store.StateComponents.Row = {
	_data: [],
	filteredData: null,
	focusedRow: null,
	rows: null,
}

export const mutations: Store.MutationComponents.Row = {
	blurRow({ state }) {
		state.focusedRow = null
	},
	focusRow({ state }, row) {
		state.focusedRow = row
	},
	setRows(store, data) {
		const { state } = store
		const { _data } = state
		const dataInstanceChanged = _data !== data
		state._data = data

		state.filteredData = data
		state.rows = sortData(data || [], state)

		if (dataInstanceChanged) {
			clearSelection(store)
		} else {
			cleanSelection(store)
		}
		updateAllSelected(state)
	},
}

export const getters = {
	isFocusedRow(state: any, row: any) {
		return state.focusedRow === row
	},
}
