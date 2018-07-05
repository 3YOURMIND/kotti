<template>
	<div :class="{ 'x-scroll': isScrollable }">
		<table>
			<thead>
				<tr>
					<th v-if="isExpandable" class="th-expandable" />
					<th v-if="isSelectable" class="th-selectable">
						<div class="form-group">
							<label class="form-checkbox">
								<input type="checkbox" v-model="selectedAll" />
								<i class="form-icon" />
							</label>
						</div>
					</th>
					<th
						v-for="column in columns"
						:key="column.key"
						:class="thClass(column)"
						:style="thStyle(column)"
						v-text="column.label"
					/>
					<th v-if="hasActions" class="th-actions" />
				</tr>
			</thead>
			<tbody v-if="isNotEmpty">
				<tr
					v-for="(row, index) in tableBodyData"
					:class="trClass(index)"
					:key="row.index"
					:role="isClickable ? 'button': false"
					:tabindex="isClickable ? 0 : false"
				>
					<td
						v-if="isExpandable && !row.expand"
						class="c-hand"
						@click="toggleExpandRow(index)"
					>
						<div class="toggle">
							<i class="yoco" v-if="expandRowIndex - 1 === index">
								chevron_down
							</i>
							<i class="yoco" v-else>
								chevron_right
							</i>
						</div>
					</td>

					<td v-if="!row.expand && isSelectable">
						<div class="form-group">
							<label class="form-checkbox">
								<input type="checkbox" :value="index" v-model="selectedRows" />
								<i class="form-icon" />
							</label>
						</div>
					</td>
					<td
						v-if="!row.expand"
						v-for="(value, key) in row"
						:key="value.index"
						v-text="value"
						:class="tdClass(key)"
						:style="tdStyle(key)"
					/>
					<td
						v-if="row.expand && expandRowIndex === index"
						:colspan="colSpanNumber"
					>
						<slot name="expand" :row="row" />
					</td>

					<td v-if="!row.expand && hasActions">
						<div class="table-actions">
							<slot name="actions" :row="row" />
						</div>
					</td>
				</tr>
			</tbody>
			<tbody v-else>
				<td
					class="empty"
					:colspan="colSpanNumber"
					v-text="emptyText"
				/>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	name: 'KtTable',
	props: {
		columns: { required: true, type: Array },
		emptyText: { default: 'No Data', type: String },
		hasActions: { default: false, type: Boolean },
		isClickable: { default: false, type: Boolean },
		isExpandable: { default: false, type: Boolean },
		isScrollable: { default: false, type: Boolean },
		isSelectable: { default: false, type: Boolean },
		rows: { required: true, type: Array },
		tdClasses: { default: () => [], types: [Array, String, Object] },
		thClasses: { default: () => [], types: [Array, String, Object] },
		trClasses: { default: () => [], types: [Array, String, Object] },
		value: { default: undefined, type: Array }, // @TODO WTF is this?
	},
	data() {
		return {
			expandRowIndex: Number,
			selectedAll: false,
			selectedRows: [],
		}
	},
	mounted() {
		this.selectedRows = this.value || []
	},
	computed: {
		isNotEmpty() {
			return this.rows && this.rows.length > 0
		},
		tableBodyData() {
			const data = []
			this.rows.forEach(item => {
				// @TODO is this even necessary?
				// @TODO this basically just removes all properties that aren't found in the columns
				const newItem = this.columns
					.map(column => ({
						[column.key]: item[column.key],
					}))
					.reduce((a, b) => Object.assign(a, b), {})

				data.push(newItem)
				if (this.isExpandable) data.push({ ...newItem, expand: true })
			})
			return data
		},
		colSpanNumber() {
			if (!this.columns) return 0

			let span = this.columns.length

			if (this.isExpandable) span++
			if (this.isSelectable) span++

			return span
		},
	},
	watch: {
		selectedRows(values) {
			if (!this.isSelectable) return
			const tableLength = this.isExpandable ? this.tableBodyData.length / 2 : this.tableBodyData.length
			this.selectedAll = values.length === tableLength
			this.handleSelected(values)
		},
		selectedAll(oldVal, newVal) {
			if (!this.isSelectable) return

			const _tableLength = this.isExpandable ? this.tableBodyData.length / 2 : this.tableBodyData.length

			if (!oldVal && newVal && this.selectedRows.length === _tableLength) this.selectedRows = []

			if (!newVal) {
				if (!this.selectedRows) return
				if (this.selectedRows.length !== _tableLength) {
					const _selectedRows = []

					for (let i = 0; i < _tableLength; i++) _selectedRows.push(this.isExpandable ? i * 2 : i)

					this.selectedRows = _selectedRows
				}
				return
			}
		},
	},
	methods: {
		handleSelected() {
			this.$emit('input', this.selectedRows.map(index => (this.isExpandable ? index : index / 2)))
		},
		onClickRow(row) {
			if (!this.isClickable) return

			this.$emit('clickRow', row)
		},
		selectRows(index) {
			if (!this.isSelectable) return

			if (this.selectedRows.includes(index)) this.selectedRows = this.selectedRows.filter(row => row !== index)
			else this.selectedRows.push(index)
		},
		tdClass(key) {
			const column = this.columns.find(column => column.key === key)
			return [this.tdClasses, column.responsive]
		},
		tdStyle(key) {
			const { textAlign = 'left' } = this.columns.find(column => column.key === key)
			return { textAlign }
		},
		thClass({ responsive }) {
			return [this.thClasses, responsive]
		},
		thStyle({ textAlign = 'left', width = 'auto' }) {
			return { textAlign, width }
		},
		toggleExpandRow(index) {
			if (index === this.expandRowIndex) return

			this.expandRowIndex = this.expandRowIndex === index + 1 ? null : index + 1
		},
		trClass(index) {
			const classes = []

			if (this.isClickable) classes.push('clickable')
			if (this.isSelectable && this.selectedRows.includes(index)) classes.push('selected')
			if (this.trClasses) classes.push(this.trClasses)

			return classes
		},
	},
}
</script>

<style lang="scss" scoped>
.toggle {
	display: inline-block;
	width: 32px;
}

.th-actions {
	width: 0;
}

.th-expandable,
.th-selectable {
	width: 48px;
}
</style>
