import type { Row } from '@tanstack/table-core'

import type { AnyRow, GetRowBehavior } from './types'

type RowBehavior = ReturnType<GetRowBehavior<AnyRow>>

type RowCellWrapper = {
	class: string[]
	component: string
	on?: Record<string, unknown>
	props?: Record<string, unknown>
}

export const DEFAULT_CELL_WRAPPER: RowCellWrapper = {
	class: ['kt-table-cell-content'],
	component: 'div',
}

export const getCellWrapComponent = (
	behavior: RowBehavior,
	row: Row<AnyRow>,
): RowCellWrapper => {
	if (behavior.disable?.click) return DEFAULT_CELL_WRAPPER

	const { click } = behavior
	if (!click) return DEFAULT_CELL_WRAPPER

	if (click === 'expand')
		return {
			...DEFAULT_CELL_WRAPPER,
			on: {
				click: () => {
					row.toggleExpanded()
				},
			},
		}

	if (click.component === null)
		return {
			...DEFAULT_CELL_WRAPPER,
			on: {
				click: () => {
					void click.onClick()
				},
			},
		}

	return {
		...click,
		class: ['kt-table-cell-content'],
	}
}
