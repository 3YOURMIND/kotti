import negate from 'lodash/negate'

export const defaultState = {
	enabledRows: [],
	isAllRowsDisabled: false,
}
export function getDisabledRows(rows, disableRow) {
	return rows.filter((row, rowIndex) => {
		return disableRow ? disableRow({ row, rowIndex }) : false
	})
}

export function getEnabledRows(rows, disableRow) {
	return getDisabledRows(rows, negate(disableRow))
}

export const mutations = {
	updateDisabledRows({ state, table }) {
		state.enabledRows = getEnabledRows(state.rows, table.disableRow)
		state.isAllRowsDisabled = state.enabledRows.length === 0
	},
}

export const getters = {
	isAllRowsDisabled(state) {
		return (
			state.rows.length === getDisabledRows(state.rows, this.table.disableRow)
		)
	},
}
