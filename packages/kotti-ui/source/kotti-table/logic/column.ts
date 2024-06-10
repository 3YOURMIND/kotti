/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import pick from 'lodash/pick'
import Vue from 'vue'

import { PUBLIC_COLUMN_PROPS } from '../constants'
import { KottiTable } from '../types'

import { setFilteredColumn } from './filter'
import { setHiddenColumn, getResolvedHiddenColumns } from './hide'
import { resolveColumnsOrder, getOrderedColumns } from './order'
import { setSortedColumn } from './sort'
import type { Store } from './types'

export function getColumnRealIndex(state: any, column: any) {
	return state._columnsArray.findIndex(({ id }: any) => id == column.id)
}

function getColumn(state: any, column: any = {}) {
	return state._columns[column.prop]
}

export function getColumnIndex(state: any, column: any) {
	return getColumn(state, column).index
}

function setColumn(state: any, { column, index, deleted }: any) {
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
		// eslint-disable-next-line unicorn/explicit-length-check
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
	state: any,
	prop: any,
	shapeKeys: any,
	columns: any,
	mergeStrategy = Object.assign,
) {
	state[prop] = columns.map((column: any) => {
		// eslint-disable-next-line no-param-reassign
		column = pick(column, shapeKeys)
		const oldColumn = getColumn(state, column) || {}
		return mergeStrategy(oldColumn, column)
	})
}

function emitColumnsChange(store: any) {
	store.table.$ready &&
		store.emit(
			'columnsChange',
			store.state._columnsArray.map((col: any) =>
				pick(col, PUBLIC_COLUMN_PROPS),
			),
		)
}

function didRestoreDestroyedColumns({
	_destroyedColumns,
}: {
	_destroyedColumns: any
}) {
	const columns = Object.values(_destroyedColumns)

	return (
		// eslint-disable-next-line unicorn/explicit-length-check
		columns.length &&
		columns.reduce((sum, n) => (sum as number) + (n as number)) === 0
	)
}

export const defaultState: Store.StateComponents.Column = {
	_columns: {},
	_columnsArray: [],
	_destroyedColumns: {},
	columns: [],
	refreshColumnArray: true,
}

export const mutations = {
	insertColumn(store: any, { column, index }: any) {
		const deleted = store.state._destroyedColumns[column.prop]
		setColumn(store.state, { column, index, deleted })
		deleted && (store.state._destroyedColumns[column.prop] = 0)
		store.commit('updateColumns', { emitChange: false })
	},
	removeColumn(store: any, column: any) {
		// eslint-disable-next-line no-param-reassign
		column = getColumn(store.state, column)
		if (column) {
			column._deleted = true
			store.state._destroyedColumns[column.prop] = 1
			store.commit('updateColumns', { emitChange: false })
		}
	},
	setColumns(store: any, columns = store.state._columnsArray) {
		const { state } = store
		const pickedColumns = columns.map((col: any) =>
			pick(col, PUBLIC_COLUMN_PROPS),
		)
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
		store: any,
		{
			emitChange = true,
			refreshColumnArray = store.state.refreshColumnArray,
		} = {},
	): void {
		const { table, state } = store
		if (table.$ready) {
			if (refreshColumnArray || didRestoreDestroyedColumns(state)) {
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
