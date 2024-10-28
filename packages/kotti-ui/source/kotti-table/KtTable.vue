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
						draggable
						:key="header.id"
						:class="header.column.columnDef.meta.headerClasses"
						:colSpan="header.colSpan"
						@click="header.column.getToggleSortingHandler()?.($event)"
						@dragend="handleDragEnd"
						@dragenter="handleDragEnter(header.id)"
						@dragover.prevent
						@dragstart="handleDragStart(header.id)"
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
						v-for="cell in row.getVisibleCells()"
						:key="cell.id"
						:class="cell.column.columnDef.meta.cellClasses"
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
			handleDragEnter: (columnId: string) => {
				console.log('handleDragEnter', columnId)
				tableContext.value.internal.setDropTargetColumnIndex(columnId)
			},
			handleDragStart: (columnId: string) => {
				console.log('handleDragStart', columnId)
				tableContext.value.internal.setDraggedColumnIndex(columnId)
			},
			handleDrop: () => {
				console.log('handleDrop')
				tableContext.value.internal.swapDraggedAndDropTarget()
			},
			tableClasses: computed(() => ({
				'kt-table': true,
				'kt-table--is-scrollable': !props.isNotScrollable,
			})),
			table: computed(() => tableContext.value.internal.table.value),
		}
	},
})
</script>

<style lang="scss">
.kt-table {
	&--is-scrollable {
		overflow-x: scroll;
		white-space: nowrap;
	}

	table {
		border-collapse: collapse;

		thead {
			background-color: var(--ui-01);

			th {
				color: var(--gray-50);
				padding: 0.4rem 0.2rem;
				font-size: var(--unit-3);
				text-transform: uppercase;
			}

			.kt-table-cell {
				&--is-dragged {
					background-color: var(--gray-20);
					opacity: 0.75;
					min-width: min(auto, 10rem);
				}

				&--is-drop-target {
					background-color: var(--yellow-50);
					opacity: 0.75;
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
					opacity: 0.75;
					min-width: min(auto, 10rem);
				}

				&--is-drop-target {
					background-color: var(--yellow-20);
					opacity: 0.75;
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

	&--displays-number {
		font-variant-numeric: tabular-nums;
	}
}
</style>
