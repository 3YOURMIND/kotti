/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CreateElement, VNode } from 'vue'
import { KT_TABLE, KT_STORE, KT_LAYOUT } from '../constants'

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TableBodyEmptyRow: any = {
	name: 'TableBodyEmptyRow',
	inject: { KT_TABLE, KT_STORE, KT_LAYOUT },
	render(h: CreateElement): VNode {
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
		colSpan(): unknown {
			// @ts-expect-error `this[KT_TABLE]` seems to emulate a provide/inject pattern of sorts
			return this[KT_TABLE].colSpan
		},
		render(): unknown {
			// @ts-expect-error `this[KT_TABLE]` seems to emulate a provide/inject pattern of sorts
			return this[KT_TABLE]._renderEmpty
		},
	},
}
