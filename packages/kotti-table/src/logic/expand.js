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
		return state.expanded.includes(row)
	},
}

function toggleRowExpansion(state, row) {
	const expanded = state.expanded
	const index = expanded.indexOf(row)
	const shouldExpand = index === -1
	if (state.expandMultiple) {
		if (shouldExpand) {
			expanded.push(row)
		} else {
			expanded.splice(index, 1)
		}
	} else {
		if (shouldExpand) {
			state.expanded = [row]
		} else {
			state.expanded = []
		}
	}
	return shouldExpand
}
