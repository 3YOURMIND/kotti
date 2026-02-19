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
						:data-test="header.dataTest"
						:draggable="header.isDraggable"
						:style="header.style"
						@animationend="handleAnimationEnd"
						@click="(e) => handleHeaderClick(e, header)"
						@dragenter.prevent
						@dragleave.prevent
						@dragover.prevent="(e) => handleCellDragOver(e, header.id)"
						@dragstart="(e) => handleHeaderDragStart(e, header.id)"
					>
						<div class="kt-table-header">
							<FlexRender
								class="kt-table-header-content"
								:props="{ ...header.getContext() }"
								:render="header.column.columnDef.header"
							/>
							<i
								v-if="header.isSortable"
								class="yoco"
								v-text="header.sortIndicatorIcon"
							/>
						</div>
					</th>
					<th v-if="hasActions" class="kt-table__actions-column" />
				</tr>
			</thead>
			<tbody>
				<tr
					v-if="bodyRows.length === 0 && isLoading"
					class="kt-table-row kt-table-row--is-loading"
				>
					<td :colSpan="tableColSpan">
						<slot name="loading">
							<KtLoading
								v-for="key in 3"
								:key="key"
								style="width: 100%; height: 2rem; margin-top: 0.2rem"
							/>
						</slot>
					</td>
				</tr>
				<tr
					v-else-if="bodyRows.length === 0"
					class="kt-table-row kt-table-row--is-empty"
				>
					<td :colSpan="tableColSpan">
						<slot name="empty">
							<div v-text="defaultedEmptyText" />
						</slot>
					</td>
				</tr>
				<template v-for="(row, rowIndex) in bodyRows" v-else :key="row.key">
					<tr :class="row.classes">
						<td
							v-for="cell in row.cells"
							:key="cell.key"
							:class="cell.classes"
							:data-test="cell.dataTest"
							:style="cell.style"
							@dragenter.prevent
							@dragleave.prevent
							@dragover.prevent="(e) => handleCellDragOver(e, cell.columnId)"
						>
							<component
								:is="cell.wrapComponent.component"
								v-bind="cell.wrapComponent.props"
								:class="cell.wrapComponent.class"
								v-on="cell.wrapComponent.on || {}"
							>
								<FlexRender
									:props="{ ...cell.getContext() }"
									:render="cell.column.columnDef.cell"
								/>
							</component>
						</td>
						<td v-if="row.actions !== null" class="kt-table__actions-column">
							<div
								class="kt-table__actions"
								:class="{
									'kt-table__actions--is-disabled': row.isActionDisabled,
								}"
							>
								<template v-for="(action, index) in row.actions">
									<KtPopover
										v-if="action.tooltip"
										:key="`tooltip-action-${index}`"
										placement="top"
										trigger="hover"
									>
										<i
											:class="{
												yoco: true,
												'kt-table__action-icon': true,
												'kt-table__action-icon--is-disabled':
													row.isActionDisabled || action.isDisabled,
											}"
											:data-test="action.dataTest"
											@click="
												() => {
													if (action.isDisabled) return

													action.onClick()
												}
											"
											v-text="action.icon"
										/>
										<template #content>
											<span v-text="action.tooltip" />
										</template>
									</KtPopover>
									<i
										v-else
										:key="`plain-action-${index}`"
										:class="{
											yoco: true,
											'kt-table__action-icon': true,
											'kt-table__action-icon--is-disabled':
												row.isActionDisabled || action.isDisabled,
										}"
										:data-test="action.dataTest"
										@click="
											() => {
												if (action.isDisabled) return

												action.onClick()
											}
										"
										v-text="action.icon"
									/>
								</template>
							</div>
						</td>
						<td v-else-if="$slots['actions']" class="kt-table__actions-column">
							<div
								class="kt-table__actions"
								:class="{
									'kt-table__actions--is-disabled': row.isActionDisabled,
								}"
							>
								<slot name="actions" :row="row.original" :rowIndex="rowIndex" />
							</div>
						</td>
					</tr>
					<tr
						v-if="$slots['expanded-row'] && row.isExpanded"
						:key="row.expandedKey"
					>
						<td :colSpan="tableColSpan">
							<slot
								name="expanded-row"
								:row="row.original"
								:rowIndex="rowIndex"
							/>
						</td>
					</tr>
				</template>
			</tbody>
		</table>
	</div>
</template>

<script lang="ts">
import type { Header } from '@tanstack/table-core'
import { FlexRender } from '@tanstack/vue-table'
import classNames from 'classnames'
import { computed, defineComponent, ref } from 'vue'

import { Yoco } from '@3yourmind/yoco'

import { useTranslationNamespace } from '../kotti-i18n/hooks'
import { KtLoading } from '../kotti-loading'
import { KtPopover } from '../kotti-popover'
import { makeProps } from '../make-props'

import { useTableContext } from './table/context'
import {
	EXPANSION_COLUMN_ID,
	MULTI_SELECTION_COLUMN_ID,
	SINGLE_SELECTION_COLUMN_ID,
} from './table/hooks'
import { getCellWrapComponent } from './table/row'
import { KottiTable } from './table/types'

const TRANSFER_TYPE = 'application/move-column'

const SORT_BEHAVIOR_MAP = {
	'asc-desc': [false, 'asc', 'desc'],
	'desc-asc': [false, 'desc', 'asc'],
} as const
const SORT_ORDER_COUNT = 3

export default defineComponent({
	name: 'KtTable',
	components: {
		FlexRender,
		KtLoading,
		KtPopover,
	},
	props: makeProps(KottiTable.propsSchema),
	setup(props, { slots }) {
		// eslint-disable-next-line vue/no-setup-props-reactivity-loss
		const tableContext = useTableContext(props.tableId)
		const translations = useTranslationNamespace('KtTable')

		const draggedColumnId = ref<string | null>(null)
		/**
		 * Primarily used for displaying the drop indicator line
		 */
		const dropTargetColumnIndex = ref<number | null>(null)
		const successfullyDroppedColumnId = ref<string | null>(null)

		const isColumnMoveDataTransfer = (event: DragEvent): boolean => {
			return event.dataTransfer?.types.includes(TRANSFER_TYPE) ?? false
		}

		const table = computed(() => tableContext.value.internal.table)

		return {
			bodyRows: computed(() =>
				table.value.getRowModel().rows.map((row) => {
					const behavior = tableContext.value.internal.getRowBehavior({
						row: row.original,
						rowIndex: row.index,
					})

					return {
						actions: behavior.actions ?? null,
						cells: row.getVisibleCells().map((cell) => ({
							classes: classNames(cell.column.columnDef.meta.cellClasses, {
								'kt-table-cell--was-successfully-dropped':
									cell.column.id === successfullyDroppedColumnId.value,
							}),
							column: cell.column,
							columnId: cell.column.id,
							dataTest: `${props.tableId}.column-${cell.column.id}.row-${row.id}`,
							getContext: cell.getContext,
							id: cell.id,
							key: cell.id,
							style: cell.column.columnDef.meta.style,
							wrapComponent: getCellWrapComponent({
								behavior,
								column: cell.column,
								triggerExpand: tableContext.value.internal.triggerExpand,
							}),
						})),
						classes: classNames(behavior.classes, {
							'kt-table-row': true,
							'kt-table-row--is-click-disabled': behavior.disable?.click,
							'kt-table-row--is-interactive':
								!behavior.disable?.click && behavior.click,
							'kt-table-row--is-loading skeleton rectangle': behavior.isLoading,
							'kt-table-row--is-selected': row.getIsSelected(),
						}),
						expandedColSpan: row.getAllCells().length,
						expandedKey: `${row.id}-expanded-row`,
						isActionDisabled: behavior.disable?.actions === true,
						isExpanded: row.getIsExpanded(),
						key: row.id,
						original: row.original,
					}
				}),
			),
			defaultedEmptyText: computed(
				() => props.emptyText ?? translations.value.noItems,
			),
			handleAnimationEnd: () => {
				successfullyDroppedColumnId.value = null
			},
			handleCellDragOver: (event: DragEvent, columnId: string) => {
				if (!isColumnMoveDataTransfer(event)) return
				const columnIndex = tableContext.value.internal.getColumnIndex(columnId)
				const target = event.target as HTMLElement

				const { width: elementWidth, x: elementX } =
					target.getBoundingClientRect()

				const cursorX = event.clientX

				const isLeftHalf = cursorX - elementX < elementWidth / 2
				const targetIndex = columnIndex + (isLeftHalf ? 0 : 1)

				dropTargetColumnIndex.value = targetIndex
			},
			handleDragLeave: (_event: DragEvent) => {
				dropTargetColumnIndex.value = null
			},
			handleDrop: (event: DragEvent) => {
				if (
					!isColumnMoveDataTransfer(event) ||
					draggedColumnId.value === null ||
					dropTargetColumnIndex.value === null
				)
					return

				tableContext.value.internal.swapDraggedAndDropTarget(
					draggedColumnId.value,
					dropTargetColumnIndex.value,
				)
				successfullyDroppedColumnId.value = draggedColumnId.value
				draggedColumnId.value = null
				dropTargetColumnIndex.value = null
			},
			handleHeaderClick: (_: MouseEvent, header: Header<unknown, unknown>) => {
				if (!header.column.getCanSort()) return

				const id = header.column.columnDef.id as string

				const sortBehavior =
					SORT_BEHAVIOR_MAP[
						header.column.columnDef.meta.sortBehavior as 'asc-desc' | 'desc-asc'
					]

				const currentSortIndex = sortBehavior.indexOf(
					header.column.getIsSorted(),
				)

				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const nextSort = sortBehavior.at(
					(currentSortIndex + 1) % SORT_ORDER_COUNT,
				)!

				switch (nextSort) {
					case 'asc':
						table.value.setSorting([{ desc: false, id }])
						break
					case 'desc':
						table.value.setSorting([{ desc: true, id }])
						break
					case false:
						table.value.setSorting([])
						break
				}
			},
			handleHeaderDragStart: (event: DragEvent, columnId: string) => {
				event.dataTransfer?.setData(TRANSFER_TYPE, '')
				draggedColumnId.value = columnId
			},
			handleTableDragEnd: () => {
				dropTargetColumnIndex.value = null
				draggedColumnId.value = null
			},
			hasActions: computed(
				() =>
					Boolean(slots.actions) ||
					table.value.getRowModel().rows.some((row) => {
						const behavior = tableContext.value.internal.getRowBehavior({
							row: row.original,
							rowIndex: row.index,
						})
						return Boolean(behavior.actions)
					}),
			),
			headerRows: computed(() =>
				table.value.getHeaderGroups().map((headerRow) => ({
					headers: headerRow.headers.map((header, headerIndex) => {
						const { columnOrder, hasDragAndDrop } = tableContext.value.internal
						const index = columnOrder.indexOf(header.column.id)
						return {
							classes: classNames(header.column.columnDef.meta.headerClasses, {
								'kt-table-cell--has-drop-indicator':
									index === dropTargetColumnIndex.value,
								'kt-table-cell--has-drop-indicator-right':
									index + 1 === dropTargetColumnIndex.value &&
									columnOrder.length - 1 === index,
								'kt-table-cell--is-dragged':
									header.column.id === draggedColumnId.value,
								'kt-table-cell--is-sortable': header.column.getCanSort(),
								'kt-table-cell--is-sorted': header.column.getIsSorted(),
							}),
							colSpan: header.colSpan,
							column: header.column,
							dataTest: `${props.tableId}.column-${header.column.id}.header`,
							getContext: header.getContext,
							id: header.id,
							isDraggable:
								hasDragAndDrop &&
								![
									EXPANSION_COLUMN_ID,
									MULTI_SELECTION_COLUMN_ID,
									SINGLE_SELECTION_COLUMN_ID,
								].includes(header.id),
							isSortable: header.column.getCanSort(),
							key: `${header.id}-${headerIndex}`,
							sortIndicatorIcon: {
								asc: Yoco.Icon.ARROW_UP,
								desc: Yoco.Icon.ARROW_DOWN,
								false: Yoco.Icon.ARROW_UP_DOWN,
							}[header.column.getIsSorted() || 'false'],
							style: header.column.columnDef.meta.style,
						}
					}),
					key: headerRow.id,
				})),
			),
			table,
			tableClasses: computed(() => ({
				'kt-table': true,
				'kt-table--is-drag-and-drop-active': draggedColumnId.value !== null,
				'kt-table--is-loading skeleton rectangle':
					props.isLoading && table.value.getRowModel().rows.length > 0,
				'kt-table--is-scrollable': !props.isNotScrollable,
			})),
			tableColSpan: computed(() => table.value.getAllFlatColumns().length),
			tableContext: computed(() => tableContext.value),
		}
	},
})
</script>

<style lang="scss">
@keyframes flash-green {
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
	border: 1px solid var(--ui-02);
	border-radius: var(--unit-2);

	&--is-scrollable {
		overflow-x: scroll;
		white-space: nowrap;
	}

	&--is-loading {
		&.rectangle {
			height: unset;
		}

		table,
		tr,
		td {
			background-color: transparent !important;
		}

		tbody {
			tr {
				border-bottom-color: var(--ui-background) !important;
			}
		}
	}

	table {
		width: 100%;
		border-collapse: collapse;
		background-color: var(--ui-background);

		a.kt-table-cell-content {
			color: inherit;
			text-decoration: inherit;
		}

		thead {
			z-index: 3;
			background-color: var(--ui-01);

			.kt-table-cell--is-header {
				height: 28px;
				font-size: var(--unit-3);
				color: var(--text-02);
				text-transform: uppercase;

				&.kt-table-cell--is-sorted {
					color: var(--interactive-01);
				}

				&:not(.kt-table-cell--is-sorted) {
					.yoco {
						opacity: 0;
					}

					&:hover {
						.yoco {
							color: var(--icon-02);
							opacity: 1;

							&:hover {
								color: var(--icon-01);
							}
						}
					}
				}

				&[draggable='true'] {
					cursor: grab;
				}

				.kt-table-header {
					display: inline-flex;
					gap: 2px;
					align-items: center;
					width: 100%;
					padding: 0.2rem 0.4rem;
					overflow: hidden;

					> .yoco {
						min-width: 0.8rem;
						font-size: 0.8rem;
						color: var(--interactive-03);
						user-select: none;
					}

					.kt-table-selection-header {
						padding: 2px var(--unit-2);
						cursor: pointer;
						border-radius: var(--border-radius);

						&:hover {
							background-color: var(--ui-02);
						}
					}
				}

				&.kt-table-cell--is-left-aligned .kt-table-header {
					justify-content: flex-start;
				}

				&.kt-table-cell--is-center-aligned .kt-table-header {
					justify-content: center;
				}

				&.kt-table-cell--is-right-aligned .kt-table-header {
					flex-flow: row-reverse;
					justify-content: flex-start;
				}

				&.kt-table-cell--is-center-aligned.kt-table-cell--is-sortable
					.kt-table-header-content {
					margin-left: 0.9rem;
				}
			}

			.kt-table-cell {
				&--has-drop-indicator {
					&::before,
					&-right::after {
						background-color: var(--text-05);
					}
				}

				&--is-dragged {
					background-color: var(--ui-02);

					// setting opacity only for the content, not for the drop
					// indicator and background color
					> * {
						opacity: 0.5;
					}
				}
			}
		}

		tbody {
			tr {
				position: relative;
				border-bottom: 1px solid var(--ui-02);

				&:last-child {
					border-bottom: none;
				}

				&:hover .kt-table__actions-column {
					position: sticky;

					.kt-table__actions {
						background-color: var(--ui-background);
						border-color: var(--ui-02);
					}
				}
			}

			.kt-table-cell--is-body {
				&.kt-table-cell--has-drop-indicator {
					&::before,
					&-right::after {
						background-color: var(--text-05);
					}
				}

				&.kt-table-cell--is-dragged {
					background-color: var(--ui-01);

					// setting opacity only for the content, not for the drop
					// indicator and background color
					> * {
						opacity: 0.5;
					}
				}
			}

			.kt-table-selection {
				padding: var(--unit-2);
				border-radius: var(--border-radius);

				&[aria-disabled='false'] {
					cursor: pointer;

					&:hover {
						background-color: var(--ui-05);
					}
				}
			}

			.kt-table-expand[aria-expanded='true'] {
				background-color: var(--ui-05);

				&:hover {
					background-color: var(--interactive-04);
				}
			}
		}

		.kt-table-cell {
			height: inherit;
			padding: 0;

			/* Firefox only */
			/* stylelint-disable-next-line at-rule-no-deprecated, at-rule-prelude-no-invalid, at-rule-no-vendor-prefix */
			@-moz-document url-prefix() {
				height: 100%;
			}

			> .kt-table-cell-content {
				display: flex;
				gap: 4px;
				align-items: center;
				height: 100%;
				padding: 0.4rem;
				overflow: hidden;
			}

			&--is-left-aligned > .kt-table-cell-content {
				justify-content: flex-start;
			}

			&--is-right-aligned > .kt-table-cell-content {
				justify-content: flex-end;
			}

			&--is-center-aligned > .kt-table-cell-content {
				justify-content: center;
			}
		}
	}

	&__actions-column {
		right: 0;
		z-index: 2;
		text-align: right;

		.kt-table__actions {
			right: 0.8rem;
			z-index: 400;
			display: inline-flex;
			gap: var(--unit-1);
			align-items: center;
			min-height: var(--unit-8);
			padding: 0 var(--unit-h);
			margin-right: var(--unit-1);
			font-size: 0.8rem;
			line-height: 0.8rem;
			border: 1px solid transparent;
			border-radius: var(--border-radius);

			&--is-disabled {
				color: var(--text-05);
				cursor: not-allowed;
				background-color: rgb(from var(--ui-01) r g b / 60%);
				border-color: rgb(from var(--ui-02) r g b / 60%);
			}

			> * {
				display: flex;
				flex-direction: row;
			}

			.kt-table__action-icon,
			.yoco {
				padding: var(--unit-1);
				font-size: 1rem;
				cursor: pointer;
				user-select: none;

				&--is-disabled {
					color: var(--text-05);
					cursor: not-allowed;
				}

				&:not(&--is-disabled) {
					color: var(--icon-02);

					&:hover {
						color: var(--icon-01);
					}
				}
			}
		}
	}
}

tr.kt-table-row {
	height: 44px; // setting height on a tr element is setting its min-height. See https://www.w3.org/TR/CSS22/tables.html#height-layout --- value is taken from design

	&--is-click-disabled > :not(.kt-table__actions-column) {
		color: var(--text-05);
		cursor: not-allowed;
		background-color: rgb(from var(--ui-01) r g b / 60%);
	}

	&--is-empty {
		color: var(--text-05);

		td {
			text-align: center;
		}
	}

	&--is-interactive {
		cursor: pointer;

		&:hover {
			background-color: rgb(from var(--ui-05) r g b / 50%);
		}

		.kt-table-cell-content--is-click-disabled:hover {
			cursor: default;
		}
	}

	&--is-loading.rectangle {
		display: table-row;
		height: unset;
	}

	&--is-selected {
		background-color: rgb(from var(--ui-05) r g b / 50%);
	}
}

.kt-table-cell {
	&--was-successfully-dropped {
		animation: 0.2s ease-in 1 flash-green;
	}

	&--displays-number {
		font-variant-numeric: tabular-nums;
	}

	&--has-drop-indicator {
		$drag-indicatordrag-border-width: 2px;

		&,
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
