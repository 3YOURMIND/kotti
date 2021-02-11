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
		columns: Column[]
		isLoading: boolean
		isRowDisabled: (row: Row) => boolean
		renderEmpty: (() => VNode | string) | null
		rowActions: (row: Row) => Array<QuickActionButton>
		rows: Row[]
		selectedRows: Array<Row['id']>
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
