import { KT_TABLE, KT_STORE, KT_LAYOUT } from '../constants'

import { TableBodyEmptyRow } from './TableBodyEmptyRow'
import { TableBodyExpandRow } from './TableBodyExpandRow'
import { TableBodyLoadingRow } from './TableBodyLoadingRow'
import { TableRow } from './TableRow'

export const TableBody = {
	name: 'TableBody',
	components: { TableRow },
	inject: { KT_TABLE, KT_STORE, KT_LAYOUT },
	computed: {
		rows() {
			return this[KT_STORE].state.rows
		},
		loading() {
			return this[KT_TABLE].loading
		},
		showEmptyText() {
			return this.rows.length === 0 && !this.loading
		},
		isExpandable() {
			return this[KT_TABLE].isExpandable
		},
	},
	methods: {
		getRowKey(row) {
			return this[KT_STORE].get('getRowKey', row)
		},
	},
	render(h) {
		const { showEmptyText, loading, rows, isExpandable, getRowKey } = this
		return h('tbody', {}, [
			showEmptyText && h(TableBodyEmptyRow),
			...(loading
				? [h(TableBodyLoadingRow)]
				: rows.flatMap((row, rowIndex) => {
						const key = getRowKey(row) || rowIndex

						return [
							h(TableRow, {
								domProps: {
									'data-test': `table:element:${row.number}:${row.title}`,
								},
								key,
								props: {
									row,
									rowIndex,
								},
							}),
							isExpandable &&
								h(TableBodyExpandRow, {
									key: `${key}-expansion`,
									props: {
										row,
										rowIndex,
									},
								}),
						]
					})),
		])
	},
}
