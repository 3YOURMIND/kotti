import property from 'lodash/property'
import negate from 'lodash/negate'
import pick from 'lodash/pick'
import { SORT_NONE } from '../constants'
import { setSortedColumn } from './sort'
import { setHiddenColumn } from './hide'
import { setFilterColumn } from './filter'

export const defaultState = {
	_columns: [],
	columns: [],
}

export const mutations = {
	insertColumn(store, column, index) {
		setColumn(store.state, column, index)
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
			state.columns = _columns.filter(negate(property('hidden')))
		}
	},
}

export const getters = {}

export function getColumn(state, column) {
	return state._columns.find(({ prop }) => prop === column.prop)
}

export function setColumn(state, column, index) {
	const { _columns = [] } = state
	let oldColumnIndex = -1

	if (column.prop) {
		oldColumnIndex = _columns.findIndex(({ prop }) => prop === column.prop)
	}

	if (oldColumnIndex !== -1) {
		let oldColumn = _columns[oldColumnIndex]
		column.index = oldColumnIndex
		_columns.splice(column.index, 1, { ...oldColumn, ...column })
	} else if (column.index !== undefined) {
		_columns.splice(column.index, 0, column)
	} else if (index !== undefined) {
		_columns.splice(index, 0, column)
	} else {
		column.index = _columns.length
		_columns.push(column)
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
