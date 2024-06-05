<template>
	<div :class="{ 'x-scroll': isScrollable }">
		<div class="hidden-columns">
			<!-- NOTE: The order is very important here as columns that are inserted-->
			<!-- last take precedence over columns that are inserted before them. -->
			<slot />
			<!-- NOTE: As the column prop should be the source of truth in case of conflict -->
			<!-- the prop columns need to be added after the columns from the slot. -->
			<!-- @vue-expect-error -->
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

<script lang="ts">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import isEqual from 'lodash/isEqual'
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
import type { CreateElement, PropType } from 'vue'
import type { KottiTable } from './types'

let tableIdSeed = 1

export const INITIAL_TABLE_STORE_PROPS = [
	'expandMultiple',
	'filteredColumns',
	'hiddenColumns',
	'remoteSort',
	'rowKey',
	'sortable',
	'sortedColumns',
	'sortMultiple',
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
			// @ts-expect-error store will exist at runtime
			[KT_STORE]: this.store,
			// @ts-expect-error layout will exist at runtime
			[KT_LAYOUT]: this.layout,
		}
	},
	props: {
		columns: { default: null, type: Array },
		emptyText: { default: 'No Data', type: String },
		id: { default: null, type: String },
		// FIXME: Props should either be required or have a default
		rowKey: {
			required: false,
			type: [String, Function] as PropType<KottiTable.RowKey>,
		},
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

		// FIXME: Props should either be required or have a default
		headerClass: { required: false, type: [String, Array, Object] },
		// FIXME: Props should either be required or have a default
		tdClasses: { required: false, type: [String, Array, Object] },
		// FIXME: Props should either be required or have a default
		thClasses: { required: false, type: [String, Array, Object] },
		// FIXME: Props should either be required or have a default
		trClasses: { required: false, type: [String, Array, Object] },

		// FIXME: Props should either be required or have a default
		renderActions: { required: false, type: Function },
		// FIXME: Props should either be required or have a default
		renderEmpty: { required: false, type: Function },
		// FIXME: Props should either be required or have a default
		renderExpand: { required: false, type: Function },
		// FIXME: Props should either be required or have a default
		renderLoading: { required: false, type: Function },

		disableRow: { default: DEFAULT_DISABLE_ROW, type: Function },

		expandMultiple: { default: false, type: Boolean },
		selected: { default: () => [], type: Array },
	},
	emits: [
		'activateRow',
		'cellClick', // FIXME: Seems unused
		'columnsChange',
		'expand', // FIXME: Seems unused
		'expandChange', // FIXME: Seems unused
		'hiddenChange', // FIXME: Seems unused
		'input',
		'orderChange', // FIXME: Seems unused
		'rowBlur', // FIXME: Seems unused
		'rowClick',
		'rowFocus', // FIXME: Seems unused
		'select', // FIXME: Seems unused
		'selectAll', // FIXME: Seems unused
		'selectionChange',
		'sortChange',
	],
	data() {
		let localStore
		const initialState = pick(this, INITIAL_TABLE_STORE_PROPS)
		// @ts-expect-error `this[KT_TABLE_STATE_PROVIDER]` seems to emulate a provide/inject pattern of sorts
		if (this[KT_TABLE_STATE_PROVIDER]) {
			if (this.id) {
				localStore = new TableStore(this, initialState)
				// @ts-expect-error `this[KT_TABLE_STATE_PROVIDER]` seems to emulate a provide/inject pattern of sorts
				this[KT_TABLE_STATE_PROVIDER].addStore(this.id, localStore)
				// @ts-expect-error `this[KT_TABLE_STATE_PROVIDER]` seems to emulate a provide/inject pattern of sorts
				this[KT_TABLE_STATE_PROVIDER].selectedTableId(this.id)
			} else {
				// @ts-expect-error `this[KT_TABLE_STATE_PROVIDER]` seems to emulate a provide/inject pattern of sorts
				localStore = this[KT_TABLE_STATE_PROVIDER].store
				localStore.setTable(this)
				localStore.setInitialState(initialState)
			}
			// @ts-expect-error `this[KT_TABLE_STATE_PROVIDER]` seems to emulate a provide/inject pattern of sorts
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
			// @ts-expect-error `this[KT_TABLE_STATE_PROVIDER]` seems to emulate a provide/inject pattern of sorts
			return this[KT_TABLE_STATE_PROVIDER]
				? // @ts-expect-error `this[KT_TABLE_STATE_PROVIDER]` seems to emulate a provide/inject pattern of sorts
					this[KT_TABLE_STATE_PROVIDER].store
				: // @ts-expect-error localStore will exist at runtime
					this.localStore
		},
		formattedColumns(): unknown[] {
			return this.columns
				? this.columns.map((column: any) => {
						if (column.key) {
							// eslint-disable-next-line
							console.warn(
								`column ${String(column.prop)} table column property 'key' is deprecated using prop is sufficient to identify the column`,
							)
							return { ...column, prop: column.prop || column.key }
						}

						return column
					})
				: []
		},
		colSpan() {
			// @ts-expect-error store will exist at runtime
			let colSpan = this.store.state.columns.length

			// @ts-expect-error isExpandable will exist at runtime
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (this.isExpandable) colSpan++
			if (this.isSelectable) colSpan++

			return colSpan
		},
		isExpandable() {
			return Boolean(this.$slots.expand || this.renderExpand)
		},
		hasActions() {
			return Boolean(this.$slots.actions || this.renderActions)
		},
		_renderExpand() {
			return (h: CreateElement, rowData: any) => {
				if (this.renderExpand) return this.renderExpand(h, rowData)

				// @ts-expect-error $slots will exist at runtime

				return this.$slots.expand(rowData)
			}
		},
		_renderActions() {
			return (h: CreateElement, rowData: any) => {
				if (this.renderActions) return this.renderActions(h, rowData)

				// @ts-expect-error $slots will exist at runtime

				return this.$slots.actions(rowData)
			}
		},
		_renderLoading() {
			return (h: CreateElement) => {
				if (this.renderLoading) return this.renderLoading(h)

				return this.$slots.loading || h('div', { class: 'loading lg' })
			}
		},
		_renderEmpty() {
			return (h: CreateElement) => {
				if (this.renderEmpty) return this.renderEmpty(h)

				return (
					this.$slots.empty ||
					this.emptyText ||
					// FIXME: $t is not supposed to be used in kotti, probably a hack
					// @ts-expect-error $t will exist at runtime (?)
					this.$t?.('table.emptyText') ||
					'No Data'
				)
			}
		},
	},
	watch: {
		id(newId, id) {
			// @ts-expect-error `this[KT_TABLE_STATE_PROVIDER]` seems to emulate a provide/inject pattern of sorts
			this[KT_TABLE_STATE_PROVIDER].updateStoreId(id, newId)
		},
		rows: {
			immediate: true,
			handler(value) {
				// @ts-expect-error localStore will exist at runtime
				this.localStore.commit('setRows', value)
			},
		},
		selected: {
			immediate: true,
			handler(value, oldValue) {
				if (!isEqual(value, oldValue)) {
					// @ts-expect-error localStore will exist at runtime
					this.localStore.commit('setSelected', value)
				}
			},
		},
		columns: {
			immediate: true,
			handler(value, oldValue) {
				if (value && !isEqual(value, oldValue)) {
					// @ts-expect-error store will exist at runtime
					this.store.commit('setColumns', value)
				}
			},
		},
		sortedColumns: {
			immediate: true,
			handler(value, oldValue) {
				if (value && !isEqual(value, oldValue)) {
					// @ts-expect-error store will exist at runtime
					this.store.commit('setSortedColumns', value)
				}
			},
		},
		hiddenColumns: {
			immediate: true,
			handler(value, oldValue) {
				if (value && !isEqual(value, oldValue)) {
					// @ts-expect-error store will exist at runtime
					this.store.commit('setHiddenColumns', value)
				}
			},
		},
		filteredColumns: {
			immediate: true,
			handler(value, oldValue) {
				if (value && !isEqual(value, oldValue)) {
					// @ts-expect-error store will exist at runtime
					this.store.commit('setFilteredColumns', value)
				}
			},
		},
		orderedColumns: {
			immediate: true,
			handler(value, oldValue) {
				if (value && !isEqual(value, oldValue)) {
					// @ts-expect-error store will exist at runtime
					this.store.commit('setOrderedColumns', value)
				}
			},
		},
		disableRow: {
			handler() {
				// @ts-expect-error store will exist at runtime
				this.store.commit('updateDisabledRows')
			},
		},
	},
	beforeCreate() {
		// @ts-expect-error tableId will exist at runtime
		this.tableId = `kt-table_${String(tableIdSeed)}`
		tableIdSeed += 1
	},
	mounted() {
		// @ts-expect-error $ready will exist at runtime
		this.$ready = true
		// @ts-expect-error store will exist at runtime
		this.store.commit('updateColumns', { emitChange: false })
		// eslint-disable-next-line vue/no-deprecated-events-api
		this.$on('selectionChange', (selection: any) => {
			// @ts-expect-error value will exist at runtime
			if (this.value) {
				this.$emit(
					'input',
					// @ts-expect-error store will exist at runtime
					selection.map((row: any) => this.store.get('getIndexByRow', row)),
				)
			}
		})
	},
	methods: {
		isSelected(index: unknown): unknown {
			// @ts-expect-error store will exist at runtime
			return this.store.isSelected(
				// @ts-expect-error store will exist at runtime
				this.store.get('getRowByVisibleIndex', index),
			)
		},
		toggleExpand(index: unknown): void {
			// @ts-expect-error store will exist at runtime
			this.store.commit(
				'expandRow',
				// @ts-expect-error store will exist at runtime
				this.store.get('getRowByVisibleIndex', index),
			)
		},
		toggleSelect(index: unknown): void {
			// @ts-expect-error store will exist at runtime
			this.store.commit(
				'selectRow',
				// @ts-expect-error store will exist at runtime
				this.store.get('getRowByVisibleIndex', index),
			)
		},
		toggleSelectAll(): void {
			// @ts-expect-error store will exist at runtime
			this.store.commit('toggleAllSelection')
		},
	},
}
</script>

<style lang="scss" scoped>
@import './style/form-checkbox.scss';
@import '../kotti-style/_variables.scss';

table.kt-table {
	position: relative;
	width: 100%;
	hyphens: auto;
	table-layout: auto;
	border-collapse: collapse;
}

::v-deep table.kt-table tr {
	position: relative;
	margin: 0;

	&:hover .table-actions {
		display: inline-flex;
		justify-content: center;
		background: var(--white);
	}

	&.disabled {
		cursor: not-allowed;
		background-color: var(--ui-01);
		opacity: 0.6;
	}

	&.selected,
	&:focus {
		background: var(--ui-01);
	}

	&:focus {
		outline: none;
	}
}

::v-deep table.kt-table td {
	position: relative;
	padding: var(--unit-2) var(--unit-1);
	line-height: 1.2rem;
	border-bottom: 1px solid $lightgray-400;

	&.empty {
		color: $lightgray-500;
		text-align: center;
	}
}

::v-deep table.kt-table {
	.expand-toggle,
	.kt-table__quick-sort-control {
		i {
			margin: 0 0.2rem;
			font-size: 1rem !important;
			color: $darkgray-300;

			&.disabled {
				color: $lightgray-500;
			}
		}
	}
}

::v-deep table.kt-table .table-actions {
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
	border-radius: var(--border-radius);
	box-shadow: 0 0 1px #999;

	> div {
		display: flex;
		flex-direction: row;
	}

	i {
		margin: 0 var(--unit-1);
		font-size: 1rem;
		color: $lightgray-500;

		&:hover {
			color: $darkgray-500;
			cursor: pointer;
		}
	}
}

::v-deep table.kt-table .form-group {
	width: 32px;
	line-height: 0;

	.form-icon {
		top: 0.2rem;
	}
}

::v-deep .kt-table .kt-table__no-row {
	color: $lightgray-500;
	text-align: center;
}

::v-deep .kt-table .kt-table__loader {
	text-align: center;
}

::v-deep .kt-table .loading {
	margin: 1.6rem 0;
	text-align: center;
}

.x-scroll {
	display: block;
	width: 100%;
	height: 100%;
	overflow-x: auto;
	white-space: nowrap;
}

.hidden-columns {
	display: none;
}
</style>
