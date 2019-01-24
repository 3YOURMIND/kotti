<template>
	<thead>
		<tr :class="tableHeaderClass">
			<th v-if="isExpandable" class="th-expandable" />
			<th v-if="isSelectable" class="th-selectable kt-table__checkbox-col">
				<div class="form-group">
					<label class="form-checkbox">
						<input type="checkbox" :checked="isAllSelected" />
						<i class="form-icon"></i>
					</label>
					<div
						class="kt-table-checkbox-col__click-area"
						@click="handleSelectAll($event)"
					/>
				</div>
			</th>
			<th
				v-for="(column, columnIndex) in tableColumns"
				:key="column.prop"
				:class="getThClasses(column)"
				:style="getThStyle(column)"
				@click="handleThClick(column)"
			>
				<div
					:class="[
						'kt-table__cell',
						'kt-table__header-cell',
						column.headerCellClass,
					]"
					:data-prop="column.prop"
				>
					<TableHeaderCell v-bind="{ column, columnIndex }" />
				</div>
				<div v-if="useQuickSortControl" class="kt-table__controls">
					<div
						v-if="useQuickSortControl && (canSort(column) || isSorted(column))"
						class="kt-table__quick-sort-control clickable"
					>
						<i :class="['yoco', { active: isSortedByAsc(column) }]"
							>triangle_up</i
						>
						<i :class="['yoco', { active: isSortedByDsc(column) }]"
							>triangle_down</i
						>
					</div>
				</div>
			</th>
			<th v-if="hasActions" class="th-actions" />
		</tr>
	</thead>
</template>
<script>
import TableHeaderCell from './TableHeaderCell'
import { KT_TABLE, KT_STORE, KT_LAYOUT } from './constants'

export default {
	components: { TableHeaderCell },
	name: 'KtTableHeader',
	inject: { KT_TABLE, KT_STORE, KT_LAYOUT },
	computed: {
		isAllSelected() {
			return this[KT_STORE].state.isAllSelected
		},
		tableColumns() {
			return this[KT_STORE].state.columns
		},
		hasActions() {
			return this[KT_TABLE].hasActions
		},
		isExpandable() {
			return this[KT_TABLE].isExpandable
		},
		isSelectable() {
			return this[KT_TABLE].isSelectable
		},
		useQuickSortControl() {
			return this[KT_TABLE].useQuickSortControl
		},
		tableHeaderClass() {
			return ['table-header-row', this[KT_TABLE].headerClass]
		},
	},
	methods: {
		handleSelectAll() {
			this[KT_STORE].commit('toggleAllSelection')
		},
		handleThClick(column) {
			if (this.useQuickSortControl && this.canSort(column)) {
				this.changeSort(column)
			}
		},
		getThClasses(column) {
			return [
				{
					sortable: this.canSort(column),
					sorted: this.isSorted(column),
					clickable: this.canSort(column),
				},
				this[KT_TABLE].thClasses,
				column.thClass,
			]
		},
		getThStyle(column) {
			return {
				textAlign: column.align || 'left',
				width: column.width || 'auto',
			}
		},
		canSort(column) {
			return this[KT_STORE].get('canSort', column)
		},
		isSorted(column) {
			return this[KT_STORE].get('isSorted', column)
		},
		changeSort(column) {
			this[KT_STORE].commit('sort', { column })
		},
		isSortedByAsc(column) {
			return this[KT_STORE].get('isSortedByAsc', column)
		},
		isSortedByDsc(column) {
			return this[KT_STORE].get('isSortedByDsc', column)
		},
	},
}
</script>
<style lang="scss" scoped>
@import '../../kotti-style/_variables.scss';

.table-header-row {
	background-color: $lightgray-300;
}
.kt-table__checkbox-col .form-group {
	position: relative;
}
.kt-table-checkbox-col__click-area {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	cursor: pointer;
}

th.sortable {
	position: relative;
	padding-right: 1rem;
}

th.sortable .kt-table__controls {
	display: none;
	position: absolute;
	right: 0.1rem;
	top: 0;
	width: 0.6rem;
	height: 100%;
	hyphens: none;
}

th.sortable:hover .kt-table__controls,
th.sorted .kt-table__controls {
	display: flex;
	align-items: center;
}

th.sortable:hover .kt-table__quick-sort-control,
th.sorted .kt-table__quick-sort-control {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 0.5rem;
}
.kt-table__quick-sort-control .yoco {
	color: $darkgray-300;
	height: 0.5rem;
	line-height: 0.5;
}
.kt-table__quick-sort-control .yoco.active {
	color: $primary-400;
}
</style>
