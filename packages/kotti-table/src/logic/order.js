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
	for (let col of orderedColumns) {
		_columns[col.prop] = col.order || _columns[col.prop]
	}
	return Object.values(_columns)
		.filter(({ _deleted }) => !_deleted)
		.map((col, index) => {
			return {
				orderAdvantage: 'order' in col ? 1 : -1,
				order: col.order || col.index,
				index: col.index || index,
				col,
			}
		})
		.sort((a, b) =>
			a.order < b.order
				? -1
				: a.order > b.order
				? 1
				: a.orderAdvantage + a.index - (b.orderAdvantage + b.index),
		)
		.map(({ col }, order) => {
			col.order = order
			col.index = order
			return col
		})
}

export function getOrderedColumns(state) {
	state._columnsArray.map(col => pick(col, ['prop', 'order']))
}
