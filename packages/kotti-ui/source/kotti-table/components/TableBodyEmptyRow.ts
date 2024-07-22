import { computed, defineComponent, h, inject } from 'vue'
import { KT_TABLE } from '../constants'

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TableBodyEmptyRow = defineComponent({
	name: 'TableBodyEmptyRow',
	setup() {
		const tableState = inject(KT_TABLE)

		if (!tableState)
			throw new Error(
				'TableRowCell: Component was used without providing the right contexts',
			)

		const colSpan = computed(() => tableState.colSpan)
		const render = computed(() => tableState._renderEmpty)

		return () =>
			h('tr', {}, [
				h(
					'td',
					{
						domProps: { colSpan: colSpan.value },
						class: 'kt-table__no-row',
					},
					[h('span', { class: 'kt-table__empty-text' }, [render.value(h)])],
				),
			])
	},
})
