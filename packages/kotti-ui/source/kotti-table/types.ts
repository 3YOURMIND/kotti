import { CreateElement, VNode } from 'vue'

export namespace KottiTable {
	export namespace Column {
		export enum Align {
			CENTER = 'center',
			LEFT = 'left',
			RIGHT = 'right',
		}

		export const SortOrders = {
			ASCENDING: 'ascending',
			DESCENDING: 'descending',
			NONE: null,
		} as const
		export type SortOrders = typeof SortOrders[keyof typeof SortOrders]

		export type SortBy =
			| string
			| ((row: Row.Props, rowIndex: number) => string | number)
			| (string | ((row: Row.Props, rowIndex: number) => string | number))[]

		export type SortOrder =
			| typeof SortOrders[keyof typeof SortOrders]
			| 1
			| -1
			| 0

		export interface Context {
			column: Column.Props
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

		export type Props = {
			index?: number // Unused
			label?: string
			order?: number
			prop: string

			cellClass?: string | string[] | Record<string, unknown>
			headerCellClass?: string | string[] | Record<string, unknown>
			tdClass?: string | string[] | Record<string, unknown>
			thClass?: string | string[] | Record<string, unknown>

			align?: Align
			minWidth?: string
			maxWidth?: string
			width?: string

			hidden?: boolean

			sortBy?: SortBy
			sortMethod?: ((a: unknown, b: unknown) => number) | null
			sortOrder?: SortOrder
			sortOrders?: SortOrders[]
			// whether this column is sortable, string means sortOrder is remote
			sortable?: boolean | string

			default?: string
			disableRowClick?: boolean
			formatter?: (
				value: Context['value'],
				row: Context['row'],
				column: Context['column'],
				columnIndex: Context['columnIndex'],
				rowIndex: Context['rowIndex'],
			) => unknown
			renderCell?: (h: CreateElement, data: Context) => VNode
			renderHeader?: (
				h: CreateElement,
				data: Pick<Context, 'column' | 'columnIndex' | 'value'>,
			) => VNode
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
		export type Props = KottiTable.Props
	}

	export namespace Row {
		export type Props = {
			[key: string]: unknown
		}
	}

	export type Props = {
		columns: Column.Props[] | null
		emptyText: string
		id: string | null
		rowKey?: string | ((row: Row.Props) => string | number)
		rows: Row.Props[]
		useColumnDragToOrder: boolean

		isInteractive: boolean
		isScrollable: boolean
		isSelectable: boolean

		remoteSort: boolean
		sortMultiple: boolean
		sortable: boolean | 'all'
		useQuickSortControl: boolean

		filteredColumns: Column.Filtered[] // Unused
		hiddenColumns: Column.Hidden[]
		orderedColumns: Column.Ordered[]
		sortedColumns: Column.Sorted[]

		loading: boolean

		headerClass?: string | string[] | Record<string, unknown>
		tdClasses?: string | string[] | Record<string, unknown>
		thClasses?: string | string[] | Record<string, unknown>
		trClasses?: string | string[] | Record<string, unknown>

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

		export type Empty = void

		export type Expand = Pick<Column.Context, 'row' | 'rowIndex' | 'value'>

		export type Loading = void
	}
}
