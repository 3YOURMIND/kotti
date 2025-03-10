import { defineComponent, h } from 'vue'
import type { PropType } from 'vue'

import type { Store } from '../logic/types'

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TableHeaderCell = defineComponent({
	name: 'TableHeaderCell',
	props: {
		column: {
			required: true,
			type: Object as PropType<Store.StateComponents.ColumnRepresentation>,
		},
		columnIndex: {
			required: true,
			type: Number,
		},
	},
	setup(props) {
		return () =>
			h(
				'div',
				{
					attrs: {
						'data-prop': props.column.prop,
					},
					class: [
						'kt-table-legacy__cell',
						'kt-table-legacy__header-cell',
						props.column.headerCellClass,
					],
				},
				[
					props.column.renderHeader(h, {
						column: props.column,
						columnIndex: props.columnIndex,
						value: props.column.label,
					}),
				],
			)
	},
})
