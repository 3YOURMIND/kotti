import debounce from 'lodash/debounce'
import deepEql from 'deep-eql'

export const defaultState = {
	selection: [],
	isAllSelected: false,
	reserveSelection: false,
}

export const mutations = {
	selectRow(store, row, selected) {
		const { state } = store
		const changed = toggleRowSelection(state, row, selected)
		const { selection } = state
		if (changed) {
			store.emit('selectionChange', [...selection])
			store.emit('select', selection, row)
		}
		updateAllSelected(state)
	},
	toggleAllSelection: debounce(store => {
		const { state } = store
		// refresh disabled rows status in case of external influence
		store.commit('updateDisabledRows')
		const { rows = [], isAllRowsDisabled, enabledRows } = state
		if (rows.length === 0 || isAllRowsDisabled) {
			store.commit('setSelected', [])
			return
		}

		// const shouldSelectAll = !(state.isAllSelected || oldSelection.length)
		const shouldSelectAll = !state.isAllSelected //more intuitive

		store.commit('setSelected', shouldSelectAll ? [...enabledRows] : [])

		const selection = [...state.selection]
		store.emit('selectionChange', selection)
		store.emit('selectAll', selection)
	}),

	setSelectedIndices(store, indices) {
		store.commit(
			'setSelected',
			indices.map(index => store.get('getRowByVisibleIndex', index)),
		)
	},

	setSelected({ state }, selection) {
		state.selection = selection
		updateAllSelected(state)
	},
}

export const getters = {
	getRowByVisibleIndex(state, index) {
		return state.rows[index]
	},
	getIndexByRow(state, row) {
		return state.rows.findIndex(r => r === row)
	},
	getRowKey(state, row) {
		return typeof state.rowKey === 'function'
			? state.rowKey(row)
			: row[state.rowKey]
	},
	isSelected(state, row) {
		return state.selection.some(e => deepEql(e, row))
	},
}

export function toggleRowSelection(state, row, selected) {
	let changed = false
	const selection = state.selection
	const index = selection.findIndex(selectedRow => deepEql(selectedRow, row))
	if (typeof selected === 'undefined') {
		if (index === -1) {
			selection.push(row)
			changed = true
		} else {
			selection.splice(index, 1)
			changed = true
		}
	} else if (selected && index === -1) {
		selection.push(row)
		changed = true
	} else if (!selected && index > -1) {
		selection.splice(index, 1)
		changed = true
	}

	return changed
}

export function getKeysMap(list, key) {
	const map = {}
	for (const item of list) map[item[key]] = item
	return map
}

export function getRowIdentity(item, key = 'id') {
	return item[key]
}

export function updateAllSelected(state) {
	const { rows, selection } = state
	if (!rows || rows.length === 0 || !selection || selection.length === 0) {
		state.isAllSelected = false
		return
	}

	state.isAllSelected = selection.length === rows.length
}

export function cleanSelection(store) {
	const { rowKey, state } = store
	const initialSelectionLength = state.selection.length
	if (rowKey) {
		const rowsSet = new Set(state.rows.map(r => r[rowKey]))
		state.selection = state.selection.filter(s => rowsSet.has(s[rowKey]))
	} else {
		state.selection = state.selection.filter(s =>
			state.rows.some(r => deepEql(r, s)),
		)
	}

	if (initialSelectionLength !== state.selection.length) {
		store.emit('selectionChange', [...state.selection])
	}
}

export function clearSelection(store) {
	const state = store.state
	state.isAllSelected = false
	if (state.selection.length) {
		state.selection = []
		store.emit('selectionChange', [])
	}
}
