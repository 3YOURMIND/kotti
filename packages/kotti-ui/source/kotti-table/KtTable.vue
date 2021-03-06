<template>
	<div :class="{ 'x-scroll': isScrollable }">
		<div class="hidden-columns">
			<!-- NOTE: The order is very important here as columns that are inserted-->
			<!-- last take precedence over columns that are inserted before them. -->
			<slot></slot>
			<!-- NOTE: As the column prop should be the source of truth in case of conflict -->
			<!-- the prop columns need to be added after the columns from the slot. -->
			<KtTableColumn
				v-for="(column, index) in formattedColumns"
				:key="`${column.prop}_${index}`"
				v-bind="column"
				isPropDefined
			/>
		</div>
		<table class="kt-table">
			<TableHeader />
			<TableBody />
		</table>
	</div>
</template>

<script lang="jsx">
import deepEql from 'deep-eql'
import pick from 'lodash/pick'

import { TableBody } from './components/TableBody'
import TableHeader from './components/TableHeader.vue'
import {
	KT_TABLE,
	KT_STORE,
	KT_LAYOUT,
	KT_TABLE_STATE_PROVIDER,
	DEFAULT_DISABLE_ROW,
} from './constants'
import { KtTableColumn } from './KtTableColumn'
import { TableStore } from './logic/store'
import { TableLayout } from './table-layout'

let tableIdSeed = 1

export const INITIAL_TABLE_STORE_PROPS = [
	'rowKey',
	'sortMultiple',
	'expandMultiple',
	'remoteSort',
	'sortable',
	'sortedColumns',
	'hiddenColumns',
	'filteredColumns',
]

export default {
	name: 'KtTable',
	components: { TableBody, TableHeader, KtTableColumn },
	props: {
		id: { default: null, type: String },
		rowKey: { type: String },
		rows: { default: () => [], type: Array },
		columns: { default: null, type: Array },
		useColumnDragToOrder: { default: false, type: Boolean },
		emptyText: { default: 'No Data', type: String },

		isInteractive: { default: false, type: Boolean },
		isScrollable: { default: false, type: Boolean },
		isSelectable: { default: false, type: Boolean },

		sortable: { default: false, type: [Boolean, String] },
		sortMultiple: { default: false, type: Boolean },
		remoteSort: { default: false, type: Boolean },
		useQuickSortControl: { default: false, type: Boolean },

		sortedColumns: { type: Array },
		filteredColumns: { type: Array },
		hiddenColumns: { type: Array },
		orderedColumns: { type: Array },

		loading: Boolean,

		tdClasses: { default: () => [], type: [Array, String, Object] },
		thClasses: { default: () => [], type: [Array, String, Object] },
		trClasses: { default: () => [], type: [Array, String, Object] },
		headerClass: { default: () => [], type: [Array, String, Object] },

		renderExpand: { type: Function },
		renderActions: { type: Function },
		renderLoading: { type: Function },
		renderEmpty: { type: Function },

		disableRow: { default: DEFAULT_DISABLE_ROW, type: Function },

		expandMultiple: { default: false, type: Boolean },
		selected: { default: () => [], type: Array },
	},
	inject: {
		[KT_TABLE_STATE_PROVIDER]: {
			default: false,
		},
	},
	data() {
		let localStore
		const initialState = pick(this, INITIAL_TABLE_STORE_PROPS)
		if (this[KT_TABLE_STATE_PROVIDER]) {
			if (this.id) {
				localStore = new TableStore(this, initialState)
				this[KT_TABLE_STATE_PROVIDER].addStore(this.id, localStore)
				this[KT_TABLE_STATE_PROVIDER].selectedTableId(this.id)
			} else {
				localStore = this[KT_TABLE_STATE_PROVIDER].store
				localStore.setTable(this)
				localStore.setInitialState(initialState)
			}
			this[KT_TABLE_STATE_PROVIDER].addTable(this)
		} else {
			localStore = new TableStore(this, initialState)
		}

		const layout = new TableLayout(this)
		return {
			localStore,
			layout,
		}
	},
	computed: {
		store() {
			return this[KT_TABLE_STATE_PROVIDER]
				? this[KT_TABLE_STATE_PROVIDER].store
				: this.localStore
		},
		formattedColumns() {
			return this.columns
				? this.columns.map((column) => {
						if (column.key) {
							// eslint-disable-next-line
							console.warn(
								`column ${column.prop} table column property 'key' is deprecated using prop is sufficient to identify the column`,
							)
							return { ...column, prop: column.prop || column.key }
						}

						return column
				  })
				: []
		},
		colSpan() {
			let colSpan = this.store.state.columns.length

			if (this.isExpandable) colSpan++
			if (this.isSelectable) colSpan++

			return colSpan
		},
		isExpandable() {
			return Boolean(this.$scopedSlots.expand || this.renderExpand)
		},
		hasActions() {
			return Boolean(this.$scopedSlots.actions || this.renderActions)
		},
		_renderExpand() {
			// eslint-disable-next-line @typescript-eslint/no-this-alias
			const table = this
			return (h, rowData) => {
				if (table.renderExpand) return table.renderExpand(h, rowData)

				return table.$scopedSlots.expand(rowData)
			}
		},
		_renderActions() {
			// eslint-disable-next-line @typescript-eslint/no-this-alias
			const table = this

			return (h, rowData) => {
				if (table.renderActions) return table.renderActions(h, rowData)

				return table.$scopedSlots.actions(rowData)
			}
		},
		_renderLoading() {
			// eslint-disable-next-line @typescript-eslint/no-this-alias
			const table = this

			return (h) => {
				if (table.renderLoading) return table.renderLoading(h)

				return table.$slots.loading || <div class="loading lg" />
			}
		},
		_renderEmpty() {
			// eslint-disable-next-line @typescript-eslint/no-this-alias
			const table = this

			return (h) => {
				if (table.renderEmpty) return table.renderEmpty(h)

				return (
					table.$slots.empty ||
					table.emptyText ||
					(this.$t && this.$t('table.emptyText')) ||
					'No Data'
				)
			}
		},
	},
	watch: {
		id(newId, id) {
			this[KT_TABLE_STATE_PROVIDER].updateStoreId(id, newId)
		},
		rows: {
			immediate: true,
			handler(value) {
				this.localStore.commit('setRows', value)
			},
		},
		selected: {
			immediate: true,
			handler(value, oldValue) {
				if (!deepEql(value, oldValue)) {
					this.localStore.commit('setSelected', value)
				}
			},
		},
		columns: {
			immediate: true,
			handler(value, oldValue) {
				if (value && !deepEql(value, oldValue)) {
					this.store.commit('setColumns', value)
				}
			},
		},
		sortedColumns: {
			immediate: true,
			handler(value, oldValue) {
				if (value && !deepEql(value, oldValue)) {
					this.store.commit('setSortedColumns', value)
				}
			},
		},
		hiddenColumns: {
			immediate: true,
			handler(value, oldValue) {
				if (value && !deepEql(value, oldValue)) {
					this.store.commit('setHiddenColumns', value)
				}
			},
		},
		filteredColumns: {
			immediate: true,
			handler(value, oldValue) {
				if (value && !deepEql(value, oldValue)) {
					this.store.commit('setFilteredColumns', value)
				}
			},
		},
		orderedColumns: {
			immediate: true,
			handler(value, oldValue) {
				if (value && !deepEql(value, oldValue)) {
					this.store.commit('setOrderedColumns', value)
				}
			},
		},
		disableRow: {
			handler() {
				this.store.commit('updateDisabledRows')
			},
		},
	},
	beforeCreate() {
		this.tableId = `kt-table_${tableIdSeed}`
		tableIdSeed += 1
	},
	mounted() {
		this.$ready = true
		this.store.commit('updateColumns', { emitChange: false })
		this.$on('selectionChange', (selection) => {
			if (this.value) {
				this.$emit(
					'input',
					selection.map((row) => this.store.get('getIndexByRow', row)),
				)
			}
		})
	},
	methods: {
		isSelected(index) {
			return this.store.isSelected(
				this.store.get('getRowByVisibleIndex', index),
			)
		},
		toggleExpand(index) {
			this.store.commit(
				'expandRow',
				this.store.get('getRowByVisibleIndex', index),
			)
		},
		toggleSelect(index) {
			this.store.commit(
				'selectRow',
				this.store.get('getRowByVisibleIndex', index),
			)
		},
		toggleSelectAll() {
			this.store.commit('toggleAllSelection')
		},
	},
	provide() {
		return {
			[KT_TABLE]: this,
			[KT_STORE]: this.store,
			[KT_LAYOUT]: this.layout,
		}
	},
}
</script>

<style lang="css" scoped>
.kt-table >>> .kt-table__no-row {
	color: #8f8f8f;
	text-align: center;
}

.kt-table >>> .kt-table__loader {
	text-align: center;
}

.kt-table >>> .loading {
	margin: 1.6rem 0;
	text-align: center;
}

.kt-table >>> tr.disabled {
	cursor: not-allowed;
	background-color: #f8f8f8;
	opacity: 0.6;
}

.x-scroll {
	height: auto;
}

.hidden-columns {
	display: none;
}
</style>
