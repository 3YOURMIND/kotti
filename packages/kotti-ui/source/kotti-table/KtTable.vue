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
							<div
								v-for="key in 3"
								:key="key"
								class="skeleton rectangle"
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
import { computed, defineComponent } from 'vue'

import { Yoco } from '@3yourmind/yoco'

import { useTranslationNamespace } from '../kotti-i18n/hooks'
import { KtPopover } from '../kotti-popover'
import { makeProps } from '../make-props'

import { useTableContext } from './table/context'
import { EXPANSION_COLUMN_ID, SELECTION_COLUMN_ID } from './table/hooks'
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
		KtPopover,
	},
	props: makeProps(KottiTable.propsSchema),
	setup(props, { slots }) {
		// eslint-disable-next-line vue/no-setup-props-reactivity-loss
		const tableContext = useTableContext(props.tableId)
		const translations = useTranslationNamespace('KtTable')

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
							classes: cell.column.columnDef.meta.cellClasses,
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
				tableContext.value.internal.unsetDroppedColumnId()
			},
			handleCellDragOver: (event: DragEvent, columnId: string) => {
				if (!isColumnMoveDataTransfer(event)) return
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				event.dataTransfer!.dropEffect = 'move'
				const columnIndex = tableContext.value.internal.getColumnIndex(columnId)
				const target = event.target as HTMLElement

				const { width: elementWidth, x: elementX } =
					target.getBoundingClientRect()

				const cursorX = event.clientX

				const isLeftHalf = cursorX - elementX < elementWidth / 2
				const targetIndex = columnIndex + (isLeftHalf ? 0 : 1)

				tableContext.value.internal.setDropTargetColumnIndex(targetIndex)
			},
			handleDragLeave: (_event: DragEvent) => {
				tableContext.value.internal.setDropTargetColumnIndex(null)
			},
			handleDrop: (event: DragEvent) => {
				if (!isColumnMoveDataTransfer(event)) return

				tableContext.value.internal.swapDraggedAndDropTarget()
				tableContext.value.internal.setDropTargetColumnIndex(null)
				tableContext.value.internal.setDraggedColumnId(null)
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
				tableContext.value.internal.setDraggedColumnId(columnId)
			},
			handleTableDragEnd: () => {
				tableContext.value.internal.setDropTargetColumnIndex(null)
				tableContext.value.internal.setDraggedColumnId(null)
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
					headers: headerRow.headers.map((header, headerIndex) => ({
						classes: classNames(header.column.columnDef.meta.headerClasses, {
							'kt-table-cell--is-sortable': header.column.getCanSort(),
							'kt-table-cell--is-sorted': header.column.getIsSorted(),
						}),
						colSpan: header.colSpan,
						column: header.column,
						dataTest: `${props.tableId}.column-${header.column.id}.header`,
						getContext: header.getContext,
						id: header.id,
						isDraggable:
							tableContext.value.internal.hasDragAndDrop &&
							![EXPANSION_COLUMN_ID, SELECTION_COLUMN_ID].includes(header.id),
						isSortable: header.column.getCanSort(),
						key: `${header.id}-${headerIndex}`,
						sortIndicatorIcon: {
							asc: Yoco.Icon.ARROW_UP,
							desc: Yoco.Icon.ARROW_DOWN,
							false: Yoco.Icon.ARROW_UP_DOWN,
						}[header.column.getIsSorted() || 'false'],
						style: header.column.columnDef.meta.style,
					})),
					key: headerRow.id,
				})),
			),
			table,
			tableClasses: computed(() => ({
				'kt-table': true,
				'kt-table--is-drag-and-drop-active':
					tableContext.value.internal.isDragAndDropActive,
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

		tbody {
			mix-blend-mode: multiply;

			tr {
				border-bottom-color: white !important;
			}
		}
	}

	table {
		width: 100%;
		border-collapse: collapse;

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
						background-color: var(--gray-30);
					}
				}

				&--is-dragged {
					background-color: var(--gray-20);

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
						background-color: var(--white);
						border-color: var(--ui-02);
					}
				}
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
				background-color: rgb(248 248 248 / 60%); // ~= rgb(--gray-10 / 60%)
				border-color: rgb(224 224 224 / 60%); // ~= rgb(--gray-20 / 60%)
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
		background-color: rgb(248 248 248 / 60%); // ~= rgb(--gray-10 / 60%)
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
			background-color: rgb(234 240 250 / 50%); // ~= rgb(--blue-10 / 60%)
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
		background-color: rgb(234 240 250 / 50%); // ~= rgb(--blue-10 / 60%)
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
