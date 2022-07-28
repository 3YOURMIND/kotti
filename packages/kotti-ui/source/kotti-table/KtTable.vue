<template>
	<div :class="{ 'x-scroll': isScrollable }">
		<div class="hidden-columns">
			<!-- NOTE: The order is very important here as columns that are inserted-->
			<!-- last take precedence over columns that are inserted before them. -->
			<slot />
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
	components: {
		KtTableColumn,
		TableBody,
		TableHeader,
	},
	inject: {
		[KT_TABLE_STATE_PROVIDER]: {
			default: false,
		},
	},
	provide() {
		return {
			[KT_TABLE]: this,
			[KT_STORE]: this.store,
			[KT_LAYOUT]: this.layout,
		}
	},
	props: {
		columns: { default: null, type: Array },
		emptyText: { default: 'No Data', type: String },
		id: { default: null, type: String },
		rowKey: { required: false, type: [String, Function] },
		rows: { default: () => [], type: Array },
		useColumnDragToOrder: { default: false, type: Boolean },

		isInteractive: { default: false, type: Boolean },
		isScrollable: { default: false, type: Boolean },
		isSelectable: { default: false, type: Boolean },

		remoteSort: { default: false, type: Boolean },
		sortMultiple: { default: false, type: Boolean },
		sortable: { default: false, type: [Boolean, String] },
		useQuickSortControl: { default: false, type: Boolean },

		filteredColumns: { default: () => [], type: Array },
		hiddenColumns: { default: () => [], type: Array },
		orderedColumns: { default: () => [], type: Array },
		sortedColumns: { default: () => [], type: Array },

		loading: { default: false, type: Boolean },

		headerClass: { required: false, type: [String, Array, Object] },
		tdClasses: { required: false, type: [String, Array, Object] },
		thClasses: { required: false, type: [String, Array, Object] },
		trClasses: { required: false, type: [String, Array, Object] },

		renderActions: { required: false, type: Function },
		renderEmpty: { required: false, type: Function },
		renderExpand: { required: false, type: Function },
		renderLoading: { required: false, type: Function },

		disableRow: { default: DEFAULT_DISABLE_ROW, type: Function },

		expandMultiple: { default: false, type: Boolean },
		selected: { default: () => [], type: Array },
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
}
</script>

<style lang="scss" scoped>
@import '../kotti-style/_variables.scss';
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

.kt-table ::v-deep .form-checkbox {
	position: relative;
	display: inline-block;
	min-height: 1.2rem;
	padding: (($control-size-sm - $line-height) / 2) $control-padding-x
		(($control-size-sm - $line-height) / 2)
		($control-icon-size + $control-padding-x);
	margin: ($control-size - $control-size-sm) / 2 0;
	line-height: $line-height;

	input {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);

		&:focus + .form-icon {
			border-color: var(--interactive-01);
		}

		&:checked + .form-icon {
			background: var(--interactive-01);
			border-color: var(--interactive-01);
		}
		&:invalid + .form-icon {
			border: 1px solid var(--support-error);
		}
		&:active + .form-icon {
			background: var(--ui-04);
		}
	}

	.form-icon {
		position: absolute;
		top: ($control-size-sm - $control-icon-size) / 2;
		left: 0;
		display: inline-block;
		width: $control-icon-size;
		height: $control-icon-size;
		cursor: pointer;
		background: var(--ui-background);
		border: $border-width solid var(--ui-02);
	}

	// Input checkbox sizes
	&.input-sm {
		margin: 0;
		font-size: $font-size-sm;
	}

	&.input-lg {
		margin: ($control-size-lg - $control-size-sm) / 2 0;
		font-size: $font-size-lg;
	}
}
</style>
