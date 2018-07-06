<template>
	<div :class="{ 'x-scroll': isScrollable }">
		<table>
			<thead>
				<tr>
					<th v-if="isExpandable" class="th-expandable" />
					<th v-if="isSelectable" class="th-selectable">
						<div class="form-group">
							<label class="form-checkbox">
								<input
									type="checkbox"
									:checked="allSelected"
									@input.prevent.stop="toggleSelectAll"
								/>
								<i class="form-icon" />
							</label>
						</div>
					</th>
					<th
						v-for="column in columns"
						:key="column.key"
						:class="getThClasses(column)"
						:style="getThStyle(column)"
						v-text="column.label"
					/>
					<th v-if="hasActions" class="th-actions" />
				</tr>
			</thead>
			<tbody v-if="isEmpty">
				<td
					class="empty"
					:colspan="colSpan"
					v-text="emptyText"
				/>
			</tbody>
			<tbody v-else>
				<KtTableRow
					v-for="(virtualRow, key) in virtualRows"
					:key="key"
					:colSpan="colSpan"
					:columns="columns"
					:data="rows[virtualRow.index]"
					:isExpanded="expandedRow === virtualRow.index"
					:isSelected="isSelected(virtualRow.index)"
					:virtualRow="virtualRow"
					v-bind="settings"
					@activateRow="onActivateRow(virtualRow.index)"
					@toggleExpand="toggleExpand(virtualRow.index)"
					@toggleSelect="toggleSelect(virtualRow.index)"
				>
					<div slot="actions" slot-scope="row">
						<slot name="actions" v-bind="row"/>
					</div>
					<div slot="expand" slot-scope="row">
						<slot name="expand" v-bind="row"/>
					</div>
				</KtTableRow>
			</tbody>
		</table>
	</div>
</template>

<script>
import KtTableRow from './TableRow.vue'

export default {
	name: 'KtTable',
	components: { KtTableRow },
	props: {
		columns: { required: true, type: Array },
		emptyText: { default: 'No Data', type: String },
		hasActions: { default: false, type: Boolean },
		isExpandable: { default: false, type: Boolean },
		isInteractive: { default: false, type: Boolean },
		isScrollable: { default: false, type: Boolean },
		isSelectable: { default: false, type: Boolean },
		rows: { required: true, type: Array },
		tdClasses: { default: () => [], types: [Array, String, Object] },
		thClasses: { default: () => [], types: [Array, String, Object] },
		trClasses: { default: () => [], types: [Array, String, Object] },
		value: { default: () => [], type: Array }, // v-model value
	},
	data() {
		return { expandedRow: null }
	},
	computed: {
		allSelected() {
			return this.value.length === this.rows.length
		},
		colSpan() {
			if (!this.columns) return 0

			let colSpan = this.columns.length

			if (this.isExpandable) colSpan++
			if (this.isSelectable) colSpan++

			return colSpan
		},
		isEmpty() {
			return this.rows.length === 0
		},
		settings() {
			return [
				'hasActions',
				'isExpandable',
				'isInteractive',
				'isSelectable',
				'tdClasses',
				'trClasses',
			].reduce((result, key) => ({ ...result, [key]: this[key] }), {})
		},
		/**
		 * @description Generates table rows, expanders, etc.
		 * @returns {Array} rows to display
		 */
		virtualRows() {
			const rows = []

			for (let index = 0; index < this.rows.length; index++) {
				rows.push({ index, isExpander: false })
				if (this.isExpandable) rows.push({ index, isExpander: true })
			}

			return rows
		},
	},
	methods: {
		isSelected(index) {
			return this.value.includes(index)
		},
		toggleExpand(index) {
			this.expandedRow = this.expandedRow === index ? null : index
		},
		toggleSelect(index) {
			this.$emit(
				'input',
				this.isSelected(index)
					? this.value.filter(row => row !== index)
					: this.value.concat(index).sort(),
			)
		},
		toggleSelectAll() {
			this.$emit(
				'input',
				this.allSelected ? [] : this.rows.map((_, index) => index),
			)
		},
		onActivateRow(index) {
			this.$emit('activateRow', index, this.rows[index])
		},
		getThClasses(column) {
			return [this.thClasses, column.thClasses]
		},
		getThStyle(column) {
			return {
				textAlign: column.align || 'left',
				width: column.width || 'auto',
			}
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
.th-selectable,
.td-selectable {
	text-align: left;
	user-select: none;
	width: 32px;
}
</style>
