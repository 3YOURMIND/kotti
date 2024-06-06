/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Kotti } from '../../types'
import type { TableStore } from './store'

export module Store {
	export module StateComponents {
		export type Column = {
			_columns: any
			_columnsArray: any[]
			_destroyedColumns: Record<string, number>
			columns: any
			refreshColumnArray: boolean
		}

		export type Disable = {
			enabledRows: any
			isAllRowsDisabled: boolean
		}

		export type Expand = {
			expanded: any
			expandMultiple: boolean
		}

		export type Filter = {
			filteredColumns: any
		}

		export type Hide = {
			hiddenColumns: any
		}

		export type Order = {
			orderedColumns: any
		}

		export type Row = {
			_data: any
			filteredData: any
			focusedRow: any
			rows: any
		}

		export type Select = {
			isAllSelected: boolean
			reserveSelection: boolean
			selection: any
		}

		export type Sort = {
			remoteSort: boolean
			sortable: boolean | string
			sortedColumns: any
			sortMultiple: boolean
		}
	}

	export type State = StateComponents.Column &
		StateComponents.Disable &
		StateComponents.Expand &
		StateComponents.Filter &
		StateComponents.Hide &
		StateComponents.Order &
		StateComponents.Row &
		StateComponents.Select &
		StateComponents.Sort & {
			/**
			 * This is passed to state exclusively via `setInitialState` and thus is not defined
			 * in any of the above objects.
			 *
			 * Note: rowKey is right now not a required prop of KtTable, but from what I can see
			 * the store either depends on its existence or at least has better performance if
			 * it exists.
			 *
			 * TODO: investigate if rowKey should be a required prop.
			 */
			rowKey?: Kotti.Table.RowKey
		}

	export module MutationComponents {
		export type Column = {
			insertColumn(
				this: TableStore,
				store: TableStore,
				payload: { column: any; index?: number },
			): void
			removeColumn(this: TableStore, store: TableStore, column: any): void
			setColumns(this: TableStore, store: TableStore, columns: any): void
			updateColumns(
				this: TableStore,
				store: TableStore,
				config?: {
					emitChange?: boolean
					refreshColumnArray?: boolean
				},
			): void
		}
		export type Disable = {
			updateDisabledRows(this: TableStore, store: TableStore): void
		}
		export type Expand = {
			expandRow(
				this: TableStore,
				store: TableStore,
				row: State['expanded'][number],
			): void
		}
		export type Filter = {
			setFilteredColumns(
				this: TableStore,
				store: TableStore,
				columns: any,
			): void
		}
		export type Hide = {
			hide(
				this: TableStore,
				store: TableStore,
				column: State['hiddenColumns'][number],
				hide: boolean,
			): void
			setHiddenColumns(this: TableStore, store: TableStore, columns: any): void
			showAll(this: TableStore, store: TableStore): void
		}
		export type Order = {
			orderBefore(
				this: TableStore,
				store: TableStore,
				fromColumn: State['_columnsArray'][number],
				toColumn: any,
			): void
			setOrderedColumns(this: TableStore, store: TableStore, columns: any): void
		}
		export type Row = {
			blurRow(this: TableStore, store: TableStore): void
			focusRow(
				this: TableStore,
				store: TableStore,
				row: State['focusedRow'],
			): void
			setRows(this: TableStore, store: TableStore, data: State['_data']): void
		}
		export type Select = {
			selectRow(
				this: TableStore,
				store: TableStore,
				row: State['selection'][number],
				selected?: boolean,
			): void
			setSelected(
				this: TableStore,
				store: TableStore,
				selection: State['selection'],
			): void
			toggleAllSelection(this: TableStore, store: TableStore): void
		}
		export type Sort = {
			changeSortConditions(
				this: TableStore,
				store: TableStore,
				options: {
					column: any
					silent?: boolean
				},
			): void
			removeSortedColumn(this: TableStore, store: TableStore, column: any): void
			setSortedColumns(this: TableStore, store: TableStore, columns: any): void
			sort(
				this: TableStore,
				store: TableStore,
				options: {
					column: any
					order: any
				},
			): void
		}
	}

	export type Mutations = MutationComponents.Column &
		MutationComponents.Disable &
		MutationComponents.Expand &
		MutationComponents.Filter &
		MutationComponents.Hide &
		MutationComponents.Order &
		MutationComponents.Row &
		MutationComponents.Select &
		MutationComponents.Sort

	export type MutationParameters<K extends keyof Mutations> =
		Mutations[K] extends (
			this: TableStore,
			store: TableStore,
			...args: infer P
		) => void
			? P
			: never
}
