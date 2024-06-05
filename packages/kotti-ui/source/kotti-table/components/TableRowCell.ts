/* eslint-disable @typescript-eslint/no-explicit-any */
import property from 'lodash/property'

import { KT_TABLE, KT_STORE, KT_LAYOUT } from '../constants'
import type { CreateElement } from 'vue'

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TableRowCell: any = {
	name: 'TableRowCell',
	props: {
		column: Object,
		row: Object,
		columnIndex: Number,
		rowIndex: Number,
	},
	inject: { KT_TABLE, KT_STORE, KT_LAYOUT },
	computed: {
		value(): unknown {
			// @ts-expect-error column and row will exist at runtime
			return property(this.column.prop)(this.row)
		},
		_tdClasses(): [unknown, unknown] {
			// @ts-expect-error `this[KT_TABLE]` seems to emulate a provide/inject pattern of sorts
			return [this[KT_TABLE].tdClasses, this.column.tdClass]
		},
		_cellClass(): [unknown, unknown] {
			// @ts-expect-error column will exist at runtime
			return ['kt-table__cell', this.column.cellClass]
		},
		_tdStyles(): unknown {
			// @ts-expect-error column will exist at runtime
			const { column } = this
			return {
				...column.styles,
				...(column.align ? { textAlign: column.align } : {}),
				...(column.width ? { width: column.width } : {}),
				...(column.maxWidth ? { maxWidth: column.maxWidth } : {}),
				...(column.minWidth ? { minWidth: column.minWidth } : {}),
			}
		},
	},
	methods: {
		cellClick($event: MouseEvent, data: any) {
			if (data.column.disableRowClick) {
				// @ts-expect-error likely supposed to mean stopPropagation
				$event.stopPropogation()
			}
			// @ts-expect-error `this[KT_TABLE]` seems to emulate a provide/inject pattern of sorts
			this[KT_TABLE].$emit('cellClick', data)
		},
	},
	render(h: CreateElement) {
		const {
			column,
			row,
			rowIndex,
			columnIndex,
			cellClick,
			_cellClass,
			_tdClasses,
			_tdStyles,
			value,
		} = this
		return h(
			'td',
			{
				class: _tdClasses,
				on: {
					click: ($event: MouseEvent) =>
						cellClick($event, { value, column, row, columnIndex, rowIndex }),
				},
				style: _tdStyles,
			},
			[
				h(
					'div',
					{
						class: _cellClass,
						domProps: {
							'data-prop': column.prop,
						},
					},
					[
						column.renderCell(h, {
							column,
							row,
							value,
							columnIndex,
							rowIndex,
						}),
					],
				),
			],
		)
	},
}
