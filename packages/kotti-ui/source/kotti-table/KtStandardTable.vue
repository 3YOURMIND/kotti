<template>
	<div class="kt-standard-table">
		<KtTable id="example" />
		<div class="kt-standard-table__footer">
			<span v-text="'Items per page'" />
			<KtFieldSingleSelect
				:options="pageOptions"
				:value="table.getState().pagination.pageSize"
				@input="(value) => table.setPageSize(value)"
			/>
			<KtPagination
				:page="table.getState().pagination.pageIndex + 1"
				:pageSize="table.getState().pagination.pageSize"
				:total="table.getRowCount()"
				@setPage="(value) => table.setPageIndex(value - 1)"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { KtFieldSingleSelect } from '../kotti-field-select'
import { KottiFieldSingleSelect } from '../kotti-field-select/types'
import { KtPagination } from '../kotti-pagination'
import { KottiStandardTable } from './types'
import { makeProps } from '../make-props'
import { useKottiStandardTable } from './hooks'

export default defineComponent({
	name: 'KtStandardTable',
	components: {
		KtFieldSingleSelect,
		KtPagination,
	},
	props: makeProps(KottiStandardTable.propsSchema),
	setup(props, { emit }) {
		const { tableContext } = useKottiStandardTable({
			id: 'example',
			pagination: { page: 0, itemsPerPage: props.itemsPerPage, type: 'local' },
		})

		return {
			pageOptions: props.itemsPerPageOptions.map((value) => ({
				value,
				label: String(value),
			})) satisfies KottiFieldSingleSelect.Props['options'],
			setItemsPerPage: (value: number) => {
				emit('update:itemsPerPage', value)
			},
			table: computed(() => tableContext.value.internal.table.value),
		}
	},
})
</script>
