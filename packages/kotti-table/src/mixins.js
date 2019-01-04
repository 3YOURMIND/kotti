import {
	KT_TABLE,
	KT_STORE,
	KT_LAYOUT,
	KT_TABLE_STATE_PROVIDER,
} from './constants'

export const tableInjectedMixin = {
	inject: { KT_TABLE, KT_STORE, KT_LAYOUT },
}

export const TableColumnsStateMixin = {
	inject: {
		KT_TABLE: { default: false },
		KT_STORE: { default: false },
		[KT_TABLE_STATE_PROVIDER]: {
			default: {
				get store() {
					throw new Error(
						'tried to capture table state without KtTable or KtTableProvider',
					)
				},
			},
		},
	},
	computed: {
		KtTableStore() {
			return this[KT_TABLE]
				? this[KT_STORE]
				: this[KT_TABLE_STATE_PROVIDER].store
		},
		KtTableColumns() {
			return this.KtTableStore.state._columns
		},
		KtTableHiddenColumns() {
			return this.KtTableStore.state.hiddenColumns
		},
		KtTableSortedColumns() {
			return this.KtTableStore.state.sortedColumns
		},
		KtTableFilteredColumns() {
			return this.KtTableStore.state.filteredColumns
		},
	},
	methods: {
		KtTableHideColumn(column, toggle = true) {
			this.KtTableStore.commit('hide', column, toggle)
		},
		KtTableShowAllColumns() {
			this.KtTableStore.commit('showAll')
		},
	},
}
