import type { Table } from '@tanstack/table-core'
import { inject, provide, type Ref } from 'vue'

import type { AnyRow } from './types'

export type TableContext<ROW extends AnyRow> = Ref<{
	internal: {
		hasDragAndDrop: boolean
		isExpandable: boolean
		isSelectable: boolean
		setDraggedColumnIndex: (columnId: number | null) => void
		setDropTargetColumnIndex: (columnId: number | null) => void
		swapDraggedAndDropTarget: () => void
		table: Ref<Table<ROW>>
	}
}>

const getTableContextKey = (id: string): string => `kt-table-${id}`

export const useProvideTableContext = <ROW extends AnyRow>(
	id: string,
	tableContext: TableContext<ROW>,
): void => {
	provide<TableContext<ROW>>(getTableContextKey(id), tableContext)
}

export const useTableContext = <ROW extends AnyRow>(
	id: string,
): TableContext<ROW> => {
	const context = inject<TableContext<ROW>>(getTableContextKey(id))

	if (!context) throw new Error(`KtTable: could not find context for “${id}”`)

	return context
}
