import type { Column } from '@tanstack/table-core'

import type { GetRowBehavior, KottiTable } from './types'

type RowBehavior = ReturnType<GetRowBehavior<KottiTable.AnyRow>>

type RowCellWrapper = {
	class: string[]
	component: string
	on?: Record<string, unknown>
	props?: Record<string, unknown>
}

const getCellWrapper = (onClick?: () => void) => {
	return {
		class: ['kt-table-cell-content'],
		component: 'div',
		on: onClick
			? {
					click: onClick,
				}
			: undefined,
	}
}

export const getCellWrapComponent = ({
	behavior,
	column,
	triggerExpand,
}: {
	behavior: RowBehavior
	column: Column<KottiTable.AnyRow>
	triggerExpand: (rowId: string) => void
}): RowCellWrapper => {
	if (column.columnDef.meta.disableCellClick) {
		return {
			class: [
				'kt-table-cell-content',
				'kt-table-cell-content--is-click-disabled',
			],
			component: 'div',
		}
	}

	const { click, disable, id: rowId } = behavior

	if (disable?.click || !click) return getCellWrapper()

	if (click === 'expand')
		return getCellWrapper(() => {
			triggerExpand(rowId)
		})

	if (click.component === null)
		return getCellWrapper(() => {
			void click.onClick()
		})

	return {
		...click,
		class: ['kt-table-cell-content'],
		on: {},
	}
}
