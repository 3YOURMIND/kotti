/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import isEqual from 'lodash/isEqual'

export const defaultState = {
	expandMultiple: false,
	expanded: [],
}

function toggleRowExpansion(state: any, row: any) {
	const expanded = state.expanded
	const index = expanded.findIndex((elem: any) => isEqual(elem, row))
	const shouldExpand = index === -1 //if the row is not already included in state.expanded

	if (state.expandMultiple) {
		shouldExpand ? expanded.push(row) : expanded.splice(index, 1)
	} else {
		//explicitly need state.expanded b/c Object reference will to be changed w/ assignments
		state.expanded = shouldExpand ? [row] : []
	}
	return shouldExpand
}

export const mutations = {
	expandRow(store: any, row: any) {
		const { state } = store
		const isExpanded = toggleRowExpansion(state, row)
		store.emit('expandChange', [...state.expanded])
		store.emit('expand', row, isExpanded)
	},
}

export const getters = {
	isExpanded(state: any, row: any) {
		return state.expanded.some((e: any) => isEqual(e, row))
	},
}
