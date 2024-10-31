<template>
	<div :class="tableClasses">
		<table
			@dragend="handleTableDragEnd"
			@dragleave="handleDragLeave"
			@drop="handleDrop"
		>
			<thead>
				<tr v-for="headerRow in headerRows" :key="headerRow.key">
					<th
						v-for="header in headerRow.headers"
						:key="header.key"
						:class="header.classes"
						:colSpan="header.colSpan"
						:draggable="header.isDraggable"
						@click="(e) => handleHeaderClick(e, header.id)"
						@dragenter.prevent
						@dragleave.prevent
						@dragover.prevent="(e) => handleCellDragOver(e, header.id)"
						@dragstart="(e) => handleHeaderDragStart(e, header.id)"
					>
						<div v-if="!header.isPlaceholder" class="kt-table-header">
							<FlexRender
								:props="{ ...header.getContext() }"
								:render="header.column.columnDef.header"
							/>
							<!-- <div style="flex: 1" v-text="header.column.columnDef.header()" /> -->
							<i
								v-if="header.isSortable"
								class="yoco"
								v-text="header.sortIndicatorIcon"
							/>
						</div>
					</th>
				</tr>
			</thead>
			<tbody>
				<template v-for="(row, rowIndex) in bodyRows">
					<!-- TODO: add data-test -->
					<tr :key="row.key">
						<td
							v-for="(cell, cellIndex) in row.cells"
							:key="cell.key"
							:class="cell.classes"
							@dragenter.prevent
							@dragleave.prevent
							@dragover.prevent="(e) => handleCellDragOver(e, cell.columnId)"
						>
							<!-- TODO: error when custom has no slot // {{ `slot ${cell.columnId}` }} -->
							<slot
								v-if="cell.hasSlot"
								:columnIndex="cellIndex"
								:data="cell.data"
								:name="cell.columnId"
								:row="row.original"
								:rowIndex="rowIndex"
							/>
							<FlexRender
								v-else
								:props="{ ...cell.getContext() }"
								:render="cell.column.columnDef.cell"
							/>
						</td>
					</tr>
					<tr
						v-if="$scopedSlots['expanded-row'] && row.isExpanded"
						:key="row.expandedKey"
					>
						<td :colSpan="row.expandedColSpan">
							<slot
								name="expanded-row"
								:row="row.original"
								:rowIndex="rowIndex"
							/>
						</td>
					</tr>
				</template>
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
import type { Header } from '@tanstack/table-core'
import { computed, defineComponent } from 'vue'

import { Yoco } from '@3yourmind/yoco'

import { makeProps } from '../make-props'

import { useTableContext } from './context'
import { ARRAY_START, EXPANSION_COLUMN_ID, SELECTION_COLUMN_ID } from './hooks'
import { FlexRender } from './tanstack-table'
import { KottiTable } from './types'

const TRANSFER_TYPE = 'application/move-column'

export default defineComponent({
	name: 'KtTable',
	components: {
		FlexRender,
	},
	props: makeProps(KottiTable.propsSchema),
	setup(props, { slots }) {
		// eslint-disable-next-line vue/no-setup-props-reactivity-loss
		const tableContext = useTableContext(props.id)

		const isColumnMoveDataTransfer = (event: DragEvent): boolean => {
			return event.dataTransfer?.types.includes(TRANSFER_TYPE) ?? false
		}

		const table = computed(() => tableContext.value.internal.table.value)

		return {
			bodyRows: computed(() =>
				table.value.getRowModel().rows.map((row) => ({
					cells: row.getVisibleCells().map((cell) => ({
						classes: cell.column.columnDef.meta.cellClasses,
						column: cell.column,
						columnId: cell.column.id,
						data:
							typeof cell.column.columnDef.cell === 'string'
								? cell.column.columnDef.cell
								: cell.column.columnDef.cell?.({ ...cell.getContext() }) ?? '',
						getContext: cell.getContext,
						hasSlot:
							Boolean(slots[cell.column.id]) &&
							cell.column.columnDef.meta.type === 'custom',
						id: cell.id,
						key: cell.id,
					})),
					expandedColSpan: row.getAllCells().length,
					expandedKey: `${row.id}-expanded-row`,
					isExpanded: row.getIsExpanded(),
					key: row.id,
				})),
			),
			handleCellDragOver: (event: DragEvent, columnId: string) => {
				if (!isColumnMoveDataTransfer(event)) return
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				event.dataTransfer!.dropEffect = 'move'
				const columnIndex = tableContext.value.internal.getColumnIndex(columnId)
				const target = event.target as HTMLElement

				const { x: elementX, width: elementWidth } =
					target.getBoundingClientRect()

				const cursorX = event.clientX

				const isLeftHalf = cursorX - elementX < elementWidth / 2
				const targetIndex = Math.max(
					ARRAY_START,
					columnIndex + (isLeftHalf ? 0 : 1),
				)

				// console.log(
				// 	'handleDragOver',
				// 	event,
				// 	JSON.stringify({
				// 		columnIndex,
				// 		cursorX,
				// 		elementX,
				// 		elementWidth,
				// 		half: isLeftHalf ? 'left' : 'right',
				// 		targetIndex,
				// 	}),
				// )

				tableContext.value.internal.setDropTargetColumnIndex(targetIndex)
			},
			handleDragLeave: (_event: DragEvent) => {
				// console.log('handleDragLeave', event.currentTarget, event.target)
				tableContext.value.internal.setDropTargetColumnIndex(null)
			},
			handleDrop: (event: DragEvent) => {
				if (!isColumnMoveDataTransfer(event)) return

				tableContext.value.internal.swapDraggedAndDropTarget()
				tableContext.value.internal.setDropTargetColumnIndex(null)
				tableContext.value.internal.setDraggedColumnIndex(null)
			},
			handleHeaderClick: (
				$event: MouseEvent,
				header: Header<unknown, unknown>,
			) => {
				header.column.getToggleSortingHandler()?.($event)
			},
			handleHeaderDragStart: (event: DragEvent, columnId: string) => {
				event.dataTransfer?.setData(TRANSFER_TYPE, '')
				const columnIndex = tableContext.value.internal.getColumnIndex(columnId)
				// console.log('handleHeaderDragStart', columnIndex)
				tableContext.value.internal.setDraggedColumnIndex(columnIndex)
			},
			handleTableDragEnd: () => {
				// console.log('handleTableDragEnd')
				tableContext.value.internal.setDropTargetColumnIndex(null)
				tableContext.value.internal.setDraggedColumnIndex(null)
			},
			headerRows: computed(() =>
				table.value.getHeaderGroups().map((headerRow) => ({
					headers: headerRow.headers.map((header, headerIndex) => ({
						classes: header.column.columnDef.meta.headerClasses,
						colSpan: header.colSpan,
						column: header.column,
						getContext: header.getContext,
						id: header.id,
						isDraggable:
							tableContext.value.internal.hasDragAndDrop &&
							![EXPANSION_COLUMN_ID, SELECTION_COLUMN_ID].includes(header.id),
						isSortable: header.column.getCanSort(),
						key: `${header.id}-${headerIndex}`,
						sortIndicatorIcon: {
							asc: Yoco.Icon.CHEVRON_UP,
							desc: Yoco.Icon.CHEVRON_DOWN,
							false: '',
						}[header.column.getIsSorted() || 'false'],
					})),
					key: headerRow.id,
				})),
			),
			tableClasses: computed(() => ({
				'kt-table': true,
				'kt-table--is-scrollable': !props.isNotScrollable,
			})),
			table,
			tableContext: computed(() => tableContext.value),
		}
	},
})
</script>

<style lang="scss">
@keyframes fade-in-right {
	from {
		background-color: var(--green-20);
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
		border-collapse: collapse;

		thead {
			background-color: var(--ui-01);

			.kt-table-cell--is-header {
				padding: 0.4rem 0.2rem;
				cursor: grab; // TODO hasDragAndDrop
				font-size: var(--unit-3);
				color: var(--gray-50);
				text-transform: uppercase;

				.kt-table-header {
					display: inline-flex;
					align-items: center;
					justify-content: space-between;
					width: 100%;

					.yoco {
						min-width: 1rem;
						font-size: 0.9rem;
						color: var(--interactive-03);
					}
				}
			}

			.kt-table-cell {
				&--has-drop-indicator {
					&::before,
					&-right::after {
						background-color: var(--gray-30);
					}
				}

				&--is-dragged {
					background-color: var(--gray-20);
					// TODO consider if this is needed (note that it affects the drop indicator)
					/* opacity: 0.4; */
				}
			}
		}

		tbody {
			tr {
				border-bottom: 1px solid var(--ui-02);
			}

			.kt-table-cell--is-body {
				&.kt-table-cell--has-drop-indicator {
					&::before,
					&-right::after {
						background-color: var(--gray-30);
					}
				}

				&.kt-table-cell--is-dragged {
					background-color: var(--gray-10);

					// TODO consider if this is needed (note that it affects the drop indicator)
					// opacity: 0.4;
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

		/* .kt-table-header {
			align-items: flex-start;
		} */
	}

	&--is-right-aligned {
		text-align: right;

		/* .kt-table-header {
			align-items: flex-end;
		} */
	}

	&--is-center-aligned {
		text-align: center;

		/* .kt-table-header {
			align-items: center;
		} */
	}

	&--was-successfully-dropped {
		animation: 0.2s ease-in 1 fade-in-right;
	}

	&--displays-number {
		font-variant-numeric: tabular-nums;
	}

	.kt-table-selection {
		margin-right: var(--unit-3);
	}

	&--has-drop-indicator {
		$drag-indicatordrag-border-width: 2px;

		&, // TODO: does this work? it should, right?
		&-right {
			position: relative;
		}

		&::before,
		&-right::after {
			position: absolute;
			top: 0;
			width: $drag-indicatordrag-border-width;
			height: 100%;
			pointer-events: none;
			content: '';
		}

		&:first-child::before {
			left: 0 !important;
		}

		&-right:last-child::after {
			right: 0 !important;
		}

		&::before {
			left: calc($drag-indicatordrag-border-width / -2);
		}

		&-right::after {
			right: calc($drag-indicatordrag-border-width / -2);
		}
	}
}
</style>
