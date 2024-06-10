/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import negate from 'lodash/negate'
import type { Store } from './types'

export const defaultState: Store.StateComponents.Disable = {
	enabledRows: [],
	isAllRowsDisabled: false,
}

function getDisabledRows(rows: any, disableRow: any) {
	return rows.filter((row: any, rowIndex: number) => {
		return disableRow ? disableRow({ row, rowIndex }) : false
	})
}

function getEnabledRows(rows: any, disableRow: any) {
	return getDisabledRows(rows, negate(disableRow))
}

export const mutations = {
	updateDisabledRows({ state, table }: any): void {
		state.enabledRows = getEnabledRows(state.rows, table.disableRow)
		state.isAllRowsDisabled = state.enabledRows.length === 0
	},
}

export const getters = {
	isAllRowsDisabled(state: any): boolean {
		return (
			state.rows.length ===
			getDisabledRows(state.rows, (this as any).table.disableRow).length
		)
	},
}
