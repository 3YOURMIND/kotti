import Vue from 'vue'
import pick from 'lodash/pick'
import { SORT_NONE, PUBLIC_COLUMN_PROPS } from '../constants'
import { setSortedColumn } from './sort'
import { setHiddenColumn, getResolvedHiddenColumns } from './hide'
import { setFilterColumn } from './filter'
import { resolveColumnsOrder, getOrderedColumns } from './order'

export const defaultState = {
	_destroyedColumns: {},
	refreshColumnArray: true,
	_columns: {},
	_columnsArray: [],
	columns: [],
}

export const mutations = {
	insertColumn(store, { column, index }) {
		const deleted = store.state._destroyedColumns[column.prop]
		setColumn(store.state, { column, index, deleted })
		deleted && (store.state._destroyedColumns[column.prop] = 0)
		store.commit('updateColumns', { emitChange: false })
	},
	removeColumn(store, column) {
		column = getColumn(store.state, column)
		if (column) {
			column._deleted = true
			store.state._destroyedColumns[column.prop] = 1
			store.commit('updateColumns', { emitChange: false })
		}
	},
	setColumns(store, columns = store.state._columnsArray) {
		const { state } = store
		for (let col of columns) {
			col = pick(col, PUBLIC_COLUMN_PROPS)
			const column = getColumn(state, col)
			if (column) {
				Object.assign(column, col)
			}
		}
		store.commit('updateColumns', {
			emitChange: false,
			refreshColumnArray: true,
		})
	},
	updateColumns(
		store,
		{
			emitChange = true,
			refreshColumnArray = store.state.refreshColumnArray,
		} = {},
	) {
		const { table, state } = store
		if (table.$ready) {
			if (refreshColumnArray || didRestorDestroyedColumns(state)) {
				state._columnsArray = resolveColumnsOrder(state)
				state.orderedColumns = getOrderedColumns(state)
				state._destroyedColumns = {}
				state.refreshColumnArray = false
			}
			state.columns = getResolvedHiddenColumns(state._columnsArray)
			emitChange && emitColumnsChange(store)
		}
	},
}

export const getters = {
	getColumns(state) {
		return getColumnsArray(state, '_columns')
	},
}

export function getColumnRealIndex(state, column) {
	return state._columnsArray.findIndex(({ id }) => id == column.id)
}

export function getColumnIndex(state, column) {
	return getColumn(state, column).index
}

export function getColumn(state, column = {}) {
	return state._columns[column.prop]
}

export function setColumn(state, { column, index, deleted }) {
	const { _columns = {} } = state

	let oldColumn = _columns[column.prop]
	if (oldColumn) {
		if (deleted) {
			_columns[column.prop]._deleted = false
		} else {
			Vue.set(_columns, column.prop, { ...oldColumn, ...column })
		}
	} else {
		column.index = index || Object.keys(_columns).length
		Vue.set(_columns, column.prop, column)
	}

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

export function setColumnsArray(
	state,
	prop,
	shapeKeys,
	columns,
	mergeStrategy = Object.assign,
) {
	state[prop] = columns.map(column => {
		column = pick(column, shapeKeys)
		let oldColumn = getColumn(state, column) || {}
		return mergeStrategy(oldColumn, column)
	})
}

export function getColumnsArray(state, prop) {
	return [...state[prop]]
}

export function emitColumnsChange(store) {
	store.table.$ready &&
		store.emit(
			'columnsChange',
			store.state._columnsArray.map(col => pick(col, PUBLIC_COLUMN_PROPS)),
		)
}

export function columnStatMatch(cols1, cols2, props = PUBLIC_COLUMN_PROPS) {
	cols1 = cols1.map(col => pick(col, props))
	cols2 = cols2.map(col => pick(col, props))
	return JSON.stringify(cols1) === JSON.stringify(cols2)
}

function didRestorDestroyedColumns({ _destroyedColumns }) {
	const columns = Object.values(_destroyedColumns)
	return columns.length && columns.reduce((sum, n) => sum + n) === 0
}
