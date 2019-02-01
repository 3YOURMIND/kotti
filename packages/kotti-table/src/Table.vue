<template>
	<div :class="{ 'x-scroll': isScrollable }">
		<div class="hidden-columns">
			<TableColumn
				v-for="column in formatedColumns"
				:key="column.prop"
				v-bind="column"
			/>
			<slot></slot>
		</div>
		<table class="kt-table">
			<TableHeader />
			<TableBody />
		</table>
	</div>
</template>
<script>
import pick from 'lodash/pick'
import TableStore from './logic/store'
import TableLayout from './table-layout'
import TableColumn from './TableColumn'
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import {
	SORT_NONE,
	KT_TABLE,
	KT_STORE,
	KT_LAYOUT,
	KT_TABLE_STATE_PROVIDER,
	DEFAULT_DISABLE_ROW,
} from './constants'

let tableIdSeed = 1

export const INITIAL_TABLE_STORE_PROPS = [
	'rowKey',
	'sortMultiple',
	'remoteSort',
	'sortable',
	'sortedColumns',
	'hiddenColumns',
	'filteredColumns',
]

export default {
	components: { TableBody, TableHeader, TableColumn },
	name: 'KtTable',
	props: {
		rowKey: { type: String },
		rows: { required: true, type: Array },
		columns: { default: () => [], type: Array },
		useColumnDragToOrder: { default: false, type: Boolean },
		useColumnStateControl: { default: false, type: Boolean },
		emptyText: { default: 'No Data', type: String },

		isInteractive: { default: false, type: Boolean },
		isScrollable: { default: false, type: Boolean },
		isSelectable: { default: false, type: Boolean },

		sortable: { default: false, type: [Boolean, String] },
		sortMultiple: { default: false, type: Boolean },
		remoteSort: { default: false, type: Boolean },
		useQuickSortControl: { default: false, type: Boolean },

		sortedColumns: { type: [Array, undefined] },
		filteredColumns: { type: [Array, undefined] },
		hiddenColumns: { type: [Array, undefined] },

		loading: Boolean,

		tdClasses: { default: () => [], types: [Array, String, Object] },
		thClasses: { default: () => [], types: [Array, String, Object] },
		trClasses: { default: () => [], types: [Array, String, Object] },
		headerClass: { default: () => [], types: [Array, String, Object] },
		height: String,
		maxHeight: String,

		renderExpand: Function,
		renderActions: Function,
		renderLoading: Function,
		renderEmpty: Function,

		disableRow: { default: DEFAULT_DISABLE_ROW, type: Function },

		expandMultiple: { default: false, type: Boolean },
		selected: { default: () => [], type: Array },
		// should be deprecated in favor of selections
		value: { type: Array }, // v-model value
	},
	inject: {
		[KT_TABLE_STATE_PROVIDER]: {
			default: false,
		},
	},
	beforeCreate() {
		this.tableId = `kt-table_${tableIdSeed}`
		tableIdSeed += 1
	},
	data() {
		let localStore
		const initialState = pick(this, INITIAL_TABLE_STORE_PROPS)
		if (this[KT_TABLE_STATE_PROVIDER]) {
			localStore = this[KT_TABLE_STATE_PROVIDER].store
			localStore.setTable(this)
			localStore.setInitialState(initialState)
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
		formatedColumns() {
			return this.columns.map(column => {
				if (column.key) {
					// eslint-disable-next-line
					console.warn(
						`column ${
							column.prop
						} table column property 'key' is deprecated using prop is sufficent to identify the column`,
					)
					return { ...column, prop: column.prop || column.key }
				}
				return column
			})
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
			return (h, rowData) => {
				const table = this
				if (table.renderExpand) {
					return table.renderExpand(h, rowData)
				} else {
					return table.$scopedSlots.expand(rowData)
				}
			}
		},
		_renderActions() {
			return (h, rowData) => {
				const table = this
				if (table.renderActions) {
					return table.renderActions(h, rowData)
				} else {
					return table.$scopedSlots.actions(rowData)
				}
			}
		},
		_renderLoading() {
			return h => {
				const table = this
				if (table.renderLoading) {
					return table.renderLoading(h)
				} else {
					return table.$slots.loading || <div class="loading lg" />
				}
			}
		},
		_renderEmpty() {
			return h => {
				const table = this
				if (table.renderEmpty) {
					return table.renderEmpty(h)
				} else {
					return table.$slots.empty || this.emptyText || this.$t
						? this.$t('table.emptyText')
						: 'No Data'
				}
			}
		},
	},
	watch: {
		rows: {
			immediate: true,
			handler(value) {
				this.localStore.commit('setRows', value)
			},
		},
		selected: {
			immediate: true,
			handler(value, oldValue) {
				if (value !== oldValue) {
					this.localStore.commit('setSelected', value)
				}
			},
		},
		value: {
			immediate: true,
			handler(value, oldValue) {
				if (value !== oldValue) {
					console.warn(
						'use of v-model in table is deprecated use selected prop instead',
					)
					this.localStore.commit('setSelectedIndexes', value)
				}
			},
		},
		sortedColumns: {
			handler(value, oldValue) {
				if (value && value !== oldValue) {
					this.store.commit('setSortedColumns', value)
				}
			},
		},
		hiddenColumns: {
			handler(value, oldValue) {
				if (value && value !== oldValue) {
					this.store.commit('setHiddenColumns', value)
				}
			},
		},
		filteredColumns: {
			handler(value, oldValue) {
				if (value && value !== oldValue) {
					this.store.commit('setFilteredColumns', value)
				}
			},
		},
		disableRow: {
			handler(value) {
				this.store.commit('updateDisabledRows')
			},
		},
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
	mounted() {
		this.sortedColumns &&
			this.store.commit('setSortedColumns', this.sortedColumns)
		this.filteredColumns &&
			this.store.commit('setFilteredColumns', this.filteredColumns)
		this.hiddenColumns &&
			this.store.commit('setHiddenColumns', this.hiddenColumns)
		this.$ready = true
		this.store.commit('updateColumns')
		this.$on('selectionChange', selection => {
			if (this.value) {
				this.$emit(
					'input',
					selection.map(row => this.store.get('getIndexByRow', row)),
				)
			}
		})
		const events = Object.keys(this.$listeners)
		if (events.includes('input')) {
			console.warn(
				'use of v-model and @input in table is deprecated subscribe to @selectionChange, @selectAll events instead',
			)
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
	background-color: #f8f8f8;
	cursor: not-allowed;
}

.x-scroll {
	height: auto;
}

.hidden-columns {
	display: none;
}
</style>
