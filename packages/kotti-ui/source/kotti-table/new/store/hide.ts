import { KottiTable } from '../../types'

import { setColumnsArray } from './column'
import { KottiTableStoreMutations, KottiTableStoreState } from './types'
import { getColumnIndexByProp } from './utils'

function removeHiddenColumn(
	state: KottiTableStoreState,
	column: KottiTable.Column.Hidden,
) {
	const columnIndex = getColumnIndexByProp(state.hiddenColumns, column.prop)
	if (columnIndex !== -1) {
		state.hiddenColumns.splice(columnIndex, 1)
	}
}

export function setHiddenColumn(
	state: KottiTableStoreState,
	column: KottiTable.Column.Hidden,
) {
	const columnIndex = getColumnIndexByProp(state.hiddenColumns, column.prop)
	if (columnIndex !== -1) {
		state.hiddenColumns[columnIndex] = column
	} else {
		state.hiddenColumns.push(column)
	}
}

export const mutations: Pick<
	KottiTableStoreMutations,
	'hideColumn' | 'setHiddenColumns' | 'showAll'
> = {
	hideColumn(store, { column, isHidden = !column.hidden }) {
		const { state } = store
		column.hidden = isHidden

		if (column.hidden) {
			setHiddenColumn(state, column)
		} else {
			removeHiddenColumn(state, column)
		}
		store.commit('updateColumns')
		store.emit('hiddenChange', state.hiddenColumns)
	},
	setHiddenColumns(store, columns = store.state.hiddenColumns) {
		setColumnsArray(store.state, 'hiddenColumns', ['prop', 'hidden'], columns)
		store.state.hiddenColumns = columns.map(({ prop, hidden = false }) => ({
			prop,
			hidden,
		}))
		store.commit('updateColumns', { emitChange: false })
	},
	showAll(store) {
		store.state._columnsArray.forEach((column) => (column.hidden = false))
		store.state.hiddenColumns = []

		store.commit('updateColumns')
		store.emit('hiddenChange', store.state.hiddenColumns)
	},
}

export const getters = {}
