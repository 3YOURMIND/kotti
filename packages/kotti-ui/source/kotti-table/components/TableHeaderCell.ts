import { defineComponent, h } from 'vue'
import type { PropType } from 'vue'
import type { KottiTable } from '../types'

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TableHeaderCell = defineComponent({
	name: 'TableHeaderCell',
	props: {
		column: {
			required: true,
			type: Object as PropType<KottiTable.Column.PropsInternal>,
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
					class: [
						'kt-table__cell',
						'kt-table__header-cell',
						props.column.headerCellClass,
					],
					attrs: {
						'data-prop': props.column.prop,
					},
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
