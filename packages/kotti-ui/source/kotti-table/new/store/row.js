import { cleanSelection, clearSelection } from './select'
import { sortData } from './sort'

export const defaultState = {
	_data: [],
	filteredData: null,
	focusedRow: null,
	rows: null,
}

export const mutations = {
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
	},
	focuseRow({ state }, row) {
		state.focusedRow = row
	},
	blurRow({ state }) {
		state.focusedRow = null
	},
}

export const getters = {
	isFocusedRow(state, row) {
		return state.focusedRow === row
	},
}
