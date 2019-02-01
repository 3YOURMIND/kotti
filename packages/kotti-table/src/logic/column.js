import property from 'lodash/property'
import negate from 'lodash/negate'
import pick from 'lodash/pick'
import { SORT_NONE } from '../constants'
import { setSortedColumn } from './sort'
import { setHiddenColumn } from './hide'
import { setFilterColumn } from './filter'

export const defaultState = {
	freshColumns: true,
	_columns: [],
	columns: [],
}

export const mutations = {
	insertColumn(store, column, index) {
		setColumn(store.state, column, index)
		store.commit('updateColumns')
	},
	swapColumns(store, fromColumn, toColumn) {
		const { state } = store
		const fromRealIndex = getColumnIndex(state, fromColumn)
		const toRealIndex = getColumnIndex(state, toColumn)
		state._columns[fromRealIndex] = toColumn
		state._columns[toRealIndex] = fromColumn
		store.emit(
			'columnOrderChange',
			state._columns.map((column, order) => {
				column.order = order
				return column
			}),
		)
		store.commit('updateColumns')
	},
	removeColumn(store, column) {
		const { _columns = [] } = store.state
		_columns.splice(_columns.indexOf(column), 1)
		store.commit('updateColumns')
	},
	updateColumns({ table, state }) {
		if (table.$ready) {
			const { _columns = [] } = state
			if (state.freshColumns) {
				state._columns = resolveColumnsOrder(_columns)
				state.freshColumns = false
			}
			state.columns = state._columns.filter(negate(property('hidden')))
		}
	},
}

export const getters = {}

export function getColumnIndex(state, column) {
	return state._columns.findIndex(({ prop }) => prop === column.prop)
}

export function getColumn(state, column) {
	return getColumnIndex(state, column)
}

export function setColumn(state, column, index) {
	const { _columns = [] } = state
	let oldColumnIndex = -1

	if (column.prop) {
		oldColumnIndex = _columns.findIndex(({ prop }) => prop === column.prop)
	}

	// resolve where to place the column
	if (oldColumnIndex !== -1) {
		// if colum prop exists merge
		let oldColumn = _columns[oldColumnIndex]
		_columns.splice(column.index, 1, { ...oldColumn, ...column })
	} else if (index !== undefined) {
		// else place at this exact index
		_columns.splice(index, 0, column)
	} else if (column.order !== undefined) {
		// else place at order location
		if (_columns.length > column.order) {
			_columns.splice(column.order, 0, column)
		} else {
			_columns[column.order] = column
		}
	} else if (column.index !== undefined) {
		// else infered index from children position in dom or prop
		_columns.splice(column.index, 0, column)
	} else {
		_columns.push(column)
	}
	delete column.index

	if (column.sortOrder !== SORT_NONE) {
		setSortedColumn(state, column)
	}
	if (column.hidden !== undefined) {
		setHiddenColumn(state, column)
	}
	if (column.filter !== undefined) {
		setFilterColumn(state, column)
	}
	return column
}

export function setColumnsArray(state, prop, shapeKeys, columns) {
	state[prop] = columns.map(column => {
		column = pick(column, shapeKeys)
		let oldColumn = getColumn(state, column) || {}
		return Object.assign(oldColumn, column)
	})
}

export function getColumnsArray(state, prop) {
	return [...state[prop]]
}

function resolveColumnsOrder(columns) {
	return columns
		.filter(Boolean) // clear possible blanks after order based column insert then order
		.map((col, index) => {
			return {
				orderAdvantage: 'order' in col ? 1 : -1,
				order: col.order || index,
				index,
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
			return col
		})
}
