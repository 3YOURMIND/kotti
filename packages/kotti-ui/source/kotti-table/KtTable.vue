<template>
	<div :class="tableClasses">
		<table @drop="handleDrop" @dragleave="handleDragLeave">
			<thead>
				<tr
					v-for="headerGroup in table.getHeaderGroups()"
					:key="headerGroup.id"
				>
					<th
						v-for="(header, headerIndex) in headerGroup.headers"
						:key="`${header.id}-${headerIndex}`"
						:class="header.column.columnDef.meta.headerClasses"
						:colSpan="header.colSpan"
						:draggable="
							tableContext.internal.hasDragAndDrop &&
							![EXPANSION_COLUMN_ID, SELECTION_COLUMN_ID].includes(header.id)
						"
						@click="header.column.getToggleSortingHandler()?.($event)"
						@dragend="handleDragEnd"
						@dragenter="handleDragEnter($event, header.id)"
						@dragleave.prevent
						@dragover.prevent="handleDragOver($event, header.id)"
						@dragstart="handleDragStart($event, header.id)"
					>
						<div v-if="!header.isPlaceholder" class="kt-table-header">
							<FlexRender
								v-if="!header.isPlaceholder"
								:props="{ ...header.getContext() }"
								:render="header.column.columnDef.header"
							/>
							<!-- <div style="flex: 1" v-text="header.column.columnDef.header()" /> -->
							<i v-if="header.column.getIsSorted()" class="yoco">
								{{
									{
										asc: 'chevron_up',
										desc: 'chevron_down',
										[false]: '',
									}[header.column.getIsSorted()]
								}}
							</i>
						</div>
					</th>
				</tr>
			</thead>
			<tbody>
				<template v-for="(row, rowIndex) in table.getRowModel().rows">
					<tr :key="row.id">
						<td
							v-for="(cell, cellIndex) in row.getVisibleCells()"
							:key="cell.id"
							:class="cell.column.columnDef.meta.cellClasses"
							@dragend="handleDragEnd"
							@dragenter="handleDragEnter($event, cell.column.id)"
							@dragleave.prevent
							@dragover.prevent="handleDragOver($event, cell.column.id)"
						>
							<FlexRender
								:props="{ ...cell.getContext() }"
								:render="cell.column.columnDef.cell"
							/>
						</td>
					</tr>
					<tr
						v-if="$slots['expanded-row'] && row.getIsExpanded()"
						:key="`${row.id}-expanded-row`"
					>
						<td :colSpan="row.getAllCells().length">
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
import { computed, defineComponent } from 'vue'

import { makeProps } from '../make-props'

import { useTableContext } from './context'
import { EXPANSION_COLUMN_ID, SELECTION_COLUMN_ID, ARRAY_START } from './hooks'
import { FlexRender } from './tanstack-table'
import { KottiTable } from './types'

const TRANSFER_TYPE = 'application/move-column'

export default defineComponent({
	name: 'KtTable',
	components: {
		FlexRender,
	},
	props: makeProps(KottiTable.propsSchema),
	setup(props) {
		// eslint-disable-next-line vue/no-setup-props-reactivity-loss
		const tableContext = useTableContext(props.id)

		const isColumnMoveDataTransfer = (event: DragEvent): boolean => {
			return event.dataTransfer?.types.includes(TRANSFER_TYPE) ?? false
		}

		return {
			console, // TODO: remove
			EXPANSION_COLUMN_ID,
			handleDragEnd: () => {
				// console.log('handleDragEnd')
				tableContext.value.internal.setDropTargetColumnIndex(null)
				tableContext.value.internal.setDraggedColumnIndex(null)
			},
			handleDragEnter: (event: DragEvent, columnId: string) => {
				// console.log('handleDragEnter', event.dataTransfer)
				if (!isColumnMoveDataTransfer(event)) return

				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				event.dataTransfer!.dropEffect = 'move'
				const columnIndex = tableContext.value.internal.getColumnIndex(columnId)
				tableContext.value.internal.setDropTargetColumnIndex(columnIndex)
			},
			handleDragOver: (event: DragEvent, columnId: string) => {
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
			handleDragStart: (event: DragEvent, columnId: string) => {
				event.dataTransfer?.setData(TRANSFER_TYPE, '')
				const columnIndex = tableContext.value.internal.getColumnIndex(columnId)
				// console.log('handleDragStart', columnIndex)
				tableContext.value.internal.setDraggedColumnIndex(columnIndex)
			},
			handleDrop: (event: DragEvent) => {
				if (!isColumnMoveDataTransfer(event)) return

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
				cursor: grab; // TODO hasDragAndDrop
				padding: 0.4rem 0.2rem;
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
					$drag-indicatordrag-border-width: var(--unit-1);

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
						background-color: var(--gray-50);
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

			.kt-table-cell--is-body {
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
}
</style>
