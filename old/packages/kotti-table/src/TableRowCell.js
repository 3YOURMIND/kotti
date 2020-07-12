import property from 'lodash/property'

import { KT_TABLE, KT_STORE, KT_LAYOUT } from './constants'

export default {
	name: 'KtTableRowCell',
	props: {
		column: Object,
		row: Object,
		columnIndex: Number,
		rowIndex: Number,
	},
	inject: { KT_TABLE, KT_STORE, KT_LAYOUT },
	render(h) {
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
		return (
			<td
				class={_tdClasses}
				style={_tdStyles}
				onClick={($event) =>
					cellClick($event, { value, column, row, columnIndex, rowIndex })
				}
			>
				<div class={_cellClass} data-prop={column.prop}>
					{column.renderCell(h, {
						column,
						row,
						value,
						columnIndex,
						rowIndex,
					})}
				</div>
			</td>
		)
	},
	computed: {
		value() {
			return property(this.column.prop)(this.row)
		},
		_tdClasses() {
			return [this[KT_TABLE].tdClasses, this.column.tdClass]
		},
		_cellClass() {
			return ['kt-table__cell', this.column.cellClass]
		},
		_tdStyles() {
			const { column } = this
			return {
				...column.styles,
				...(column.align ? { textAlign: column.align } : {}),
				...(column.width ? { width: column.width } : {}),
				...(column.maxWidth ? { maxWidth: column.maxWidth } : {}),
			}
		},
	},
	methods: {
		cellClick($event, data) {
			if (data.column.disableRowClick) {
				$event.stopPropogation()
			}
			this[KT_TABLE].$emit('cellClick', data)
		},
	},
}
