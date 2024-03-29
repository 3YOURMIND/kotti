import pick from 'lodash/pick'

import { setColumnsArray, getColumnIndex, getColumnRealIndex } from './column'

function byOrder(a, b) {
	return a.order < b.order
		? -1
		: a.order > b.order
			? 1
			: a.orderAdvantage + a.index - (b.orderAdvantage + b.index)
}

export function getOrderedColumns(state) {
	return state._columnsArray.map((col) => pick(col, ['prop', 'order']))
}

export function resolveColumnsOrder({ _columns = {}, _columnsArray = [] }) {
	for (const col of _columnsArray) {
		if (_columns[col.prop]) {
			// _columnsArray --> _columns (we assign _columnsArray to _columns then later do the opposite)
			_columns[col.prop].order = col.order
		}
	}

	// _columns --> _columnsArray
	return Object.values(_columns)
		.filter(({ _deleted }) => !_deleted)
		.map((col, index) => {
			return {
				orderAdvantage: 'order' in col ? 1 : -1,
				order: typeof col.order === 'number' ? col.order : col.index,
				index: typeof col.index === 'number' ? col.index : index,
				col,
			}
		})
		.sort(byOrder)
		.map(({ col }, order) => {
			// re-allign column index with new order
			col.order = order
			col.index = order
			return col
		})
}

export const defaultState = {
	orderedColumns: [],
}

export const mutations = {
	orderBefore(store, fromColumn, toColumn) {
		const { state } = store
		if (fromColumn.id === toColumn.id) return
		const fromIndex = getColumnIndex(state, fromColumn)
		state._columnsArray.splice(fromIndex, 1)

		const toIndex = getColumnRealIndex(state, toColumn)
		state._columnsArray.splice(toIndex, 0, fromColumn)

		state._columnsArray.forEach((col, index) => {
			col.order = index
			col.index = index
		})
		store.emit('orderChange', getOrderedColumns(state))
		store.commit('updateColumns')
	},
	setOrderedColumns(store, columns) {
		setColumnsArray(store.state, 'orderedColumns', ['prop', 'order'], columns)
		store.commit('updateColumns', {
			emitChange: false,
			refreshColumnArray: true,
		})
	},
}

export const getters = {}
