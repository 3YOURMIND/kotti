import deepEql from 'deep-eql'
import debounce from 'lodash/debounce'

import { KottiTable } from '../../types'

import {
	KottiTableStoreGetters,
	KottiTableStoreMutations,
	KottiTableStoreState,
} from './types'
import {
	getRowEqualityAssert,
	getRowKeyIdentifer,
	RowEqualAssert,
} from './utils'

const toggleRowSelection = (
	state: KottiTableStoreState,
	row: KottiTable.Row.Props,
	selected?: boolean,
): [KottiTable.Row.Props[], boolean] => {
	const index = state.selectedRows.findIndex((selectedRow) =>
		deepEql(selectedRow, row),
	)
	const isAlreadySelected = index !== -1
	const shouldBeSelected = selected ?? !isAlreadySelected

	const selectionWillChange =
		(shouldBeSelected && !isAlreadySelected) ||
		(!shouldBeSelected && isAlreadySelected)

	if (selectionWillChange) {
		shouldBeSelected
			? state.selectedRows.push(row)
			: state.selectedRows.splice(index, 1)
	}

	return [state.selectedRows, selectionWillChange]
}

export const mutations: Pick<
	KottiTableStoreMutations,
	| 'cleanSelection'
	| 'clearSelection'
	| 'selectRow'
	| 'setSelected'
	| 'toggleAllSelection'
> = {
	cleanSelection: (store) => {
		const { state } = store
		const getRowKey = store.get('getRowKey')
		const initialSelectionLength = state.selectedRows.length
		if (state.rowKey) {
			const rowsSet = new Set(state.rows.map((r) => getRowKey(r)))
			state.selectedRows = state.selectedRows.filter((s) =>
				rowsSet.has(getRowKey(s)),
			)
		} else {
			state.selectedRows = state.selectedRows.filter((s) =>
				state.rows.some((r) => deepEql(r, s)),
			)
		}

		if (initialSelectionLength !== state.selectedRows.length) {
			store.emit('selectionChange', [...state.selectedRows])
		}
	},
	clearSelection: (store) => {
		const state = store.state
		if (state.selectedRows.length) {
			state.selectedRows = []
			store.emit('selectionChange', [])
		}
	},
	selectRow: (store, { row, selected }) => {
		const { state } = store
		const [selectedRows, changed] = toggleRowSelection(state, row, selected)
		if (changed) {
			store.emit('selectionChange', [...selectedRows])
			store.emit('select', selectedRows, row)
		}
	},
	setSelected: (store, selectedRows) => {
		store.state.selectedRows = selectedRows
	},
	toggleAllSelection: debounce((store) => {
		const { state } = store
		// refresh disabled rows status in case of external influence
		store.commit('updateDisabledRows')
		const { rows = [], isAllRowsDisabled } = state
		if (rows.length === 0 || isAllRowsDisabled) {
			state.selectedRows = []
			return
		}

		const shouldSelectAll = store.get('isAllSelected')
		const enabledRows = store.get('enabledRows')

		state.selectedRows = shouldSelectAll ? [...enabledRows] : []

		const selection = [...state.selectedRows]
		store.emit('selectionChange', selection)
		store.emit('selectAll', selection)
	}),
}

const getRowKey = ({ rowKey }: KottiTableStoreState) =>
	getRowKeyIdentifer(rowKey)
const getRowKeyAssertEqual = (state: KottiTableStoreState): RowEqualAssert =>
	getRowEqualityAssert(getRowKey(state))

export const getters: Pick<
	KottiTableStoreGetters,
	| 'getRowByVisibleIndex'
	| 'getIndexByRow'
	| 'getRowKey'
	| 'isAllSelected'
	| 'isSelected'
> = {
	getRowByVisibleIndex: (state) => (index) => state.rows[index],
	getIndexByRow: (state) => (row) => state.rows.findIndex((r) => r === row),
	getRowKey,
	isAllSelected: ({ selectedRows, rows }) =>
		selectedRows.length > 0 && rows.length === selectedRows.length,
	isSelected: (state) => {
		const rowKeyIsEqual = getRowKeyAssertEqual(state)
		return (row) => state.selectedRows.some(rowKeyIsEqual(row))
	},
}
