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
	getters: Store.Getters
	mutations: Store.Mutations
	state: Store.State
	table: any
	id: string | undefined

	constructor(table: any, initialState: Partial<Store.State> = {}) {
		this.setTable(table)
		// we deep clone initial state in order to not refer to the same objects
		this.state = cloneDeep({
			...column.defaultState,
			...disable.defaultState,
			...expand.defaultState,
			...filter.defaultState,
			...hide.defaultState,
			...order.defaultState,
			...rows.defaultState,
			...select.defaultState,
			...sort.defaultState,
		})
		this.setInitialState(initialState)

		this.mutations = {
			...column.mutations,
			...disable.mutations,
			...expand.mutations,
			...filter.mutations,
			...hide.mutations,
			...order.mutations,
			...rows.mutations,
			...select.mutations,
			...sort.mutations,
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

	commit<T extends keyof Store.Mutations>(
		name: T,
		...args: Store.MutationParameters<T>
	) {
		const mutations = this.mutations

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (mutations[name]) {
			// FIXME: Can be fixed by e.g. refactoring mutations to take at most one argument
			// @ts-expect-error not easy to represent variadic arguments
			mutations[name].call(this, this, ...args)
			return
		} else {
			throw new Error(`Mutation not found: ${name}`)
		}
	}

	get<T extends keyof Store.Getters>(
		name: T,
		...args: Store.GetterParameters<T>
	): ReturnType<Store.Getters[T]> {
		const getters = this.getters

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (getters[name]) {
			// FIXME: Can be fixed by e.g. refactoring getters to take at most one argument
			// @ts-expect-error not easy to represent variadic arguments
			return getters[name].call(this, this.state, ...args)
		} else {
			throw new Error(`Getter not found: ${name}`)
		}
	}

	emit(event: any, ...args: any) {
		this.table.$emit(event, ...args)
	}
}
