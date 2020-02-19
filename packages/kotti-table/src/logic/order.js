import pick from 'lodash/pick'
import {
	setColumnsArray,
	getColumnsArray,
	getColumnIndex,
	getColumnRealIndex,
} from './column'

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
	setOrderedColumns(store, columns = store.state.orderedColumns) {
		setColumnsArray(store.state, 'orderedColumns', ['prop', 'order'], columns)
		store.commit('updateColumns', {
			emitChange: false,
			refreshColumnArray: true,
		})
	},
}

export const getters = {
	getOrderedColumns(state) {
		return getColumnsArray(state, 'orderedColumns')
	},
}

export function resolveColumnsOrder({ _columns = {}, orderedColumns = [] }) {
	for (const col of orderedColumns) {
		if (_columns[col.prop]) {
			_columns[col.prop].order = col.order
		}
	}
	return Object.values(_columns)
		.filter(({ _deleted }) => !_deleted)
		.map((col, index) => ({
			orderAdvantage: 'order' in col ? 1 : -1,
			order: col.order || col.index,
			index: col.index || index,
			col,
		}))
		.sort(byOrder)
		.map(({ col }, order) => {
			// re-allign column index with new order
			col.order = order
			col.index = order
			return col
		})
}

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
