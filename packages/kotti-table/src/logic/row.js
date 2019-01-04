import { sortData } from './sort'
import { updateAllSelected, cleanSelection, clearSelection } from './select'

export const defaultState = {
	_data: [],
	filteredData: null,
	rows: null,
}

export const mutations = {
	setRows(store, data) {
		const { state } = store
		const { _data } = state
		const dataInstanceChanged = _data !== data
		// eslint-disable-next-line no-underscore-dangle
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

export const getters = {}
