<template>
	<div :class="tableClasses">
		<table>
			<thead>
				<tr
					v-for="headerGroup in table.getHeaderGroups()"
					:key="headerGroup.id"
				>
					<th
						v-for="header in headerGroup.headers"
						:key="header.id"
						:class="header.column.columnDef.meta.headerClasses"
						:colSpan="header.colSpan"
						@click="header.column.getToggleSortingHandler()?.($event)"
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
import { computed, defineComponent, inject } from 'vue'

import { makeProps } from '../make-props'

import { getTableContextKey, type TableContext } from './context'
import { FlexRender } from './tanstack-table'
import { type AnyRow, KottiTable } from './types'

export default defineComponent({
	name: 'KtTable',
	components: { FlexRender },
	props: makeProps(KottiTable.propsSchema),
	setup(props) {
		// eslint-disable-next-line vue/no-setup-props-reactivity-loss
		const tableContext = inject<TableContext<AnyRow>>(
			// eslint-disable-next-line vue/no-setup-props-reactivity-loss
			getTableContextKey(props.id),
		)

		if (!tableContext)
			throw new Error(`KtTable: could not find context for “${props.id}”`)

		return {
			console,
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
		}

		tbody {
			tr {
				border-bottom: 1px solid var(--ui-02);
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
