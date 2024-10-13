/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import debounce from 'lodash/debounce.js'
import isEqual from 'lodash/isEqual.js'

import type { Store } from './types'

function toggleRowSelection(state: any, row: any, selected: any) {
	let changed = false
	const selection = state.selection
	const index = selection.findIndex((selectedRow: any) =>
		isEqual(selectedRow, row),
	)
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
	} else if (!selected && index !== -1) {
		selection.splice(index, 1)
		changed = true
	}

	return changed
}

export function updateAllSelected(state: any) {
	const { rows, selection } = state
	if (!rows || rows.length === 0 || !selection || selection.length === 0) {
		state.isAllSelected = false
		return
	}

	state.isAllSelected = selection.length === rows.length
}

export function cleanSelection(store: any) {
	const { rowKey, state } = store
	const initialSelectionLength = state.selection.length
	if (rowKey) {
		const rowsSet = new Set(state.rows.map((r: any) => r[rowKey]))
		state.selection = state.selection.filter((s: any) => rowsSet.has(s[rowKey]))
	} else {
		state.selection = state.selection.filter((s: any) =>
			state.rows.some((r: any) => isEqual(r, s)),
		)
	}

	if (initialSelectionLength !== state.selection.length) {
		store.emit('selectionChange', [...state.selection])
	}
}

export function clearSelection(store: any) {
	const state = store.state
	state.isAllSelected = false
	if (state.selection.length > 0) {
		state.selection = []
		store.emit('selectionChange', [])
	}
}

export const defaultState: Store.StateComponents.Select = {
	isAllSelected: false,
	reserveSelection: false,
	selection: [],
}

export const mutations: Store.MutationComponents.Select = {
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
	setSelected({ state }, selection) {
		state.selection = selection
		updateAllSelected(state)
	},
	toggleAllSelection: debounce((store) => {
		const { state } = store
		// refresh disabled rows status in case of external influence
		store.commit('updateDisabledRows')
		const { enabledRows, isAllRowsDisabled, rows = [] } = state
		if (rows.length === 0 || isAllRowsDisabled) {
			// FIXME: Maybe we should not commit anything here and only return
			store.commit('setSelected', [])
			return
		}

		// eslint-disable-next-line unicorn/consistent-destructuring
		const shouldSelectAll = !state.isAllSelected

		store.commit('setSelected', shouldSelectAll ? [...enabledRows] : [])

		const selection = [...state.selection]
		store.emit('selectionChange', selection)
		store.emit('selectAll', selection)
	}),
}

export const getters: Store.GetterComponents.Select = {
	getRowByVisibleIndex(state, index) {
		return state.rows[index]
	},
	getRowKey(state, row) {
		return typeof state.rowKey === 'function'
			? state.rowKey(row)
			: // @ts-expect-error rowKey may be undefined; in that case this getter returns `undefined`
				row[state.rowKey]
	},
	isSelected(state, row) {
		return state.selection.some((e: any) => isEqual(e, row))
	},
}
/* eslint-enable @typescript-eslint/no-explicit-any */
/* eslint-enable @typescript-eslint/explicit-module-boundary-types */
