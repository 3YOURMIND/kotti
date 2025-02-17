/* eslint-disable perfectionist/sort-object-types */
import type { CreateElement, VNode, VNodeChildren } from 'vue'

import type { Store } from './logic/types'

export namespace KottiTableLegacy {
	export namespace Column {
		export enum Align {
			CENTER = 'center',
			LEFT = 'left',
			RIGHT = 'right',
		}

		// eslint-disable-next-line @typescript-eslint/naming-convention
		export const SortOrders = {
			ASCENDING: 'ascending',
			DESCENDING: 'descending',
			NONE: null,
		} as const
		export type SortOrders = (typeof SortOrders)[keyof typeof SortOrders]

		export type SortBy =
			| (((row: Row.Props, rowIndex: number) => number | string) | string)[]
			| ((row: Row.Props, rowIndex: number) => number | string)
			| string

		export type SortOrder =
			| (typeof SortOrders)[keyof typeof SortOrders]
			| -1
			| 0
			| 1

		export type SortMethod = <T>(a: T, b: T) => number

		export interface Context {
			column: Store.StateComponents.ColumnRepresentation
			columnIndex: number
			row: Row.Props
			rowIndex: number
			value: unknown
		}

		export type Filtered = {
			prop: Props['prop']
			filter: unknown
		}

		export type Hidden = {
			prop: Props['prop']
			hidden: boolean
		}

		export type Ordered = {
			prop: Props['prop']
			order: number
		}

		export type Sorted = {
			prop: Props['prop']
			sortBy: SortBy
			sortOrder: SortOrder
		}

		export type Formatter = (
			value: Context['value'],
			row: Context['row'],
			column: Context['column'],
			columnIndex: Context['columnIndex'],
			rowIndex: Context['rowIndex'],
		) => unknown

		export type RenderCell = (h: CreateElement, data: Context) => VNodeChildren

		export type RenderHeader = (
			h: CreateElement,
			data: Pick<Context, 'column' | 'columnIndex' | 'value'>,
		) => VNodeChildren

		export type Props = {
			index?: number // Unused
			label?: string
			order?: number
			prop: string

			cellClass?: Record<string, unknown> | string[] | string
			headerCellClass?: Record<string, unknown> | string[] | string
			tdClass?: Record<string, unknown> | string[] | string
			thClass?: Record<string, unknown> | string[] | string

			align?: Align
			minWidth?: string
			maxWidth?: string
			width?: string

			hidden?: boolean

			sortBy?: SortBy
			sortMethod?: SortMethod
			sortOrder?: SortOrder
			sortOrders?: SortOrders[]
			// whether this column is sortable, string means sortOrder is remote
			sortable?: boolean | string

			default?: string
			disableRowClick?: boolean
			formatter?: Formatter
			renderCell?: RenderCell
			renderHeader?: RenderHeader
		}

		export namespace Slots {
			export type Default = Context

			export type Header = Pick<Context, 'row' | 'rowIndex' | 'value'>
		}
	}

	export namespace Consumer {
		export type Props = {
			id: string | null
		}

		export namespace Slots {
			export type Default = {
				columns: Column.Props[]
				filteredColumns: Column.Props[]
				hiddenColumns: Column.Props[]
				hideColumn: (column: Column.Props, toggle: boolean) => void
				orderBeforeColumn: (
					fromColumn: Column.Props,
					toColumn: Column.Props,
				) => void
				sortedColumns: Column.Props[]
				showAllColumns: () => void
				store: Record<string, unknown>
			}
		}
	}

	export namespace Provider {
		export type Props = KottiTableLegacy.Props
	}

	export namespace Row {
		export type Props = {
			[key: string]: unknown
		}
	}

	export type RowKey = ((row: Row.Props) => number | string) | string

	export type Props = {
		columns: Column.Props[] | null
		emptyText: string
		id: string | null
		rowKey?: ((row: Row.Props) => number | string) | string
		rows: Row.Props[]
		useColumnDragToOrder: boolean

		isInteractive: boolean
		isScrollable: boolean
		isSelectable: boolean

		remoteSort: boolean
		sortMultiple: boolean
		sortable: 'all' | boolean
		useQuickSortControl: boolean

		filteredColumns: Column.Filtered[] // Unused
		hiddenColumns: Column.Hidden[]
		orderedColumns: Column.Ordered[]
		sortedColumns: Omit<Column.Sorted, 'sortBy'>[]

		loading: boolean

		headerClass?: Record<string, unknown> | string[] | string
		tdClasses?: Record<string, unknown> | string[] | string
		thClasses?: Record<string, unknown> | string[] | string
		trClasses?: Record<string, unknown> | string[] | string

		renderActions?: (
			h: CreateElement,
			data: Pick<Column.Context, 'row' | 'rowIndex'>,
		) => VNode
		renderEmpty?: () => VNode
		renderExpand?: (
			h: CreateElement,
			data: Pick<Column.Context, 'row' | 'rowIndex'>,
		) => VNode
		renderLoading?: () => VNode

		disableRow: (data: Pick<Column.Context, 'row' | 'rowIndex'>) => boolean

		expandMultiple: boolean
		selected: Row.Props[]
	}

	export namespace Events {
		export type ActivateRow = {
			row: Row.Props
			index: number
		}

		export type CellClick = Column.Context

		export type Expand = {
			row: Row.Props
			isExpanded: boolean
		}

		export type ExpandChange = {
			expanded: Row.Props[]
		}

		export type OrderChange = {
			columns: Column.Ordered[]
		}

		export type RowBlur = {
			row: Row.Props
			index: number
		}

		export type RowClick = {
			row: Row.Props
			index: number
		}

		export type RowFocus = {
			row: Row.Props
			index: number
		}

		export type Select = {
			selection: Row.Props[]
			row: Row.Props
		}

		export type SelectAll = {
			selection: Row.Props[]
		}

		export type SelectionChange = {
			selection: Row.Props[]
		}

		export type SortChange = Column.Sorted & {
			column: Column.Props
			sortedColumns: Column.Sorted[]
		}
	}

	export namespace Slots {
		export type Actions = Pick<Column.Context, 'row' | 'rowIndex' | 'value'>

		export type Empty = undefined

		export type Expand = Pick<Column.Context, 'row' | 'rowIndex' | 'value'>

		export type Loading = undefined
	}
}

/* eslint-enable perfectionist/sort-object-types */
