import deepEql from 'deep-eql'

import { KottiTable } from '../../types'

import {
	KottiTableStore,
	KottiTableStoreGetters,
	KottiTableStoreMutations,
} from './types'

function toggleRowExpansion(
	store: KottiTableStore,
	row: KottiTable.Row.Props,
): KottiTable.Row.Props[] {
	const { expandedRows } = store.state
	const index = expandedRows.findIndex((elem) => deepEql(elem, row))
	const shouldExpand = index === -1 //if the row is not already included in state.expanded

	if (store.tableProps.expandMultiple) {
		shouldExpand ? expandedRows.push(row) : expandedRows.splice(index, 1)
		return expandedRows
	} else {
		return shouldExpand ? [row] : []
	}
}

export const mutations: Pick<KottiTableStoreMutations, 'expandRow'> = {
	expandRow(store, row) {
		const expandedRows = toggleRowExpansion(store, row)
		store.state.expandedRows = expandedRows
		store.emit('expandChange', [...expandedRows])
	},
}

export const getters: Pick<KottiTableStoreGetters, 'isExpanded'> = {
	isExpanded: (state) => (row) =>
		state.expandedRows.some((e) => deepEql(e, row)),
}
