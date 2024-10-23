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
						:colSpan="header.colSpan"
					>
						<FlexRender
							v-if="!header.isPlaceholder"
							:props="{ ...header.getContext() }"
							:render="header.column.columnDef.header"
						/>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="row in table.getRowModel().rows" :key="row.id">
					<td v-for="cell in row.getVisibleCells()" :key="cell.id">
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
			tableClasses: computed(() => ({
				'kt-table': true,
				'kt-table--is-scrollable': !props.isNotScrollable,
			})),
			table: computed(() => tableContext.value.internal.table.value),
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-table {
	&--is-scrollable {
		overflow-x: scroll;
	}
}
</style>
