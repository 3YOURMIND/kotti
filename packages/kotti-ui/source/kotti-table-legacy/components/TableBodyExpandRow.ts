import { computed, defineComponent, h, inject, type PropType } from 'vue'

import { KT_STORE, KT_TABLE } from '../constants'
import type { KottiTableLegacy } from '../types'

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TableBodyExpandRow = defineComponent({
	name: 'TableBodyExpandRow',
	props: {
		row: {
			type: Object as PropType<KottiTableLegacy.Row.Props>,
			required: true,
		},
		rowIndex: {
			type: Number,
			required: true,
		},
	},
	setup(props) {
		const tableState = inject(KT_TABLE)
		const tableStore = inject(KT_STORE)

		if (!tableState || !tableStore)
			throw new Error(
				'TableRowCell: Component was used without providing the right contexts',
			)

		const colSpan = computed(() => tableState.colSpan)
		const isExpanded = computed(() => tableStore.get('isExpanded', props.row))
		const render = computed(() => tableState._renderExpand)

		return () =>
			isExpanded.value &&
			h('tr', {}, [
				h(
					'td',
					{
						attrs: { colSpan: colSpan.value },
						class: 'kt-table__expanded-cell',
					},
					[
						render.value(h, {
							data: props.row,
							row: props.row,
							rowIndex: props.rowIndex,
						}),
					],
				),
			])
	},
})
