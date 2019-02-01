import negate from 'lodash/negate'

export const defaultState = {
	enabledRows: [],
	isAllRowsDisabled: false,
}

export const mutations = {
	updateDisabledRows({ state, table }) {
		state.enabledRows = getEnabledRows(state.rows, table.disableRow)
		state.isAllRowsDisabled = !Boolean(state.enabledRows.length)
	},
}

export const getters = {
	isAllRowsDisabled(state) {
		return state.rows.length === getDisabledRows(rows, this.table.disableRow)
	},
}

export function getDisabledRows(rows, disableRow) {
	return rows.filter((row, rowIndex) =>
		disableRow ? disableRow({ row, rowIndex }) : false,
	)
}

export function getEnabledRows(rows, disableRow) {
	return getDisabledRows(rows, negate(disableRow))
}
