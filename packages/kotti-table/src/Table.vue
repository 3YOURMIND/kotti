<template>
	<div :class="{ 'x-scroll': isScrollable }">
		<div class="hidden-columns">
			<TableColumn
				v-for="(column, index) in formatedColumns"
				:key="`${column.prop}_${index}`"
				isPropDefined
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
	'expandMultiple',
	'remoteSort',
	'sortable',
	'sortedColumns',
	'hiddenColumns',
	'filteredColumns',
]

export default {
	name: 'KtTable',
	components: { TableBody, TableHeader, TableColumn },
	props: {
		id: { default: null, type: String },
		rowKey: { type: String },
		rows: { default: () => [], type: Array },
		columns: { default: null, type: Array },
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
		orderedColumns: { type: [Array, undefined] },

		loading: Boolean,

		tdClasses: { default: () => [], type: [Array, String, Object] },
		thClasses: { default: () => [], type: [Array, String, Object] },
		trClasses: { default: () => [], type: [Array, String, Object] },
		headerClass: { default: () => [], type: [Array, String, Object] },
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
		formatedColumns() {
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
			const table = this
			return (h, rowData) => {
				if (table.renderExpand) {
					return table.renderExpand(h, rowData)
				} else {
					return table.$scopedSlots.expand(rowData)
				}
			}
		},
		_renderActions() {
			const table = this
			return (h, rowData) => {
				if (table.renderActions) {
					return table.renderActions(h, rowData)
				} else {
					return table.$scopedSlots.actions(rowData)
				}
			}
		},
		_renderLoading() {
			const table = this
			return (h) => {
				if (table.renderLoading) {
					return table.renderLoading(h)
				} else {
					return table.$slots.loading || <div class="loading lg" />
				}
			}
		},
		_renderEmpty() {
			const table = this
			return (h) => {
				if (table.renderEmpty) {
					return table.renderEmpty(h)
				} else {
					return (
						table.$slots.empty ||
						table.emptyText ||
						(this.$t && this.$t('table.emptyText')) ||
						'No Data'
					)
				}
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
				if (value !== oldValue) {
					this.localStore.commit('setSelected', value)
				}
			},
		},
		value: {
			immediate: true,
			handler(value, oldValue) {
				if (value !== oldValue) {
					// eslint-disable-next-line no-console
					console.warn(
						'use of v-model in table is deprecated use selected prop instead',
					)
					this.localStore.commit('setSelectedIndices', value)
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
			handler() {
				//FIXME: i remove the parameter here because it was unused - was this intentional? @carol
				this.store.commit('updateDisabledRows')
			},
		},
		orderedColumns: {
			handler(value, oldValue) {
				if (value && value !== oldValue) {
					this.store.commit('setOrderedColumns', value)
				}
			},
		},
		columns: {
			handler(value, oldValue) {
				if (value && value !== oldValue) {
					this.store.commit('setColumns', value)
				}
			},
		},
	},
	beforeCreate() {
		this.tableId = `kt-table_${tableIdSeed}`
		tableIdSeed += 1
	},
	mounted() {
		this.columns && this.store.commit('setColumns', this.columns)
		this.orderedColumns &&
			this.store.commit('setOrderedColumns', this.orderedColumns)
		this.sortedColumns &&
			this.store.commit('setSortedColumns', this.sortedColumns)
		this.filteredColumns &&
			this.store.commit('setFilteredColumns', this.filteredColumns)
		this.hiddenColumns &&
			this.store.commit('setHiddenColumns', this.hiddenColumns)
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
		const events = Object.keys(this.$listeners)
		if (events.includes('input')) {
			// eslint-disable-next-line no-console
			console.warn(
				'use of v-model and @input in table is deprecated subscribe to @selectionChange, @selectAll events instead',
			)
		}
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

<style lang="scss">
.kt-table {
	position: relative;
	width: 100%;
	margin: 0.8rem 0;
	hyphens: auto;
	table-layout: auto;
	border-collapse: collapse;

	th {
		padding: $unit-2 $unit-1;
		font-size: $font-size-sm;
		line-height: 1em;
		color: $lightgray-500;
		text-align: inherit;
		text-transform: uppercase;
		border-bottom: $border-width solid $border-color;
	}

	tr {
		position: relative;
		margin: 0;

		&:hover .table-actions {
			display: inline-flex;
			justify-content: center;
			background: #ffffff;
		}

		&.selected,
		&:focus {
			background: $lightgray-300;
		}

		&:focus {
			outline: none;
		}
	}

	td {
		position: relative;
		padding: $unit-2 $unit-1;
		line-height: 1.2rem;
		border-bottom: 1px solid #dbdbdb;

		&.empty {
			color: $lightgray-500;
			text-align: center;
		}
	}

	i {
		margin: 0 0.2rem;
		font-size: 1rem !important;
		color: $darkgray-300;

		&.disabled {
			color: $lightgray-500;
		}
	}

	.table-actions {
		position: absolute;
		top: 50%;
		right: 0.8rem;
		z-index: $zindex-4;
		display: none;
		float: right;
		width: auto;
		padding: 0.25rem;
		margin-top: -0.8rem;
		font-size: 0.8rem;
		line-height: 0.8rem;
		border: 0;
		border-radius: $border-radius;
		box-shadow: 0 0 1px #999;

		i {
			margin: 0 $unit-1;
			color: $lightgray-500;

			&:hover {
				color: $darkgray-500;
				cursor: pointer;
			}
		}
	}

	.form-group {
		width: 32px;
		line-height: 0;

		.form-icon {
			top: 0.2rem;
		}
	}

	.form-checkbox {
		padding: 0 0.4rem;
		margin: 0;
		line-height: 1.2rem;
	}

	&.no-header {
		margin-top: -0.5em;
	}
}

.x-scroll {
	display: block;
	width: 100%;
	height: 100%;
	height: auto;
	overflow-x: auto;
	white-space: nowrap;
}

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

.hidden-columns {
	display: none;
}
</style>
