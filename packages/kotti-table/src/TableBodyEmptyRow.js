import { KT_TABLE, KT_STORE, KT_LAYOUT } from './constants'

export default {
	name: 'KtTableBodyEmptyRow',
	inject: { KT_TABLE, KT_STORE, KT_LAYOUT },
	render(h) {
		const { colSpan, render } = this
		return (
			<tr>
				<td class="kt-table__no-row" colspan={colSpan}>
					<span class="kt-table__empty-text">{render(h)}</span>
				</td>
			</tr>
		)
	},
	computed: {
		colSpan() {
			return this[KT_TABLE].colSpan
		},
		render() {
			return this[KT_TABLE]._renderEmpty
		},
	},
}
