import { sortData } from './sort'
import { updateAllSelected, cleanSelection, clearSelection } from './select'

export const defaultState = {
	_rows: [],
	filteredRows: null,
	rows: null,
}

export const mutations = {
	setRows(store, rows) {
		const { state } = store
		const { _rows } = state
		const dataInstanceChanged = _rows !== rows
		// eslint-disable-next-line no-underscore-dangle
		state._rows = rows

		state.filteredRows = rows
		state.rows = sortData(state.filteredRows || [], state)

		store.commit('updateDisabledRows')

		if (dataInstanceChanged) {
			clearSelection(store)
		} else {
			cleanSelection(store)
		}
		updateAllSelected(state)
	},
}

export const getters = {}
