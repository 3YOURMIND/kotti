import pick from 'lodash/pick'
import Vue from 'vue'

import { PUBLIC_COLUMN_PROPS } from '../constants'
import { KottiTable } from '../types'

import { setFilteredColumn } from './filter'
import { setHiddenColumn, getResolvedHiddenColumns } from './hide'
import { resolveColumnsOrder, getOrderedColumns } from './order'
import { setSortedColumn } from './sort'

export function getColumnRealIndex(state, column) {
	return state._columnsArray.findIndex(({ id }) => id == column.id)
}

export function getColumn(state, column = {}) {
	return state._columns[column.prop]
}

export function getColumnIndex(state, column) {
	return getColumn(state, column).index
}

export function setColumn(state, { column, index, deleted }) {
	const { _columns = {} } = state
	let newColumn = column
	const oldColumn = _columns[newColumn.prop]
	if (oldColumn) {
		if (deleted) {
			_columns[newColumn.prop]._deleted = false
		} else {
			const isNewColumnPropDefined = newColumn.isPropDefined
			const isOldColumnSlotDefined = oldColumn.isPropDefined === false
			if (isNewColumnPropDefined && isOldColumnSlotDefined) {
				newColumn = pick(newColumn, PUBLIC_COLUMN_PROPS)
			}

			const filteredColumn = Object.fromEntries(
				Object.entries(newColumn).filter((kv) => kv[1] !== undefined),
			)
			newColumn = { ...oldColumn, ...filteredColumn }
			Vue.set(_columns, newColumn.prop, newColumn)
		}
	} else {
		newColumn.index = index || Object.keys(_columns).length
		Vue.set(_columns, newColumn.prop, newColumn)
	}

	if (newColumn.sortOrder !== KottiTable.Column.SortOrders.NONE) {
		setSortedColumn(state, newColumn)
	}
	if (newColumn.hidden === true) {
		setHiddenColumn(state, newColumn)
	}
	if (newColumn.filter !== undefined) {
		setFilteredColumn(state, newColumn)
	}

	return newColumn
}

export function setColumnsArray(
	state,
	prop,
	shapeKeys,
	columns,
	mergeStrategy = Object.assign,
) {
	state[prop] = columns.map((column) => {
		// eslint-disable-next-line no-param-reassign
		column = pick(column, shapeKeys)
		const oldColumn = getColumn(state, column) || {}
		return mergeStrategy(oldColumn, column)
	})
}

export function getColumnsArray(state, prop) {
	//please be sure to pass state[prop] that has an array type
	return [...state[prop]]
}

export function emitColumnsChange(store) {
	store.table.$ready &&
		store.emit(
			'columnsChange',
			store.state._columnsArray.map((col) => pick(col, PUBLIC_COLUMN_PROPS)),
		)
}

function didRestorDestroyedColumns({ _destroyedColumns }) {
	const columns = Object.values(_destroyedColumns)
	return columns.length && columns.reduce((sum, n) => sum + n) === 0
}

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
		// eslint-disable-next-line no-param-reassign
		column = getColumn(store.state, column)
		if (column) {
			column._deleted = true
			store.state._destroyedColumns[column.prop] = 1
			store.commit('updateColumns', { emitChange: false })
		}
	},
	setColumns(store, columns = store.state._columnsArray) {
		const { state } = store
		const pickedColumns = columns.map((col) => pick(col, PUBLIC_COLUMN_PROPS))
		for (const col of pickedColumns) {
			const column = getColumn(state, col) //getColumn: returns state._columns[col.prop]
			if (column) {
				Object.assign(column, col)
				// FIXME: The following mutation literally only works because
				// Object.assign modifies the state directly
				// without committing/emitting, of course
				// column.hidden = col.hidden
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

export const getters = {}
