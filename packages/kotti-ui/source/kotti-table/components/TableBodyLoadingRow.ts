/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CreateElement } from 'vue'
import { KT_TABLE, KT_STORE, KT_LAYOUT } from '../constants'

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TableBodyLoadingRow: any = {
	name: 'TableBodyLoadingRow',
	inject: { KT_TABLE, KT_STORE, KT_LAYOUT },
	computed: {
		colSpan(): unknown {
			// @ts-expect-error `this[KT_TABLE]` seems to emulate a provide/inject pattern of sorts
			return this[KT_TABLE].colSpan
		},
		render(): unknown {
			// @ts-expect-error `this[KT_TABLE]` seems to emulate a provide/inject pattern of sorts
			return this[KT_TABLE]._renderLoading
		},
	},
	render(h: CreateElement) {
		const { colSpan, render } = this

		return h('tr', {}, [
			h('td', { domProps: { colSpan }, class: 'kt-table__loader' }, [
				render(h),
			]),
		])
	},
}
