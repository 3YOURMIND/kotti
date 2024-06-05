/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CreateElement, VNode } from 'vue'
import { KT_TABLE, KT_STORE, KT_LAYOUT } from '../constants'

export const TableBodyExpandRow: any = {
	name: 'TableBodyExpandRow',
	props: {
		row: Object,
		rowIndex: Number,
	},
	inject: { KT_TABLE, KT_STORE, KT_LAYOUT },
	render(h: CreateElement): VNode {
		const { isExpanded, row, rowIndex, colSpan, renderExpand } = this
		return (
			isExpanded &&
			h('tr', {}, [
				h(
					'td',
					{
						domProps: {
							colSpan,
						},
						class: 'kt-table__expanded-cell',
					},
					[renderExpand?.(h, { row, data: row, rowIndex })],
				),
			])
		)
	},
	computed: {
		colSpan(): unknown {
			// @ts-expect-error `this[KT_TABLE]` seems to emulate a provide/inject pattern of sorts
			return this[KT_TABLE].colSpan
		},
		isExpanded(): unknown {
			// @ts-expect-error `this[KT_STORE]` seems to emulate a provide/inject pattern of sorts
			return this[KT_STORE].get('isExpanded', this.row)
		},
		renderExpand(): unknown {
			// @ts-expect-error `this[KT_TABLE]` seems to emulate a provide/inject pattern of sorts
			return this[KT_TABLE]._renderExpand
		},
	},
}
