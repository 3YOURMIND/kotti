import negate from 'lodash/negate'

import { KottiTable } from '../../types'

import { KottiTableStoreGetters, KottiTableStoreMutations } from './types'

const getDisabledRows = (
	rows: KottiTable.Row.Props[],
	disableRow: (
		row: Pick<KottiTable.Column.Context, 'row' | 'rowIndex'>,
	) => boolean,
) => rows.filter((row, rowIndex) => disableRow({ row, rowIndex }))

export const mutations: Pick<KottiTableStoreMutations, 'updateDisabledRows'> = {
	updateDisabledRows({ state, tableProps }) {
		state.enabledRows = getDisabledRows(
			state.rows,
			negate(tableProps.disableRow),
		)
		state.isAllRowsDisabled = state.enabledRows.length === 0
	},
}

export const getters: Pick<KottiTableStoreGetters, 'areAllRowsDisabled'> = {
	areAllRowsDisabled(state, tableProps) {
		return (
			state.rows.length ===
			getDisabledRows(state.rows, tableProps.disableRow).length
		)
	},
}
