/* eslint-disable @typescript-eslint/no-explicit-any */
import { type PropType, defineComponent, h, inject, computed } from 'vue'
import { KT_TABLE, KT_STORE } from '../constants'

import { TableRowCell } from './TableRowCell'
import { Yoco } from '@3yourmind/yoco'

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TableRow = defineComponent({
	name: 'TableRow',
	props: {
		row: {
			required: true,
			type: Object as PropType<Record<string, unknown>>,
		},
		rowIndex: {
			required: true,
			type: Number,
		},
		rowKey: {
			required: true,
			type: [String, Number],
		},
	},
	setup(props) {
		const tableState = inject(KT_TABLE)
		const tableStore = inject(KT_STORE)

		if (!tableState || !tableStore)
			throw new Error(
				'TableRowCell: Component was used without providing the right contexts',
			)

		const hasActions = computed(() => Boolean(tableState.hasActions))
		const hasClickListener = computed(() =>
			Boolean(tableState.$listeners.rowClick),
		)
		const isDisabled = computed(() =>
			tableState.disableRow({ row: props.row, rowIndex: props.rowIndex }),
		)
		const isFocusedRow = computed(() =>
			tableStore.get('isFocusedRow', props.row),
		)
		const isExpandable = computed(() => tableState.isExpandable)
		const isExpanded = computed(() => tableStore.get('isExpanded', props.row))
		const isInteractive = computed(
			() =>
				tableState.isInteractive || Boolean(tableState.$listeners.activateRow),
		)
		const isSelectable = computed(() => tableState.isSelectable)
		const isSelectedRow = computed(() =>
			tableStore.get('isSelected', props.row),
		)

		const expandToggleIcon = computed(() =>
			isExpanded.value ? Yoco.Icon.CHEVRON_UP : Yoco.Icon.CHEVRON_DOWN,
		)
		const renderActions = computed(() => tableState._renderActions)
		const tableColumns = computed(() => tableStore.state.columns)
		const _trClasses = computed(() => {
			const classes: (string | string[] | Record<string, unknown>)[] = []

			if ((isInteractive.value || hasClickListener.value) && !isDisabled.value)
				classes.push('clickable')
			if (isSelectedRow.value) classes.push('selected')
			if (isDisabled.value) classes.push('disabled')
			if (tableState.trClasses) classes.push(tableState.trClasses)
			return classes
		})

		const handleActionsClick = ($event: MouseEvent) => {
			$event.stopPropagation()
		}
		const handleBlur = (row: unknown, index: number) => {
			if (!isInteractive.value || isDisabled.value) return

			tableStore.commit('blurRow', row)
			tableState.$emit('rowBlur', row, index)
		}
		const handleClick = (row: unknown, index: number) => {
			if (isDisabled.value) return

			tableState.$emit('rowClick', row, index)
			if (!isInteractive.value) return

			tableState.$emit('activateRow', row, index)
		}
		const handleExpand = ($event: MouseEvent, row: unknown) => {
			$event.stopPropagation()
			tableStore.commit('expandRow', row)
		}
		const handleFocus = (row: unknown, index: number) => {
			if (!isInteractive.value || isDisabled.value) return

			tableStore.commit('focusRow', row)
			tableState.$emit('rowFocus', row, index)
		}
		const handleKey = ($event: KeyboardEvent, row: unknown, index: number) => {
			if (
				$event.key !== 'Enter' ||
				!isInteractive.value ||
				isDisabled.value ||
				!isFocusedRow.value
			)
				return

			tableState.$emit('activateRow', row, index)
		}
		const handleSelect = ($event: MouseEvent, row: unknown) => {
			$event.stopPropagation()
			tableStore.commit('selectRow', row, !isSelectedRow.value)
		}

		return () =>
			h(
				'tr',
				{
					class: _trClasses.value,
					attrs: {
						'data-test': `table:element:${props.rowIndex}:${props.rowKey}`,
						tabIndex: isInteractive.value && !isDisabled.value ? 0 : false,
					},
					domProps: {
						role:
							isInteractive.value && !isDisabled.value ? 'button' : undefined,
					},
					on: {
						blur: () => {
							handleBlur(props.row, props.rowIndex)
						},
						click: () => {
							handleClick(props.row, props.rowIndex)
						},
						focus: () => {
							handleFocus(props.row, props.rowIndex)
						},
						keyup: ($event: KeyboardEvent) => {
							handleKey($event, props.row, props.rowIndex)
						},
					},
				},
				[
					isExpandable.value &&
						h(
							'td',
							{
								class: 'c-hand',
								on: {
									click: ($event: MouseEvent) => {
										handleExpand($event, props.row)
									},
								},
							},
							[
								h('div', { class: 'expand-toggle' }, [
									h('i', { class: 'yoco' }, [expandToggleIcon.value]),
								]),
							],
						),
					isSelectable.value &&
						h(
							'td',
							{
								class: 'td-selectable kt-table__checkbox-col',
								on: {
									click: ($event: MouseEvent) => {
										$event.stopPropagation()
									},
								},
							},
							[
								h(
									'div',
									{
										class: 'form-group',
									},
									[
										h('label', { class: 'form-checkbox' }, [
											h('input', {
												attrs: {
													checked: isSelectedRow.value,
													disabled: isDisabled.value,
												},
												domProps: {
													type: 'checkbox',
												},
												on: {
													click: ($event: MouseEvent) => {
														handleSelect($event, props.row)
													},
												},
											}),
											h('i', {
												class: [
													'form-icon',
													isSelectedRow.value
														? 'form-icon--is-checked'
														: undefined,
												],
												style: isDisabled.value
													? { cursor: 'not-allowed' }
													: undefined,
											}),
										]),
									],
								),
							],
						),
					...tableColumns.value.map((column: any, columnIndex: number) =>
						h(TableRowCell, {
							key: column.prop || columnIndex,
							props: {
								column,
								columnIndex,
								row: props.row,
								rowIndex: props.rowIndex,
							},
						}),
					),
					hasActions.value &&
						h(
							'td',
							{
								on: {
									click: handleActionsClick,
								},
							},
							[
								h(
									'div',
									{
										class: 'table-actions',
									},
									[
										renderActions.value(h, {
											row: props.row,
											data: props.row,
											rowIndex: props.rowIndex,
										}),
									],
								),
							],
						),
				],
			)
	},
})
