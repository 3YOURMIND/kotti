import type { Table, VisibilityState } from '@tanstack/table-core'
import { inject, provide, type Ref } from 'vue'

import type { GetRowBehavior, KottiTable } from './types'

export type TableContext<
	ROW extends KottiTable.AnyRow,
	COLUMN_ID extends string,
> = Ref<{
	internal: {
		getColumnIndex: (columnId: COLUMN_ID) => number
		getOrdering: () => KottiTable.Ordering[]
		getRowBehavior: GetRowBehavior<ROW>
		hasDragAndDrop: boolean
		isDragAndDropActive: boolean
		isExpandable: boolean
		selectionCount: number
		setDraggedColumnId: (columnId: COLUMN_ID | null) => void
		setDropTargetColumnIndex: (columnIndex: number | null) => void
		swapDraggedAndDropTarget: () => void
		table: Table<ROW>
		triggerExpand: (rowId: string) => void
		unselectAllRows: () => void
		unsetDroppedColumnId: () => void
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
