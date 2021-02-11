import { Yoco } from '@3yourmind/yoco'
import { VNode } from 'vue'

import { SpecifyRequiredProps } from '../types/utilities'

export namespace KottiTable2 {
	export enum Align {
		CENTER = 'CENTER',
		RIGHT = 'RIGHT',
		LEFT = 'LEFT',
	}

	export type Column = SpecifyRequiredProps<InternalColumn, 'key' | 'label'>

	export namespace Events {
		export type RowClick = Row

		export type UpdateColumns = InternalProps['columns']

		export type UpdateSelectedRows = InternalProps['selectedRows']

		export type UpdateOrderedColumns = Array<InternalProps['columns'][0]['key']>

		export type UpdateSort = InternalProps['sort']
	}

	export type InternalColumn = {
		align: Align
		icon: Yoco.Icon | null
		isSortable: boolean
		key: keyof Row
		label: string
		renderCell: (someContext: unknown) => VNode | string
	}

	export type InternalProps = {
		// TODO: Consider extracting ordering from columns to aid localstorage persistence
		columns: Column[]
		isLoading: boolean
		isRowDisabled: (row: Row) => boolean
		// TODO: incorporate default string in TranslationContext
		renderEmpty: (() => VNode | string) | null
		rowActions: (row: Row) => Array<QuickActionButton>
		rows: Row[]
		// Kotti will accept an array of Id's that is not always necessarily a subset of `rows` (pagination)
		selectedRows: Array<Row['id']>
		// TODO: proper name
		// this is merely for the UI of chevrons when it comes to implementation
		sort: {
			key: Column['key'] // TODO: find name that doesn’t confuse SARS
			direction: SortDirection
		}
	}

	export type Row = Record<string, unknown> & {
		id: symbol | string | number
	}

	export type Props = SpecifyRequiredProps<InternalProps, 'columns' | 'rows'>

	export type QuickActionButton = {
		icon: Yoco.Icon | null
		label: string
		onClick(): void
	}

	export enum SortDirection {
		ASCENDING = 'ASCENDING',
		DESCENDING = 'DESCENDING',
		NONE = 'NONE',
	}
	export type Translations = {
		emptyText: string
	}
}

/*
	🗑 formatter
	✅ renderCell

	🗑 renderHeader

	🗑∫ isInteractive
	✅ @rowClick
	🗑 disableRowClick // @click.stop within your renderCell return
	🗑 @rowFocus
	🗑 @rowBlur
	🗑 @cellClick
	🔨🤮 disableRow // isDisabledRow

	🗑 isSelectable // auto-detect via $listeners
	🔨🤮 @select -> update:selectedRows?!?
	🔨🤮 selected // array of selected rows
	🗑 @selectionChange //
	✅ @selectAll // important for multi-page so we know it actually means all rather than all the rows in the current page


	🔨🤮 sortable (Table / Column - boolean -- attribute on column object) --> isSortable only on column
	🗑 remoteSort (boolean flag - have to enable this boolean to allow sorting with a function; i.e. to actually emit `sortChange` kek)
	🔨🤮 @sortChange // Function that emits an object ({sortBy: thePropThatWeFeedInKek, sortOrder: thePropThatWeFeedInKek})
	🗑 useQuickSortControl // we needed a separate flag to show the arrows b/c one boolean is not enough
	🗑 sortMethod
	🔨🤮 sortBy // accepts the key from the columns structure //`sort ['key']`
	🗑 sortMultiple // drop support
	🔨🤮 sortOrder // current sort order // sort['direction']
	🗑 sortOrders // the toggle array (i.e. what happens if you click on the `sort` UI twice)
	🗑 sortedColumns // would look like [{prop, sortOrder}]

	🏞 hiddenColumns // [{prop, hidden}] // maybe in controller
	🏞 @hideChange // maybe in controller // updateColumns
	🏞 hidden // attribute on the column object // maybe in controller

	🗑 expandMultiple
	🗑 @expandChange // emits an array of booleans to represent what is expanded
	🗑 @expand // [{prop, expanded}]

	// discuss with designers -- is it better UX to have the purpose fulfilled differently
	🗑 useColumnDragToOrder
	🗑 order // array of column indices as we want to order them // updateColumns

	🗑 renderActions // never used on yoda
	🗑 slot="actions"
	🔨 rowActions: Row => Actions

	⏳⏳⏳⏳⏳⏳⏳⏳ renderExpand
	🗑 slot="expand"

	🗑 renderLoading
	🗑 slot="loading"

	🔨 renderEmpty
	🗑 slot="empty"
*/
