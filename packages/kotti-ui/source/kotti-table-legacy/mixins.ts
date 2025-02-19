/* eslint-disable perfectionist/sort-objects */
import { KT_STORE, KT_TABLE, KT_TABLE_STATE_PROVIDER } from './constants'

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TableColumnsStateMixin = {
	inject: {
		[KT_TABLE as symbol]: { default: false },
		[KT_STORE as symbol]: { default: false },
		[KT_TABLE_STATE_PROVIDER]: {
			default: {
				get store(): void {
					throw new Error(
						'tried to capture table state without KtTableLegacy or KtTableLegacyProvider',
					)
				},
			},
		},
	},

	data(): unknown {
		return {
			KtSelectedTableId: null,
		}
	},
	computed: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		KtTableStore(): unknown {
			// @ts-expect-error `this[KT_TABLE]` seems to emulate a provide/inject pattern of sorts
			return this[KT_TABLE]
				? // @ts-expect-error `this[KT_STORE]` seems to emulate a provide/inject pattern of sorts
					this[KT_STORE]
				: // @ts-expect-error `this[KT_TABLE_STATE_PROVIDER]` seems to emulate a provide/inject pattern of sorts
					this[KT_TABLE_STATE_PROVIDER].getStore(this.KtSelectedTableId)
		},
		// eslint-disable-next-line @typescript-eslint/naming-convention
		KtTableColumns(): unknown {
			// @ts-expect-error this will be resolved correctly by vue at runtime
			return this.KtTableStore.state._columnsArray
		},
		// eslint-disable-next-line @typescript-eslint/naming-convention
		KtTableHiddenColumns(): unknown {
			// @ts-expect-error this will be resolved correctly by vue at runtime
			return this.KtTableStore.state.hiddenColumns
		},
		// eslint-disable-next-line @typescript-eslint/naming-convention
		KtTableSortedColumns(): unknown {
			// @ts-expect-error this will be resolved correctly by vue at runtime
			return this.KtTableStore.state.sortedColumns
		},
		// eslint-disable-next-line @typescript-eslint/naming-convention
		KtTableFilteredColumns(): unknown {
			// @ts-expect-error this will be resolved correctly by vue at runtime
			return this.KtTableStore.state.filteredColumns
		},
	},
	methods: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		KtTableHideColumn(column: unknown, toggle = true): void {
			// @ts-expect-error this will be resolved correctly by vue at runtime
			this.KtTableStore.commit('hide', column, toggle)
		},
		// eslint-disable-next-line @typescript-eslint/naming-convention
		KtTableShowAllColumns(): void {
			// @ts-expect-error this will be resolved correctly by vue at runtime
			this.KtTableStore.commit('showAll')
		},
		// eslint-disable-next-line @typescript-eslint/naming-convention
		KtTableOrderBeforeColumn(fromColumn: unknown, toColumn: unknown): void {
			// @ts-expect-error this will be resolved correctly by vue at runtime
			this.KtTableStore.commit('orderBefore', fromColumn, toColumn)
		},
	},
}
/* eslint-enable perfectionist/sort-objects */
