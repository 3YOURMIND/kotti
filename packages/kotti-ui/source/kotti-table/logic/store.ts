/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cloneDeep from 'lodash/cloneDeep'
import isUndefined from 'lodash/isUndefined'
import negate from 'lodash/negate'
import pickBy from 'lodash/pickBy'

import * as column from './column'
import * as disable from './disable'
import * as expand from './expand'
import * as filter from './filter'
import * as hide from './hide'
import * as order from './order'
import * as rows from './row'
import * as select from './select'
import * as sort from './sort'
import type { Store } from './types'

export class TableStore {
	getters: any
	mutations: any
	state: Store.State
	table: any
	id: string | undefined

	constructor(table: any, initialState: Partial<Store.State> = {}) {
		this.setTable(table)
		// we deep clone initial state in order to not refer to the same objects
		this.state = cloneDeep({
			...column.defaultState,
			...rows.defaultState,
			...expand.defaultState,
			...order.defaultState,
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
			...order.mutations,
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
			...order.getters,
			...disable.getters,
			...select.getters,
			...hide.getters,
			...sort.getters,
			...filter.getters,
		}
	}
	setTable(table: any) {
		this.table = table
		// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
		this.id = table.tableId + '_store'
	}
	setInitialState(initialState: Partial<Store.State>) {
		this.state = cloneDeep({
			...this.state,
			...pickBy(initialState, negate(isUndefined)),
		})
	}

	commit(name: any, ...args: any) {
		const mutations = this.mutations
		if (mutations[name]) {
			return mutations[name].call(this, this, ...args)
		} else {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			throw new Error(`Mutation not found: ${name}`)
		}
	}

	get(name: any, ...args: any) {
		const getters = this.getters
		if (getters[name]) {
			return getters[name].call(this, this.state, ...args)
		} else {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			throw new Error(`Getter not found: ${name}`)
		}
	}

	emit(event: any, ...args: any) {
		this.table.$emit(event, ...args)
	}
}
