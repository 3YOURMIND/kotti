import TableCell from './TableRowCell'
import { KT_TABLE, KT_STORE, KT_LAYOUT } from './constants'

export default {
	name: 'KtTableRow',
	props: {
		rowIndex: Number,
		row: Object,
	},
	inject: { KT_TABLE, KT_STORE, KT_LAYOUT },
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
		return (
			<tr
				class={_trClasses}
				role={isInteractive && !isDisabled ? 'button' : false}
				tabindex={isInteractive && !isDisabled ? 0 : false}
				onClick={$event => handleClick($event, row, rowIndex)}
				onFocus={$event => handleFocus($event, row, rowIndex)}
				onBlur={$event => handleBlur($event, row, rowIndex)}
				onKeyup={$event => handleKey($event, row, rowIndex)}
			>
				{isExpandable && (
					<td
						class="c-hand"
						onClick={$event => handleExpand($event, row, rowIndex)}
					>
						<div class="toggle">
							<i class="yoco">{expandToggleIcon}</i>
						</div>
					</td>
				)}
				{isSelectable && (
					<td
						class="td-selectable kt-table__checkbox-col"
						onClick={$event => $event.stopPropagation()}
					>
						<div class="form-group">
							<label class="form-checkbox">
								<input
									disabled={isDisabled}
									type="checkbox"
									checked={isSelected}
									onChange={$event => handleSelect($event, row)}
								/>
								<i
									style={isDisabled ? { cursor: 'not-allowed' } : {}}
									class="form-icon"
								/>
							</label>
						</div>
					</td>
				)}
				{tableColumns.map((column, columnIndex) => (
					<TableCell
						key={column.prop || columnIndex}
						column={column}
						row={row}
						rowIndex={rowIndex}
						columnIndex={columnIndex}
					/>
				))}
				{hasActions && (
					<td onClick={handleActionsClick}>
						<div class="table-actions">
							{renderActions(h, { row, data: row, rowIndex })}
						</div>
					</td>
				)}
			</tr>
		)
	},

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
}
