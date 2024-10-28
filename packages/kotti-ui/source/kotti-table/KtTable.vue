<template>
	<div :class="tableClasses">
		<table>
			<thead>
				<tr
					v-for="headerGroup in table.getHeaderGroups()"
					:key="headerGroup.id"
				>
					<th
						v-for="(header, headerIndex) in headerGroup.headers"
						:draggable="
							tableContext.internal.hasDragAndDrop &&
							header.id !== SELECTION_COLUMN_ID
						"
						:key="`${header.id}-${headerIndex}`"
						:class="header.column.columnDef.meta.headerClasses"
						:colSpan="header.colSpan"
						@click="header.column.getToggleSortingHandler()?.($event)"
						@dragend="handleDragEnd"
						@dragenter="handleDragEnter($event, headerIndex)"
						@dragleave="handleDragLeave($event)"
						@dragover.prevent="handleDragOver($event, headerIndex)"
						@dragstart="handleDragStart(headerIndex)"
						@drop="handleDrop"
					>
						<FlexRender
							v-if="!header.isPlaceholder"
							:props="{ ...header.getContext() }"
							:render="header.column.columnDef.header"
						/>
						{{ { asc: ' 🔼', desc: ' 🔽' }[header.column.getIsSorted()] }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="row in table.getRowModel().rows" :key="row.id">
					<td
						v-for="(cell, cellIndex) in row.getVisibleCells()"
						:key="cell.id"
						:class="cell.column.columnDef.meta.cellClasses"
						@dragend="handleDragEnd"
						@dragenter="handleDragEnter($event, cellIndex)"
						@dragleave="handleDragLeave($event)"
						@dragover.prevent="handleDragOver($event, cellIndex)"
						@drop="handleDrop"
					>
						<FlexRender
							:props="{ ...cell.getContext() }"
							:render="cell.column.columnDef.cell"
						/>
					</td>
				</tr>
			</tbody>
			<!-- <tfoot>
				<tr
					v-for="footerGroup in table.getFooterGroups()"
					:key="footerGroup.id"
				>
					<th
						v-for="header in footerGroup.headers"
						:key="header.id"
						:colSpan="header.colSpan"
					>
						<FlexRender
							v-if="!header.isPlaceholder"
							:render="header.column.columnDef.footer"
							:props="{ ...header.getContext() }"
						/>
					</th>
				</tr>
			</tfoot> -->
		</table>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { makeProps } from '../make-props'

import { SELECTION_COLUMN_ID } from './hooks'
import { useTableContext } from './context'
import { FlexRender } from './tanstack-table'
import { KottiTable } from './types'

export default defineComponent({
	name: 'KtTable',
	components: {
		FlexRender,
	},
	props: makeProps(KottiTable.propsSchema),
	setup(props) {
		// eslint-disable-next-line vue/no-setup-props-reactivity-loss
		const tableContext = useTableContext(props.id)

		return {
			console, // TODO: remove
			handleDragEnd: () => {
				console.log('handleDragEnd')
				tableContext.value.internal.setDropTargetColumnIndex(null)
				tableContext.value.internal.setDraggedColumnIndex(null)
			},
			handleDragEnter: (event: DragEvent, columnIndex: number) => {
				console.log('handleDragEnter', event.currentTarget, columnIndex)
				tableContext.value.internal.setDropTargetColumnIndex(columnIndex)
			},
			handleDragOver: (event: DragEvent, columnIndex: number) => {
				const target = event.target as HTMLElement

				const { x: elementX, width: elementWidth } =
					target.getBoundingClientRect()

				const cursorX = event.clientX

				const isLeftHalf = cursorX - elementX < elementWidth / 2
				const firstViableColumnIndex = tableContext.value.internal.isSelectable
					? 1
					: 0
				const targetIndex = Math.max(
					firstViableColumnIndex,
					columnIndex + (isLeftHalf ? 0 : 1),
				)

				console.log(
					'handleDragOver',
					event,
					JSON.stringify({
						columnIndex,
						cursorX,
						elementX,
						elementWidth,
						half: isLeftHalf ? 'left' : 'right',
						targetIndex,
					}),
				)

				tableContext.value.internal.setDropTargetColumnIndex(targetIndex)
			},
			handleDragLeave: (_event: DragEvent) => {
				// console.log('handleDragLeave', event.currentTarget, event.target)
				// tableContext.value.internal.setDropTargetColumnIndex(null)
			},
			handleDragStart: (columnIndex: number) => {
				console.log('handleDragStart', columnIndex)
				tableContext.value.internal.setDraggedColumnIndex(columnIndex)
			},
			handleDrop: (event: DragEvent) => {
				console.log('handleDrop', event)
				tableContext.value.internal.swapDraggedAndDropTarget()
				tableContext.value.internal.setDropTargetColumnIndex(null)
				tableContext.value.internal.setDraggedColumnIndex(null)
			},
			SELECTION_COLUMN_ID,
			tableClasses: computed(() => ({
				'kt-table': true,
				'kt-table--is-scrollable': !props.isNotScrollable,
			})),
			table: computed(() => tableContext.value.internal.table.value),
			tableContext: computed(() => tableContext.value),
		}
	},
})
</script>

<style lang="scss">
@keyframes fade-in-right {
	from {
		background-color: var(--blue-20);
		opacity: 0.8;
	}
	to {
		background-color: none;
		opacity: 1;
	}
}

.kt-table {
	&--is-scrollable {
		overflow-x: scroll;
		white-space: nowrap;
	}

	table {
		$drag-border-width: var(--unit-1);
		border-collapse: collapse;

		thead {
			background-color: var(--ui-01);

			th {
				color: var(--gray-50);
				padding: 0.4rem 0.2rem;
				font-size: var(--unit-3);
				text-transform: uppercase;
			}

			th {
				position: relative;
			}

			.kt-table-cell--has-drop-indicator::before,
			.kt-table-cell--has-drop-indicator-right::after {
				content: '';
				position: absolute;
				top: 0;
				width: $drag-border-width;
				height: 100%;
				background-color: var(--gray-50);
				pointer-events: none;
			}

			.kt-table-cell--has-drop-indicator {
				&:first-child::before {
					left: 0px !important;
				}

				&::before {
					left: calc($drag-border-width / -2);
				}
			}

			.kt-table-cell--has-drop-indicator-right {
				&:last-child::after {
					right: 0px !important;
				}

				&::after {
					right: calc($drag-border-width / -2);
				}
			}

			.kt-table-cell {
				&--is-dragged {
					background-color: var(--gray-20);
					opacity: 0.4;
				}
			}
		}

		tbody {
			tr {
				border-bottom: 1px solid var(--ui-02);
			}

			.kt-table-cell {
				&--is-dragged {
					background-color: var(--gray-10);
					opacity: 0.4;
				}
			}
		}

		.kt-table-cell {
			padding: 0.4rem 0.2rem;
		}
	}
}

.kt-table-cell {
	&--is-left-aligned {
		text-align: left;
	}
	&--is-right-aligned {
		text-align: right;
	}
	&--is-center-aligned {
		text-align: center;
	}
	&--was-successfully-dropped {
		animation: 0.2s ease-in 1 fade-in-right;
	}

	&--displays-number {
		font-variant-numeric: tabular-nums;
	}
}
</style>
