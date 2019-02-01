import clone from 'lodash/cloneDeep'
import pickBy from 'lodash/pickBy'
import isUndefined from 'lodash/isUndefined'
import negate from 'lodash/negate'
import * as column from './column'
import * as rows from './row'
import * as expand from './expand'
import * as hide from './hide'
import * as select from './select'
import * as sort from './sort'
import * as filter from './filter'
import * as disable from './disable'

export default class TableStore {
	constructor(table, initialState = {}) {
		this.setTable(table)
		// we deep clone initial state in order to not refer to the same objects
		this.state = clone({
			...column.defaultState,
			...rows.defaultState,
			...expand.defaultState,
			...disable.defaultState,
			...select.defaultState,
			...hide.defaultState,
			...sort.defaultState,
			...filter.defaultState,
		})
		this.setInitialState(initialState)

		this.mutations = {
			...column.mutations,
			...rows.mutations,
			...expand.mutations,
			...disable.mutations,
			...select.mutations,
			...hide.mutations,
			...sort.mutations,
			...filter.mutations,
		}

		this.getters = {
			...column.getters,
			...rows.getters,
			...expand.getters,
			...disable.getters,
			...select.getters,
			...hide.getters,
			...sort.getters,
			...filter.getters,
		}
	}
	setTable(table) {
		this.table = table
		this.id = table.tableId + '_store'
	}
	setInitialState(initialState) {
		this.state = clone({
			...this.state,
			...pickBy(initialState, negate(isUndefined)),
		})
	}

	commit(name, ...args) {
		const mutations = this.mutations
		if (mutations[name]) {
			return mutations[name].call(this, this, ...args)
		} else {
			throw new Error(`Mutation not found: ${name}`)
		}
	}

	get(name, ...args) {
		const getters = this.getters
		if (getters[name]) {
			return getters[name].call(this, this.state, ...args)
		} else {
			throw new Error(`Getter not found: ${name}`)
		}
	}

	emit(event, ...args) {
		this.table.$emit(event, ...args)
	}
}
