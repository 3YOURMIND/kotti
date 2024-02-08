import { KT_TABLE, KT_STORE, KT_LAYOUT } from '../constants'

export const TableBodyEmptyRow = {
	name: 'TableBodyEmptyRow',
	inject: { KT_TABLE, KT_STORE, KT_LAYOUT },
	render(h) {
		const { colSpan, render } = this
		return h('tr', {}, [
			h(
				'td',
				{
					domProps: { colSpan },
					class: 'kt-table__no-row',
				},
				[h('span', { class: 'kt-table__empty-text' }, [render(h)])],
			),
		])
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
