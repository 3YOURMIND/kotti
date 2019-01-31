import debounce from 'lodash/debounce'
import { getEnabledRows } from './disable'

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
		if (rows.length === 0 || isAllRowsDisabled) return

		const oldSelection = state.selection
		const shouldSelectAll = !(state.isAllSelected || oldSelection.length)

		state.selection = shouldSelectAll ? [...enabledRows] : []

		const selection = [...state.selection]
		state.isAllSelected = shouldSelectAll

		store.emit('selectionChange', selection)
		store.emit('selectAll', selection)
	}),
	setSelectedIndexes(store, indexes) {
		store.commit(
			'setSelected',
			indexes.map(index => store.get('getRowByVisibleIndex', index)),
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
		return state.selection.includes(row)
	},
}

export function toggleRowSelection(state, row, selected) {
	let changed = false
	const selection = state.selection
	const index = selection.indexOf(row)
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

export function getSelectCheckForState(state) {
	const { selection, rowKey } = state

	let selectedMap
	if (rowKey) {
		selectedMap = getKeysMap(state.selection, rowKey)
	}

	if (selectedMap) {
		return row => Boolean(selectedMap[getRowIdentity(row, rowKey)])
	}
	return row => selection.indexOf(row) !== -1
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
	if (!rows || rows.length === 0) {
		state.isAllSelected = false
		return
	}

	// const isSelected = getSelectCheckForState(state)

	state.isAllSelected = selection.length === rows.length
}

export function cleanSelection(store) {
	const { rowKey } = store
	const { selection = [], rows } = store.state
	let deleted
	if (rowKey) {
		deleted = []
		const selectedMap = getKeysMap(selection, rowKey)
		const dataMap = getKeysMap(rows, rowKey)
		Object.keys(selectedMap).forEach(key => {
			if (!dataMap[key]) {
				deleted.push(selectedMap[key])
			}
		})
	} else {
		deleted = selection.filter(item => rows.indexOf(item) === -1)
	}

	deleted.forEach(deletedItem => {
		selection.splice(selection.indexOf(deletedItem), 1)
	})

	if (deleted.length) {
		store.emit('selectionChange', [...selection])
	}
}

export function clearSelection(store) {
	const state = store.state
	state.isAllSelected = false
	const oldSelection = state.selection
	if (state.selection.length) {
		state.selection = []
	}
	if (oldSelection.length > 0) {
		store.emit('selectionChange', [...state.selection])
	}
}
