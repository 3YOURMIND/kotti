/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import pick from 'lodash/pick'

import { setColumnsArray, getColumnIndex, getColumnRealIndex } from './column'
import type { Store } from './types'

function byOrder(a: any, b: any) {
	return a.order < b.order
		? -1
		: a.order > b.order
			? 1
			: // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
				a.orderAdvantage + a.index - (b.orderAdvantage + b.index)
}

export function getOrderedColumns(state: any) {
	return state._columnsArray.map((col: any) => pick(col, ['prop', 'order']))
}

export function resolveColumnsOrder({
	_columns = {},
	_columnsArray = [],
}: any) {
	for (const col of _columnsArray) {
		if (_columns[col.prop]) {
			// _columnsArray --> _columns (we assign _columnsArray to _columns then later do the opposite)
			_columns[col.prop].order = col.order
		}
	}

	// _columns --> _columnsArray
	return Object.values(_columns)
		.filter(({ _deleted }: any) => !_deleted)
		.map((col: any, index) => {
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

export const defaultState: Store.StateComponents.Order = {
	orderedColumns: [],
}

export const mutations: Store.MutationComponents.Order = {
	orderBefore(store, fromColumn, toColumn) {
		const { state } = store
		if (fromColumn.id === toColumn.id) return
		const fromIndex = getColumnIndex(state, fromColumn)
		state._columnsArray.splice(fromIndex, 1)

		const toIndex = getColumnRealIndex(state, toColumn)
		state._columnsArray.splice(toIndex, 0, fromColumn)

		state._columnsArray.forEach((col: any, index: number) => {
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

export const getters: Store.GetterComponents.Order = {}
