/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, defineComponent, h, inject } from 'vue'

import { KT_TABLE } from '../constants'

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TableBodyLoadingRow: any = defineComponent({
	name: 'TableBodyLoadingRow',
	setup() {
		const tableState = inject(KT_TABLE)

		if (!tableState)
			throw new Error(
				'TableRowCell: Component was used without providing the right contexts',
			)

		const colSpan = computed(() => tableState.colSpan)
		const render = computed(() => tableState._renderLoading)

		return () =>
			h('tr', {}, [
				h(
					'td',
					{
						attrs: { colSpan: colSpan.value },
						class: 'kt-table__loader',
					},
					[render.value(h)],
				),
			])
	},
})
