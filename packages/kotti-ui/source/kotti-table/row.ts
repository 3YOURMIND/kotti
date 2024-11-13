import type { Row } from '@tanstack/table-core'

import type { AnyRow, GetRowBehavior } from './types'

type RowBehavior = ReturnType<GetRowBehavior<AnyRow>>

type RowCellWrapper = {
	component: string
	on?: Record<string, unknown>
	props?: Record<string, unknown>
}

export const DEFAULT_CELL_WRAPPER: RowCellWrapper = {
	component: 'div',
}

const getCellWrapComponent = (
	clickBehavior: RowBehavior['click'],
	row: Row<AnyRow>,
): RowCellWrapper => {
	if (!clickBehavior) return DEFAULT_CELL_WRAPPER

	if (clickBehavior === 'expand')
		return {
			component: 'div',
			on: {
				click: () => {
					row.toggleExpanded()
				},
			},
		}

	if (clickBehavior.component === null)
		return {
			component: 'div',
			on: {
				click: () => {
					void clickBehavior.onClick()
				},
			},
		}

	return clickBehavior
}

export const resolveRowBehavior = (
	getRowBehavior: GetRowBehavior<AnyRow>,
	row: Row<AnyRow>,
): {
	classes?: string[]
	wrapComponent: RowCellWrapper
} => {
	const behavior = getRowBehavior({ row: row.original, rowIndex: row.index })

	const wrapComponent = getCellWrapComponent(behavior.click, row)

	return {
		classes: behavior.classes,
		wrapComponent,
	}
}
