/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Kotti } from '../../types'
import type { KottiTableLegacy } from '../types'

import type { TableStore } from './store'

export namespace Store {
	export namespace StateComponents {
		export type ColumnRepresentation = Omit<
			KottiTableLegacy.Column.Props,
			'align' | 'renderCell' | 'renderHeader' | 'width'
		> & {
			_deleted: boolean
			align: KottiTableLegacy.Column.Align
			id: string
			isPropDefined: boolean
			renderCell: KottiTableLegacy.Column.RenderCell
			renderHeader: KottiTableLegacy.Column.RenderHeader
			width: string
		}

		export type Column = {
			_columns: Record<string, ColumnRepresentation>
			_columnsArray: ColumnRepresentation[]
			_destroyedColumns: Record<string, number>
			columns: ColumnRepresentation[]
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
			 * Note: rowKey is right now not a required prop of KtTableLegacy, but from what I can see
			 * the store either depends on its existence or at least has better performance if
			 * it exists.
			 */
			rowKey?: Kotti.TableLegacy.RowKey
		}

	export namespace MutationComponents {
		export type Column = {
			insertColumn(
				this: TableStore,
				store: TableStore,
				payload: {
					column: Store.StateComponents.ColumnRepresentation
					index?: number
				},
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
			blurRow(
				this: TableStore,
				store: TableStore,
				row: State['focusedRow'],
			): void
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
					column: Store.StateComponents.ColumnRepresentation
					order?: any
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

	export namespace GetterComponents {
		export type Column = Record<string, never>
		export type Disable = {
			isAllRowsDisabled(this: TableStore, state: State): boolean
		}
		export type Expand = {
			isExpanded(
				this: TableStore,
				state: State,
				row: State['expanded'][number],
			): boolean
		}
		export type Filter = Record<string, never>
		export type Hide = Record<string, never>
		export type Order = Record<string, never>
		export type Row = {
			isFocusedRow(
				this: TableStore,
				state: State,
				row: State['focusedRow'],
			): boolean
		}
		export type Select = {
			getRowByVisibleIndex(
				this: TableStore,
				state: State,
				index: number,
			): State['rows'][number]
			getRowKey(this: TableStore, state: State, row: any): number | string
			isSelected(
				this: TableStore,
				state: State,
				row: State['selection'][number],
			): boolean
		}
		export type Sort = {
			canSort(this: TableStore, state: State, column: any): boolean
			hasSortOrder(this: TableStore, state: State, column: any): boolean
			isSorted(this: TableStore, state: State, column: any): boolean
			isSortedByAsc(this: TableStore, state: State, column: any): boolean
			isSortedByDsc(this: TableStore, state: State, column: any): boolean
		}
	}

	export type Getters = GetterComponents.Disable &
		GetterComponents.Expand &
		GetterComponents.Row &
		GetterComponents.Select &
		GetterComponents.Sort

	export type GetterParameters<K extends keyof Getters> = Getters[K] extends (
		this: TableStore,
		state: State,
		...args: infer P
	) => void
		? P
		: never

	export type Emits = {
		columnsChange: [
			Pick<State['_columnsArray'][0], 'hidden' | 'order' | 'prop'>[],
		]
		expand: [any, boolean]
		expandChange: [State['expanded']]
		hiddenChange: [State['hiddenColumns']]
		orderChange: [
			// Likely can be refactored to KottiTableLegacy.Column.Ordered[]
			Pick<State['_columnsArray'][0], 'order' | 'prop'>[],
		]
		select: [State['selection'], any]
		selectAll: [State['selection']]
		selectionChange: [State['selection']]
		sortChange: [
			{
				// Likely can be refactored to KottiTableLegacy.Column.Sorted[]
				column: any
				prop: any // Likely string
				sortBy: any // Likely KottiTableLegacy.SortBy | string
				sortedColumns: Pick<
					State['sortedColumns'],
					'prop' | 'sortBy' | 'sortOrder'
				>[]
				sortOrder: any // Likely KottiTableLegacy.SortOrder
			},
		]
	}
}

/* eslint-enable @typescript-eslint/no-explicit-any */
