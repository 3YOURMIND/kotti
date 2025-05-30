import property from 'lodash/property.js'
import type { PropType } from 'vue'
import { computed, defineComponent, h, inject } from 'vue'

import { KT_STORE, KT_TABLE } from '../constants'
import type { Store } from '../logic/types'
import { type KottiTableLegacy } from '../types'

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TableRowCell = defineComponent({
	name: 'TableRowCell',
	props: {
		column: {
			required: true,
			type: Object as PropType<Store.StateComponents.ColumnRepresentation>,
		},
		columnIndex: {
			required: true,
			type: Number,
		},
		row: {
			required: true,
			type: Object as PropType<KottiTableLegacy.Row.Props>,
		},
		rowIndex: {
			required: true,
			type: Number,
		},
	},
	setup(props) {
		const tableState = inject(KT_TABLE)
		const tableStore = inject(KT_STORE)

		if (!tableState || !tableStore)
			throw new Error(
				'TableRowCell: Component was used without providing the right contexts',
			)

		const value = computed(() => property(props.column.prop)(props.row))
		const _tdClasses = computed(() => [
			tableState.tdClasses,
			props.column.tdClass,
		])
		const _cellClass = computed(() => [
			'kt-table-legacy__cell',
			props.column.cellClass,
		])
		const _tdStyles = computed(() => {
			const { column } = props
			return {
				// @ts-expect-error not clear where styles is coming from, will fix later
				...column.styles,
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- eslint might be correct here
				...(column.align ? { textAlign: column.align } : {}),
				...(column.width ? { width: column.width } : {}),
				...(column.maxWidth ? { maxWidth: column.maxWidth } : {}),
				...(column.minWidth ? { minWidth: column.minWidth } : {}),
			}
		})

		const cellClick = (
			$event: MouseEvent,
			data: {
				column: Store.StateComponents.ColumnRepresentation
				columnIndex: number
				row: KottiTableLegacy.Row.Props
				rowIndex: number
				value: unknown
			},
		) => {
			if (data.column.disableRowClick) {
				$event.stopPropagation()
			}
			tableState.$emit('cellClick', data)
		}

		return () =>
			h(
				'td',
				{
					class: _tdClasses,
					on: {
						click: ($event: MouseEvent) => {
							cellClick($event, {
								column: props.column,
								columnIndex: props.columnIndex,
								row: props.row,
								rowIndex: props.rowIndex,
								value: value.value,
							})
						},
					},
					style: _tdStyles.value,
				},
				[
					h(
						'div',
						{
							attrs: {
								'data-prop': props.column.prop,
							},
							class: _cellClass,
						},
						[
							props.column.renderCell(h, {
								column: props.column,
								columnIndex: props.columnIndex,
								row: props.row,
								rowIndex: props.rowIndex,
								value: value.value,
							}),
						],
					),
				],
			)
	},
})
