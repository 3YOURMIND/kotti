/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import pick from 'lodash/pick.js'
import pickBy from 'lodash/pickBy.js'
import Vue from 'vue'

import { PUBLIC_COLUMN_PROPS } from '../constants'
import { KottiTable } from '../types'

import { setFilteredColumn } from './filter'
import { setHiddenColumn, getResolvedHiddenColumns } from './hide'
import { resolveColumnsOrder, getOrderedColumns } from './order'
import { setSortedColumn } from './sort'
import type { Store } from './types'

export function getColumnRealIndex(
	state: Store.State,
	column: Store.StateComponents.ColumnRepresentation,
) {
	return state._columnsArray.findIndex(({ id }) => id == column.id)
}

export function getColumnIndex(state: Store.State, columnProp: string): number {
	const columnInStore = state._columns[columnProp]

	if (!columnInStore?.index)
		throw new Error(`Could not find column ${columnProp} in KtTable Store`)

	return columnInStore.index
}

export function setColumnsArray(
	state: Store.State,
	prop: keyof Store.State,
	shapeKeys: (keyof Store.StateComponents.ColumnRepresentation)[],
	columns: Store.StateComponents.ColumnRepresentation[],
) {
	state[prop] = columns.map((column: any) => {
		// eslint-disable-next-line no-param-reassign
		column = pick(column, shapeKeys)
		const oldColumn = state._columns[column.prop] ?? {}
		return Object.assign(oldColumn, column)
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

export const mutations: Store.MutationComponents.Column = {
	insertColumn(store, { column, index }) {
		const { state } = store
		const deleted = state._destroyedColumns[column.prop]

		const newColumn: Store.StateComponents.ColumnRepresentation = (() => {
			const oldColumn = state._columns[column.prop]

			if (!oldColumn) {
				return {
					...column,
					index: index ?? Object.keys(state._columns).length,
				}
			}

			if (deleted) {
				return {
					...oldColumn,
					_deleted: false,
				}
			}

			// migrate from slot to props
			const isNewColumnPropDefined = column.isPropDefined
			const isOldColumnSlotDefined = !oldColumn.isPropDefined

			return pickBy(
				{
					...oldColumn,
					...(isNewColumnPropDefined && isOldColumnSlotDefined
						? pick(column, PUBLIC_COLUMN_PROPS)
						: column),
				},
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				(value) => value !== undefined,
			) as Store.StateComponents.ColumnRepresentation
		})()
		Vue.set(state._columns, newColumn.prop, newColumn)

		if (newColumn.sortOrder !== KottiTable.Column.SortOrders.NONE) {
			setSortedColumn(state, newColumn)
		}
		if (newColumn.hidden === true) {
			setHiddenColumn(state, newColumn)
		}
		// @ts-expect-error filter is a dead feature, can be ignored
		if (newColumn.filter !== undefined) {
			setFilteredColumn(state, newColumn)
		}

		if (deleted) {
			Vue.set(state._destroyedColumns, column.prop, 0)
		}
		store.commit('updateColumns', { emitChange: false })
	},
	removeColumn(store, column) {
		// eslint-disable-next-line no-param-reassign
		column = store.state._columns[column.prop]
		if (column) {
			column._deleted = true
			store.state._destroyedColumns[column.prop] = 1
			store.commit('updateColumns', { emitChange: false })
		}
	},
	setColumns(store, columns = store.state._columnsArray) {
		for (const columnsEntry of columns) {
			const pickedColumn = pick(columnsEntry, PUBLIC_COLUMN_PROPS)
			const column = store.state._columns[pickedColumn.prop]
			if (column) {
				Object.assign(column, pickedColumn)
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

export const getters: Store.GetterComponents.Column = {}
