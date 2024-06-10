/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Kotti } from '../../types'

export module Store {
	export module StateComponents {
		export type Column = {
			_columns: any
			_columnsArray: any
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
}
