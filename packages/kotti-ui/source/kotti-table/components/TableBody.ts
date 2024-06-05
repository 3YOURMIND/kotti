/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CreateElement } from 'vue'
import { KT_TABLE, KT_STORE, KT_LAYOUT } from '../constants'

import { TableBodyEmptyRow } from './TableBodyEmptyRow'
import { TableBodyExpandRow } from './TableBodyExpandRow'
import { TableBodyLoadingRow } from './TableBodyLoadingRow'
import { TableRow } from './TableRow'

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TableBody: any = {
	name: 'TableBody',
	components: { TableRow },
	inject: { KT_TABLE, KT_STORE, KT_LAYOUT },
	computed: {
		rows(): unknown {
			// @ts-expect-error `this[KT_TABLE]` seems to emulate a provide/inject pattern of sorts
			return this[KT_STORE].state.rows
		},
		loading(): unknown {
			// @ts-expect-error `this[KT_TABLE]` seems to emulate a provide/inject pattern of sorts
			return this[KT_TABLE].loading
		},
		showEmptyText(): unknown {
			return this.rows.length === 0 && !this.loading
		},
		isExpandable(): unknown {
			// @ts-expect-error `this[KT_TABLE]` seems to emulate a provide/inject pattern of sorts
			return this[KT_TABLE].isExpandable
		},
	},
	methods: {
		getRowKey(row: unknown): unknown {
			// @ts-expect-error `this[KT_STORE]` seems to emulate a provide/inject pattern of sorts
			return this[KT_STORE].get('getRowKey', row)
		},
	},
	render(h: CreateElement) {
		const { showEmptyText, loading, rows, isExpandable, getRowKey } = this
		return h('tbody', {}, [
			showEmptyText && h(TableBodyEmptyRow),
			...(loading
				? [h(TableBodyLoadingRow)]
				: rows.flatMap((row: any, rowIndex: number) => {
						const key = getRowKey(row) || rowIndex

						return [
							h(TableRow, {
								domProps: {
									// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
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
									// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
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
