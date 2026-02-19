import type { Table, VisibilityState } from '@tanstack/table-core'
import { inject, provide, type Ref } from 'vue'

import type { GetRowBehavior, KottiTable } from './types'

export type TableContext<
	ROW extends KottiTable.AnyRow,
	COLUMN_ID extends string,
> = Ref<{
	internal: {
		columnOrder: COLUMN_ID[]
		getColumnIndex: (columnId: COLUMN_ID) => number
		getOrdering: () => KottiTable.Ordering[]
		getRowBehavior: GetRowBehavior<ROW>
		hasDragAndDrop: boolean
		isExpandable: boolean
		selectionCount: number
		swapDraggedAndDropTarget: (
			draggedColumnId: COLUMN_ID,
			targetIndex: number,
		) => void
		table: Table<ROW>
		triggerExpand: (rowId: string) => void
		unselectAllRows: () => void
		visibleColumns: VisibilityState
	}
}>

const getTableContextKey = (id: string): string => `kt-table-${id}`

export const useProvideTableContext = <
	ROW extends KottiTable.AnyRow,
	COLUMN_ID extends string,
>(
	id: string,
	tableContext: TableContext<ROW, COLUMN_ID>,
): void => {
	provide<TableContext<ROW, COLUMN_ID>>(getTableContextKey(id), tableContext)
}

export const useTableContext = <
	ROW extends KottiTable.AnyRow,
	COLUMN_ID extends string,
>(
	id: string,
): TableContext<ROW, COLUMN_ID> => {
	const context = inject<TableContext<ROW, COLUMN_ID>>(getTableContextKey(id))

	if (!context) throw new Error(`KtTable: could not find context for “${id}”`)

	return context
}
