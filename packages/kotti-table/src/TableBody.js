import { KT_TABLE, KT_STORE, KT_LAYOUT } from './constants'
import TableRow from './TableRow'
import TableBodyEmptyRow from './TableBodyEmptyRow'
import TableBodyExpandRow from './TableBodyExpandRow'
import TableBodyLoadingRow from './TableBodyLoadingRow'

export default {
	components: { TableRow },
	name: 'KtTableBody',
	inject: { KT_TABLE, KT_STORE, KT_LAYOUT },
	render() {
		const { showEmptyText, loading, rows, isExpandable, getRowKey } = this
		return (
			<tbody>
				{showEmptyText && <TableBodyEmptyRow />}
				{!loading &&
					rows.map((row, rowIndex) => [
						<TableRow
							key={getRowKey(row) || rowIndex}
							row={row}
							rowIndex={rowIndex}
							data-test={`table:element:${row.number}:${rowIndex}`}
						/>,
						isExpandable && (
							<TableBodyExpandRow
								key={`${getRowKey(row) || rowIndex}-expansion`}
								row={row}
								rowIndex={rowIndex}
							/>
						),
					])}
				{loading && <TableBodyLoadingRow />}
			</tbody>
		)
	},
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
}
