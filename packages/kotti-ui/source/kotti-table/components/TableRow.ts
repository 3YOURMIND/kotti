/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CreateElement } from 'vue'
import { KT_TABLE, KT_STORE, KT_LAYOUT } from '../constants'

import { TableRowCell } from './TableRowCell'

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TableRow: any = {
	name: 'TableRow',
	props: {
		rowIndex: Number,
		row: Object,
	},
	inject: { KT_TABLE, KT_STORE, KT_LAYOUT },
	computed: {
		_trClasses(): string[] {
			const classes = []

			// @ts-expect-error isInteractive and hasClickListener will exist at runtime
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if ((this.isInteractive || this.hasClickListener) && !this.isDisabled)
				classes.push('clickable')
			// @ts-expect-error isSelected will exist at runtime
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (this.isSelected) classes.push('selected')
			// @ts-expect-error isDisabled will exist at runtime
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (this.isDisabled) classes.push('disabled')
			// @ts-expect-error `this[KT_TABLE]` seems to emulate a provide/inject pattern of sorts
			if (this[KT_TABLE].trClasses) classes.push(this[KT_TABLE].trClasses)

			return classes
		},
		isExpanded(): unknown {
			// @ts-expect-error `this[KT_STORE]` seems to emulate a provide/inject pattern of sorts
			return this[KT_STORE].get('isExpanded', this.row)
		},
		expandToggleIcon(): 'chevron_down' | 'chevron_right' {
			// @ts-expect-error isExpanded will exist at runtime
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			return this.isExpanded ? 'chevron_down' : 'chevron_right'
		},
		hasClickListener(): boolean {
			// @ts-expect-error `this[KT_TABLE]` seems to emulate a provide/inject pattern of sorts
			return Boolean(this[KT_TABLE].$listeners.rowClick)
		},
		isInteractive(): boolean {
			return (
				// @ts-expect-error `this[KT_TABLE]` seems to emulate a provide/inject pattern of sorts
				this[KT_TABLE].isInteractive ||
				// @ts-expect-error `this[KT_TABLE]` seems to emulate a provide/inject pattern of sorts
				Boolean(this[KT_TABLE].$listeners.activateRow)
			)
		},
		isSelectable(): unknown {
			// @ts-expect-error `this[KT_TABLE]` seems to emulate a provide/inject pattern of sorts
			return this[KT_TABLE].isSelectable
		},
		selection(): unknown {
			// @ts-expect-error `this[KT_STORE]` seems to emulate a provide/inject pattern of sorts
			return this[KT_STORE].state.selection
		},
		tableColumns(): unknown {
			// @ts-expect-error `this[KT_STORE]` seems to emulate a provide/inject pattern of sorts
			return this[KT_STORE].state.columns
		},
		isExpandable(): unknown {
			// @ts-expect-error `this[KT_TABLE]` seems to emulate a provide/inject pattern of sorts
			return this[KT_TABLE].isExpandable
		},
		hasActions(): unknown {
			// @ts-expect-error `this[KT_TABLE]` seems to emulate a provide/inject pattern of sorts
			return this[KT_TABLE].hasActions
		},
		renderActions(): unknown {
			// @ts-expect-error `this[KT_TABLE]` seems to emulate a provide/inject pattern of sorts
			return this[KT_TABLE]._renderActions
		},
		isDisabled(): unknown {
			// @ts-expect-error `this[KT_TABLE]` seems to emulate a provide/inject pattern of sorts
			return this[KT_TABLE].disableRow({
				// @ts-expect-error row will exist at runtime
				row: this.row,
				// @ts-expect-error rowIndex will exist at runtime
				rowIndex: this.rowIndex,
			})
		},
		isSelected(): unknown {
			// @ts-expect-error `this[KT_STORE]` seems to emulate a provide/inject pattern of sorts
			return this[KT_STORE].get('isSelected', this.row)
		},
		isFocused(): unknown {
			// @ts-expect-error `this[KT_STORE]` seems to emulate a provide/inject pattern of sorts
			return this[KT_STORE].get('isFocusedRow', this.row)
		},
	},
	methods: {
		handleSelect($event: InputEvent, row: unknown): void {
			$event.stopPropagation()
			// @ts-expect-error `this[KT_STORE]` seems to emulate a provide/inject pattern of sorts
			this[KT_STORE].commit(
				'selectRow',
				row,
				($event.target as HTMLInputElement).checked,
			)
		},
		handleExpand($event: MouseEvent, row: unknown): void {
			$event.stopPropagation()
			// @ts-expect-error `this[KT_STORE]` seems to emulate a provide/inject pattern of sorts
			this[KT_STORE].commit('expandRow', row)
		},
		handleActionsClick($event: MouseEvent): void {
			$event.stopPropagation()
		},
		handleClick(_$event: MouseEvent, row: unknown, index: unknown): void {
			// @ts-expect-error isDisabled will exist at runtime
			if (!this.isDisabled) {
				// @ts-expect-error `this[KT_TABLE]` seems to emulate a provide/inject pattern of sorts
				this[KT_TABLE].$emit('rowClick', row, index)
				// @ts-expect-error isInteractive will exist at runtime
				if (this.isInteractive) {
					// @ts-expect-error `this[KT_TABLE]` seems to emulate a provide/inject pattern of sorts
					this[KT_TABLE].$emit('activateRow', row, index)
				}
			}
		},
		handleFocus(_$event: FocusEvent, row: unknown, index: unknown): void {
			// @ts-expect-error isInteractive and isDisabled will exist at runtime
			if (this.isInteractive && !this.isDisabled) {
				// @ts-expect-error `this[KT_STORE]` seems to emulate a provide/inject pattern of sorts
				this[KT_STORE].commit('focuseRow', row)
				// @ts-expect-error `this[KT_TABLE]` seems to emulate a provide/inject pattern of sorts
				this[KT_TABLE].$emit('rowFocus', row, index)
			}
		},
		handleKey($event: KeyboardEvent, row: unknown, index: unknown): void {
			if (
				$event.key === 'Enter' &&
				// @ts-expect-error isInteractive will exist at runtime
				this.isInteractive &&
				// @ts-expect-error isDisabled will exist at runtime
				!this.isDisabled &&
				// @ts-expect-error isFocused will exist at runtime
				this.isFocused
			) {
				// @ts-expect-error `this[KT_TABLE]` seems to emulate a provide/inject pattern of sorts
				this[KT_TABLE].$emit('activateRow', row, index)
			}
		},
		handleBlur(_$event: FocusEvent, row: unknown, index: unknown): void {
			// @ts-expect-error isInteractive and isDisabled will exist at runtime
			if (this.isInteractive && !this.isDisabled) {
				// @ts-expect-error `this[KT_STORE]` seems to emulate a provide/inject pattern of sorts
				this[KT_STORE].commit('blurRow', row)
				// @ts-expect-error `this[KT_TABLE]` seems to emulate a provide/inject pattern of sorts
				this[KT_TABLE].$emit('rowBlur', row, index)
			}
		},
	},
	render(h: CreateElement) {
		const {
			row,
			rowIndex,
			isExpandable,
			expandToggleIcon,
			isInteractive,
			_trClasses,
			isSelectable,
			isSelected,
			tableColumns,
			handleSelect,
			handleClick,
			handleFocus,
			handleBlur,
			handleKey,
			handleExpand,
			handleActionsClick,
			hasActions,
			renderActions,
			isDisabled,
		} = this
		return h(
			'tr',
			{
				class: _trClasses,
				domProps: {
					role: isInteractive && !isDisabled ? 'button' : false,
					tabIndex: isInteractive && !isDisabled ? 0 : false,
				},
				on: {
					click: ($event: MouseEvent) => handleClick($event, row, rowIndex),
					focus: ($event: FocusEvent) => handleFocus($event, row, rowIndex),
					blur: ($event: FocusEvent) => handleBlur($event, row, rowIndex),
					keyup: ($event: KeyboardEvent) => handleKey($event, row, rowIndex),
				},
			},
			[
				isExpandable &&
					h(
						'td',
						{
							class: 'c-hand',
							on: {
								click: ($event: MouseEvent) =>
									handleExpand($event, row, rowIndex),
							},
						},
						[
							h('div', { class: 'expand-toggle' }, [
								h('i', { class: 'yoco' }, [expandToggleIcon]),
							]),
						],
					),
				isSelectable &&
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
											domProps: {
												checked: isSelected,
												disabled: isDisabled,
												type: 'checkbox',
											},
											on: {
												change: ($event: InputEvent) =>
													handleSelect($event, row),
											},
										}),
										h('i', {
											class: 'form-icon',
											style: isDisabled ? { cursor: 'not-allowed' } : undefined,
										}),
									]),
								],
							),
						],
					),
				...tableColumns.map((column: any, columnIndex: number) =>
					h(TableRowCell, {
						key: column.prop || columnIndex,
						props: {
							column,
							columnIndex,
							row,
							rowIndex,
						},
					}),
				),
				hasActions &&
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
								[renderActions(h, { row, data: row, rowIndex })],
							),
						],
					),
			],
		)
	},
}
