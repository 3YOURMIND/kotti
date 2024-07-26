/* eslint-disable @typescript-eslint/no-explicit-any */
import pick from 'lodash/pick.js'

import { KT_TABLE_STATE_PROVIDER } from './constants'
import KtTableLegacy, { INITIAL_TABLE_STORE_PROPS } from './KtTableLegacy.vue'
import { TableStore } from './logic/store'
import type { CreateElement } from 'vue'

let tableProviderIdSeed = 1

// eslint-disable-next-line @typescript-eslint/naming-convention
export const KtTableLegacyProvider: any = {
	name: 'KtTableLegacyProvider',
	components: {},
	props: { ...KtTableLegacy.props, rows: Array },
	data(): any {
		const defaultStore = new TableStore(
			this,
			pick(this, INITIAL_TABLE_STORE_PROPS),
		)
		return {
			defaultStore,
			selectedTableId: null,
			stores: {},
			tables: {},
		}
	},
	computed: {
		store(): unknown {
			// @ts-expect-error getStore and selectedTableId will exist at runtime
			return this.getStore(this.selectedTableId)
		},
	},
	beforeCreate(): void {
		this.tableId = `kt-table-provider_${tableProviderIdSeed}`
		tableProviderIdSeed += 1
	},
	methods: {
		addTable(table: any): void {
			// @ts-expect-error tables and $set will exist at runtime
			this.$set(this.tables, table.tableId, table)
		},
		addStore(id: unknown, store: any): void {
			// @ts-expect-error stores and $set will exist at runtime
			this.$set(this.stores, id, store)
		},
		updateStoreId(id: any, newId: any) {
			// @ts-expect-error stores and $set will exist at runtime
			this.$set(this.stores, newId, this.stores[id])
			// @ts-expect-error stores and $delete will exist at runtime
			this.$delete(this.stores, id)
			// @ts-expect-error selectedTableId will exist at runtime
			if (this.selectedTableId === id) {
				// @ts-expect-error selectedTableId will exist at runtime
				this.selectedTableId = newId
			}
		},
		setSelectedTableId(id: unknown): void {
			// @ts-expect-error selectedTableId will exist at runtime
			this.selectedTableId = id
		},
		getStore(id: any): unknown {
			// @ts-expect-error stores and defaultStore will exist at runtime
			return this.stores[id] || this.defaultStore
		},
	},
	render(h: CreateElement) {
		return h('div', {}, [this.$slots.default])
	},
	provide() {
		return {
			[KT_TABLE_STATE_PROVIDER]: this,
		}
	},
}
