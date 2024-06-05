/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { CreateElement, VNode } from 'vue'

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TableHeaderCell = {
	name: 'TableHeaderCell',
	functional: true,
	props: ['column', 'columnIndex'],
	render(h: CreateElement, context: any): VNode {
		const { column, columnIndex } = context.props
		return column.renderHeader(h, {
			column,
			value: column.label,
			columnIndex,
		})
	},
}
