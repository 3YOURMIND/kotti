import { KT_TABLE, KT_STORE, KT_LAYOUT } from '../constants'

import { TableRowCell } from './TableRowCell'

export const TableRow = {
	name: 'TableRow',
	props: {
		rowIndex: Number,
		row: Object,
	},
	inject: { KT_TABLE, KT_STORE, KT_LAYOUT },
	computed: {
		_trClasses() {
			const classes = []

			if ((this.isInteractive || this.hasClickListener) && !this.isDisabled)
				classes.push('clickable')
			if (this.isSelected) classes.push('selected')
			if (this.isDisabled) classes.push('disabled')
			if (this[KT_TABLE].trClasses) classes.push(this[KT_TABLE].trClasses)

			return classes
		},
		isExpanded() {
			return this[KT_STORE].get('isExpanded', this.row)
		},
		expandToggleIcon() {
			return this.isExpanded ? 'chevron_down' : 'chevron_right'
		},
		hasClickListener() {
			return Boolean(this[KT_TABLE].$listeners['rowClick'])
		},
		isInteractive() {
			return (
				this[KT_TABLE].isInteractive ||
				Boolean(this[KT_TABLE].$listeners['activateRow'])
			)
		},
		isSelectable() {
			return this[KT_TABLE].isSelectable
		},
		selection() {
			return this[KT_STORE].state.selection
		},
		tableColumns() {
			return this[KT_STORE].state.columns
		},
		isExpandable() {
			return this[KT_TABLE].isExpandable
		},
		hasActions() {
			return this[KT_TABLE].hasActions
		},
		renderActions() {
			return this[KT_TABLE]._renderActions
		},
		isDisabled() {
			return this[KT_TABLE].disableRow({
				row: this.row,
				rowIndex: this.rowIndex,
			})
		},
		isSelected() {
			return this[KT_STORE].get('isSelected', this.row)
		},
		isFocused() {
			return this[KT_STORE].get('isFocusedRow', this.row)
		},
	},
	methods: {
		handleSelect($event, row) {
			$event.stopPropagation()
			this[KT_STORE].commit('selectRow', row, $event.target.checked)
		},
		handleExpand($event, row) {
			$event.stopPropagation()
			this[KT_STORE].commit('expandRow', row)
		},
		handleActionsClick($event) {
			$event.stopPropagation()
		},
		handleClick($event, row, index) {
			if (!this.isDisabled) {
				this[KT_TABLE].$emit('rowClick', row, index)
				if (this.isInteractive) {
					this[KT_TABLE].$emit('activateRow', row, index)
				}
			}
		},
		handleFocus($event, row, index) {
			if (this.isInteractive && !this.isDisabled) {
				this[KT_STORE].commit('focuseRow', row)
				this[KT_TABLE].$emit('rowFocus', row, index)
			}
		},
		handleKey($event, row, index) {
			if (
				$event.key === 'Enter' &&
				this.isInteractive &&
				!this.isDisabled &&
				this.isFocused
			) {
				this[KT_TABLE].$emit('activateRow', row, index)
			}
		},
		handleBlur($event, row, index) {
			if (this.isInteractive && !this.isDisabled) {
				this[KT_STORE].commit('blurRow', row)
				this[KT_TABLE].$emit('rowBlur', row, index)
			}
		},
	},
	render(h) {
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
					click: ($event) => handleClick($event, row, rowIndex),
					focus: ($event) => handleFocus($event, row, rowIndex),
					blur: ($event) => handleBlur($event, row, rowIndex),
					keyup: ($event) => handleKey($event, row, rowIndex),
				},
			},
			[
				isExpandable &&
					h(
						'td',
						{
							class: 'c-hand',
							on: {
								click: ($event) => handleExpand($event, row, rowIndex),
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
								click: ($event) => $event.stopPropagation(),
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
												change: ($event) => handleSelect($event, row),
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
				...tableColumns.map((column, columnIndex) =>
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
