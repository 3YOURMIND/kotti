<template>
	<thead>
		<tr :class="tableHeaderClass">
			<th v-if="isExpandable" class="th-expandable" />
			<th v-if="isSelectable" class="th-selectable kt-table__checkbox-col">
				<div class="form-group" @click="handleSelectAll">
					<label class="form-checkbox">
						<input :checked="isAllSelected" type="checkbox" />
						<i
							class="form-icon"
							:style="isAllRowsDisabled ? { cursor: 'not-allowed' } : {}"
						/>
					</label>
				</div>
			</th>
			<th
				v-for="(column, columnIndex) in tableColumns"
				:key="column.prop"
				:class="getThClasses(column)"
				:draggable="useColumnDragToOrder"
				:style="getThStyle(column)"
				@click="handleThClick(column)"
				@dragend="handleDragEnd"
				@dragenter="handleDragEnter(column)"
				@dragover.prevent
				@dragstart="handleDragStart(column)"
				@drop="handleDrop(column)"
			>
				<TableHeaderCell v-bind="{ column, columnIndex }" />
				<div
					v-if="useQuickSortControl && (canSort(column) || isSorted(column))"
					class="kt-table__controls"
				>
					<div class="kt-table__quick-sort-control clickable">
						<i :class="{ active: isSortedByAsc(column), yoco: true }">
							triangle_up
						</i>
						<i :class="{ active: isSortedByDsc(column), yoco: true }">
							triangle_down
						</i>
					</div>
				</div>
			</th>
			<th v-if="hasActions" class="th-actions" />
		</tr>
	</thead>
</template>

<script lang="ts">
import { KT_TABLE, KT_STORE } from '../constants'
import { KottiTable } from '../types'
import type { Store } from '../logic/types'
import { computed, defineComponent, inject, ref } from 'vue'

import { TableHeaderCell } from './TableHeaderCell'

export default defineComponent({
	name: 'KtTableHeader',
	components: {
		TableHeaderCell,
	},
	setup() {
		const tableState = inject(KT_TABLE)
		const tableStore = inject(KT_STORE)

		if (!tableState || !tableStore)
			throw new Error(
				'TableRowCell: Component was used without providing the right contexts',
			)

		const dropTargetColumn =
			ref<Store.StateComponents.ColumnRepresentation | null>(null)
		const draggedColumn =
			ref<Store.StateComponents.ColumnRepresentation | null>(null)

		const useColumnDragToOrder = computed(() => tableState.useColumnDragToOrder)
		const isDraggedOver = (column: unknown) =>
			column === dropTargetColumn.value && draggedColumn.value !== column

		const useQuickSortControl = computed(() => tableState.useQuickSortControl)

		const canSort = (column: unknown) => tableStore.get('canSort', column)
		const isSorted = (column: unknown) => tableStore.get('isSorted', column)

		return {
			canSort,
			handleDragEnd: () => {
				dropTargetColumn.value = null
			},
			handleDragEnter: (column: Store.StateComponents.ColumnRepresentation) => {
				dropTargetColumn.value = column
			},
			handleDragStart: (column: Store.StateComponents.ColumnRepresentation) => {
				draggedColumn.value = column
			},
			handleDrop: (column: Store.StateComponents.ColumnRepresentation) => {
				if (draggedColumn.value) {
					tableStore.commit('orderBefore', draggedColumn.value, column)
					draggedColumn.value = null
				}
				dropTargetColumn.value = null
			},
			getThClasses: (column: Store.StateComponents.ColumnRepresentation) => [
				{
					'drag-over': isDraggedOver(column),
					clickable: canSort(column),
					dragging: useColumnDragToOrder.value,
					sortable: canSort(column),
					sorted: isSorted(column),
				},
				tableState.thClasses,
				column.thClass,
			],
			getThStyle: (column: Store.StateComponents.ColumnRepresentation) => ({
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				textAlign: column.align ?? KottiTable.Column.Align.LEFT,
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				width: column.width ?? 'auto',
			}),
			handleSelectAll: () => {
				tableStore.commit('toggleAllSelection')
			},
			handleThClick: (column: Store.StateComponents.ColumnRepresentation) => {
				if (!useQuickSortControl.value) return
				if (!canSort(column)) return

				tableStore.commit('sort', { column })
			},
			hasActions: computed(() => tableState.hasActions),
			isAllRowsDisabled: computed(() => tableStore.state.isAllRowsDisabled),
			isAllSelected: computed(() => tableStore.state.isAllSelected),
			isExpandable: computed(() => tableState.isExpandable),
			isSelectable: computed(() => tableState.isSelectable),
			isSorted,
			isSortedByAsc: (column: Store.StateComponents.ColumnRepresentation) =>
				tableStore.get('isSortedByAsc', column),
			isSortedByDsc: (column: Store.StateComponents.ColumnRepresentation) =>
				tableStore.get('isSortedByDsc', column),
			tableColumns: computed(() => tableStore.state.columns),
			tableHeaderClass: computed(() => [
				'table-header-row',
				tableState.headerClass,
			]),
			useColumnDragToOrder,
			useQuickSortControl,
		}
	},
})
</script>

<style lang="scss" scoped>
@import '../../kotti-style/_variables.scss';

.table-header-row {
	background-color: var(--ui-01);
}

.kt-table__checkbox-col .form-group {
	position: relative;
}

th {
	box-sizing: border-box;
	padding: var(--unit-2) var(--unit-1);
	font-size: $font-size-sm;
	line-height: 1em;
	color: $lightgray-500;
	text-align: inherit;
	text-transform: uppercase;
	border-width: 0;
	border-left-color: var(--ui-03);
	transition: border 0.2s ease-in-out;
}

th.drag-over {
	border-left: 0.3rem solid;
}

th.sortable {
	position: relative;
	padding-right: 1rem;
}

th.dragging {
	cursor: move;
}

th.sortable .kt-table__controls {
	position: absolute;
	top: 0;
	right: 0.1rem;
	display: none;
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
	height: 0.5rem;
	line-height: 0.5;
	color: var(--text-03);
}

.kt-table__quick-sort-control .yoco.active {
	color: var(--interactive-01);
}
</style>
