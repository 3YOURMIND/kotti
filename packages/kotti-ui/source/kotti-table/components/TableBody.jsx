import { KT_TABLE, KT_STORE, KT_LAYOUT } from '../constants'

import { TableBodyEmptyRow } from './TableBodyEmptyRow.jsx'
import { TableBodyExpandRow } from './TableBodyExpandRow.jsx'
import { TableBodyLoadingRow } from './TableBodyLoadingRow.jsx'
import { TableRow } from './TableRow.jsx'

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
	render() {
		const { showEmptyText, loading, rows, isExpandable, getRowKey } = this

		return (
			<tbody>
				{showEmptyText && <TableBodyEmptyRow />}
				{!loading &&
					rows.map((row, rowIndex) => {
						const key = getRowKey(row) || rowIndex

						return [
							<TableRow
								key={key}
								row={row}
								rowIndex={rowIndex}
								data-test={`table:element:${row.number}:${row.title}`}
							/>,
							isExpandable && (
								<TableBodyExpandRow
									key={`${key}-expansion`}
									row={row}
									rowIndex={rowIndex}
								/>
							),
						]
					})}
				{loading && <TableBodyLoadingRow />}
			</tbody>
		)
	},
}
