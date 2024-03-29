import { KT_TABLE, KT_STORE, KT_LAYOUT } from '../constants'

export const TableBodyExpandRow = {
	name: 'TableBodyExpandRow',
	props: {
		row: Object,
		rowIndex: Number,
	},
	inject: { KT_TABLE, KT_STORE, KT_LAYOUT },
	render(h) {
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
					[renderExpand && renderExpand(h, { row, data: row, rowIndex })],
				),
			])
		)
	},
	computed: {
		colSpan() {
			return this[KT_TABLE].colSpan
		},
		isExpanded() {
			return this[KT_STORE].get('isExpanded', this.row)
		},
		renderExpand() {
			return this[KT_TABLE]._renderExpand
		},
	},
}
