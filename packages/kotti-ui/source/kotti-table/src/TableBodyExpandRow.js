import { KT_TABLE, KT_STORE, KT_LAYOUT } from './constants'

export default {
	name: 'KtTableBodyExpandRow',
	props: {
		row: Object,
		rowIndex: Number,
	},
	inject: { KT_TABLE, KT_STORE, KT_LAYOUT },
	render(h) {
		const { isExpanded, row, rowIndex, colSpan, renderExpand } = this
		return (
			isExpanded && (
				<tr>
					<td colspan={colSpan} class="kt-table__expanded-cell">
						{renderExpand && renderExpand(h, { row, data: row, rowIndex })}
					</td>
				</tr>
			)
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
