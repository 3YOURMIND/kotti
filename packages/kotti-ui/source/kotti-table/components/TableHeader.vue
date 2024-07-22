<template>
	<thead>
		<tr :class="tableHeaderClass">
			<th v-if="isExpandable" class="th-expandable" />
			<th v-if="isSelectable" class="th-selectable kt-table__checkbox-col">
				<div class="form-group">
					<label class="form-checkbox">
						<input :checked="isAllSelected" type="checkbox" />
						<i
							class="form-icon"
							:style="isAllRowsDisabled ? { cursor: 'not-allowed' } : {}"
						/>
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
				:draggable="isDraggable"
				:style="getThStyle(column)"
				@click="handleThClick(column)"
				@dragend="dragEnd"
				@dragenter="dragEnter($event, column)"
				@dragover.prevent
				@dragstart="dragStart($event, column)"
				@drop="drop($event, column)"
			>
				<TableHeaderCell v-bind="{ column, columnIndex }" />
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

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */

import { KT_TABLE, KT_STORE, KT_LAYOUT } from '../constants'
import { KottiTable } from '../types'

import { TableHeaderCell } from './TableHeaderCell'

// eslint-disable-next-line @typescript-eslint/naming-convention
const KtTableHeader: any = {
	name: 'KtTableHeader',
	components: { TableHeaderCell },
	inject: { KT_TABLE, KT_STORE, KT_LAYOUT },
	data() {
		return {
			draggingColumn: null,
			columnDragOver: null,
		}
	},
	computed: {
		isAllRowsDisabled(): any {
			// @ts-expect-error `this[KT_STORE]` seems to emulate a provide/inject pattern of sorts
			return this[KT_STORE].state.isAllRowsDisabled
		},
		isAllSelected(): any {
			// @ts-expect-error `this[KT_STORE]` seems to emulate a provide/inject pattern of sorts
			return this[KT_STORE].state.isAllSelected
		},
		tableColumns(): any {
			// @ts-expect-error `this[KT_STORE]` seems to emulate a provide/inject pattern of sorts
			return this[KT_STORE].state.columns
		},
		hasActions(): any {
			// @ts-expect-error `this[KT_TABLE]` seems to emulate a provide/inject pattern of sorts
			return this[KT_TABLE].hasActions
		},
		isDraggable(): any {
			// @ts-expect-error `this[KT_TABLE]` seems to emulate a provide/inject pattern of sorts
			return this[KT_TABLE].useColumnDragToOrder
		},
		isDraggingColumn(): any {
			// @ts-expect-error vue's type resolution is broken for this file
			return Boolean(this.draggingColumn)
		},
		isExpandable(): any {
			// @ts-expect-error `this[KT_TABLE]` seems to emulate a provide/inject pattern of sorts
			return this[KT_TABLE].isExpandable
		},
		isSelectable(): any {
			// @ts-expect-error `this[KT_TABLE]` seems to emulate a provide/inject pattern of sorts
			return this[KT_TABLE].isSelectable
		},
		useQuickSortControl(): any {
			// @ts-expect-error `this[KT_TABLE]` seems to emulate a provide/inject pattern of sorts
			return this[KT_TABLE].useQuickSortControl
		},
		tableHeaderClass(): any {
			// @ts-expect-error `this[KT_TABLE]` seems to emulate a provide/inject pattern of sorts
			return ['table-header-row', this[KT_TABLE].headerClass]
		},
	},
	methods: {
		handleSelectAll(_event: unknown): any {
			// @ts-expect-error `this[KT_STORE]` seems to emulate a provide/inject pattern of sorts
			this[KT_STORE].commit('toggleAllSelection')
		},
		handleThClick(column: unknown): any {
			// @ts-expect-error vue's type resolution is broken for this file
			if (this.useQuickSortControl && this.canSort(column)) {
				this.changeSort(column)
			}
		},
		getThClasses(column: any): any {
			return [
				{
					['drag-over']: this.isDraggedOver(column),
					sortable: this.canSort(column),
					// @ts-expect-error vue's type resolution is broken for this file
					dragging: this.isDraggable,
					sorted: this.isSorted(column),
					clickable: this.canSort(column),
				},
				// @ts-expect-error `this[KT_TABLE]` seems to emulate a provide/inject pattern of sorts
				this[KT_TABLE].thClasses,
				column.thClass,
			]
		},
		getThStyle(column: any): any {
			return {
				textAlign: column.align || KottiTable.Column.Align.LEFT,
				width: column.width || 'auto',
			}
		},
		canSort(column: unknown): any {
			// @ts-expect-error `this[KT_STORE]` seems to emulate a provide/inject pattern of sorts
			return this[KT_STORE].get('canSort', column)
		},
		isSorted(column: unknown): any {
			// @ts-expect-error `this[KT_STORE]` seems to emulate a provide/inject pattern of sorts
			return this[KT_STORE].get('isSorted', column)
		},
		changeSort(column: unknown): any {
			// @ts-expect-error `this[KT_STORE]` seems to emulate a provide/inject pattern of sorts
			this[KT_STORE].commit('sort', { column })
		},
		isSortedByAsc(column: unknown): any {
			// @ts-expect-error `this[KT_STORE]` seems to emulate a provide/inject pattern of sorts
			return this[KT_STORE].get('isSortedByAsc', column)
		},
		isSortedByDsc(column: unknown): any {
			// @ts-expect-error `this[KT_STORE]` seems to emulate a provide/inject pattern of sorts
			return this[KT_STORE].get('isSortedByDsc', column)
		},
		dragStart(_event: unknown, column: any): any {
			// @ts-expect-error vue's type resolution is broken for this file
			this.draggingColumn = column
		},
		dragEnter(_event: unknown, column: any): any {
			// @ts-expect-error vue's type resolution is broken for this file
			this.columnDragOver = column
		},
		dragEnd(): any {
			// @ts-expect-error vue's type resolution is broken for this file
			this.columnDragOver = null
		},
		isDraggedOver(column: unknown): any {
			// @ts-expect-error vue's type resolution is broken for this file
			return column === this.columnDragOver && this.draggingColumn !== column
		},
		drop(_event: unknown, column: unknown): any {
			// @ts-expect-error `this[KT_STORE]` seems to emulate a provide/inject pattern of sorts
			this[KT_STORE].commit('orderBefore', this.draggingColumn, column)
			// @ts-expect-error vue's type resolution is broken for this file
			this.draggingColumn = null
			// @ts-expect-error vue's type resolution is broken for this file
			this.columnDragOver = null
		},
	},
}

export default KtTableHeader
</script>

<style lang="scss" scoped>
@import '../../kotti-style/_variables.scss';

.table-header-row {
	background-color: var(--ui-01);
}

.kt-table__checkbox-col .form-group {
	position: relative;
}

.kt-table-checkbox-col__click-area {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	cursor: pointer;
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
