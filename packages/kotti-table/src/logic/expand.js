export const defaultState = {
	expandMultiple: false,
	expanded: [],
}

export const mutations = {
	expandRow(store, row) {
		const { state } = store
		const isExpanded = toggleRowExpansion(state, row)
		store.emit('expandChange', [...state.expanded])
		store.emit('expand', row, isExpanded)
	},
}

export const getters = {
	isExpanded(state, row) {
		return state.expanded
			.map(e => JSON.stringify(e))
			.includes(JSON.stringify(row))
	},
}

function toggleRowExpansion(state, row) {
	const expanded = state.expanded
	debugger
	const index = expanded
		.map(e => JSON.stringify(e))
		.indexOf(JSON.stringify(row))
	const shouldExpand = index === -1 //if the row is not already included in state.expanded
	if (state.expandMultiple) {
		if (shouldExpand) {
			expanded.push(row)
		} else {
			expanded.splice(index, 1)
		}
	} else {
		state.expanded = shouldExpand ? [row] : []
	}
	return shouldExpand
}
