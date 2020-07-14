import { KT_TABLE, KT_STORE, KT_LAYOUT } from './constants'

export default {
	name: 'KtTableBodyLoadingRow',
	inject: { KT_TABLE, KT_STORE, KT_LAYOUT },
	render(h) {
		const { colSpan, render } = this
		return (
			<tr>
				<td colspan={colSpan} class="kt-table__loader">
					{render(h)}
				</td>
			</tr>
		)
	},
	computed: {
		colSpan() {
			return this[KT_TABLE].colSpan
		},
		render() {
			return this[KT_TABLE]._renderLoading
		},
	},
}
