import pick from 'lodash/pick'

import { KT_TABLE_STATE_PROVIDER } from './constants'
import KtTable, { INITIAL_TABLE_STORE_PROPS } from './KtTable.vue'
import { TableStore } from './logic/store'
let tableProviderIdSeed = 1

export const KtTableProvider = {
	name: 'KtTableProvider',
	components: {},
	props: { ...KtTable.props, rows: Array },
	data() {
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
		store() {
			return this.getStore(this.selectedTableId)
		},
	},
	beforeCreate() {
		this.tableId = `kt-table-provider_${tableProviderIdSeed}`
		tableProviderIdSeed += 1
	},
	methods: {
		addTable(table) {
			this.$set(this.tables, table.tableId, table)
		},
		addStore(id, store) {
			this.$set(this.stores, id, store)
		},
		updateStoreId(id, newId) {
			this.$set(this.stores, newId, this.stores[id])
			this.$delete(this.stores, id)
			if (this.selectedTableId === id) {
				this.selectedTableId = newId
			}
		},
		setSelectedTableId(id) {
			this.selectedTableId = id
		},
		getStore(id) {
			return this.stores[id] || this.defaultStore
		},
	},
	render() {
		return <div>{this.$slots.default}</div>
	},
	provide() {
		return {
			[KT_TABLE_STATE_PROVIDER]: this,
		}
	},
}
