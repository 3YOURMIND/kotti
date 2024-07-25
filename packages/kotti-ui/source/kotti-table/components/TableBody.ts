/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, defineComponent, h, inject } from 'vue'
import { KT_TABLE, KT_STORE } from '../constants'

import { TableBodyEmptyRow } from './TableBodyEmptyRow'
import { TableBodyExpandRow } from './TableBodyExpandRow'
import { TableBodyLoadingRow } from './TableBodyLoadingRow'
import { TableRow } from './TableRow'

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TableBody = defineComponent({
	name: 'TableBody',
	components: { TableRow },
	setup() {
		const tableState = inject(KT_TABLE)
		const tableStore = inject(KT_STORE)

		if (!tableState || !tableStore)
			throw new Error(
				'TableRowCell: Component was used without providing the right contexts',
			)

		const rows = computed(() => tableStore.state.rows)
		const loading = computed(() => tableState.loading)
		const isExpandable = computed(() => tableState.isExpandable)
		const showEmptyText = computed(
			() => rows.value.length === 0 && !loading.value,
		)

		const getRowKey = (row: unknown) => tableStore.get('getRowKey', row)

		return () =>
			h('tbody', {}, [
				showEmptyText.value && h(TableBodyEmptyRow),
				...(loading.value
					? [h(TableBodyLoadingRow)]
					: rows.value.flatMap((row: any, rowIndex: number) => {
							const key = getRowKey(row) || rowIndex

							return [
								h(TableRow, {
									key,
									props: {
										row,
										rowIndex,
									},
								}),
								isExpandable.value &&
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
})
