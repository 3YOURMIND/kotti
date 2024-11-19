<template>
	<div class="kt-standard-table">
		<div
			v-if="title || $slots['header-action']"
			class="kt-standard-table__header"
		>
			<h1 v-if="title" v-text="title" />
			<div v-if="$slots['header-action']" class="kt-standard-table__slot">
				<slot name="header-action" />
			</div>
		</div>
		<div class="kt-standard-table__actions">
			<div class="kt-standard-table__table-actions">
				<TableSearch
					:isLoading="isLoading"
					:value="searchValue"
					@input="onUpdateSearchValue"
				/>
				<TableFilters
					:filters="filters"
					:isLoading="isLoading"
					:value="appliedFilters"
					@input="onUpdateAppliedFilters"
				/>
				<TableColumns
					:isLoading="isLoading"
					:options="columnOptions"
					:value="columnVisibility"
					@input="onUpdateColumnVisivility"
					@showAll="onShowAllColumns"
				/>
			</div>
			<div v-if="$slots['buttons']" class="kt-standard-table__slot">
				<slot name="buttons" />
			</div>
		</div>
		<div
			v-if="appliedFilters.length > 0 || $slots['switch-buttons']"
			class="kt-standard-table__info"
		>
			<div
				v-if="appliedFilters.length > 0"
				class="kt-standard-table__applied-filters"
			>
				<KtTag
					v-for="(filter, index) in appliedFilters"
					:key="index"
					isDisabled
					:text="formatAppliedFilter(filter)"
				/>
			</div>
			<div v-if="$slots['switch-buttons']" class="kt-standard-table__slot">
				<slot name="switch-buttons" />
			</div>
		</div>
		<div class="kt-standard-table__table">
			<KtTable :isLoading="isLoading" :tableId="id" />
		</div>
		<div class="kt-standard-table__footer">
			<TablePageSize
				v-bind="{
					isLoading,
					pageSize,
					pageSizeOptions,
				}"
				@updatePageSize="onUpdatePageSize"
			/>
			<TablePagination
				v-bind="{
					isLoading,
					pageIndex,
					pageSize,
					rowCount,
				}"
				@updatePageIndex="onUpdatePageIndex"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'

import { makeProps } from '../make-props'

import TableColumns from './standard-table/components/Columns.vue'
import TableFilters from './standard-table/components/Filters.vue'
import TablePageSize from './standard-table/components/PageSize.vue'
import TablePagination from './standard-table/components/Pagination.vue'
import TableSearch from './standard-table/components/Search.vue'
import { useStandardTableContext } from './standard-table/context'
import { KottiStandardTable } from './standard-table/types'
import { formatFilterValue } from './standard-table/utilities/filters'
import { useTableContext } from './table/context'

export default defineComponent({
	name: 'KtStandardTable',
	components: {
		TableColumns,
		TableFilters,
		TablePageSize,
		TablePagination,
		TableSearch,
	},
	props: makeProps(KottiStandardTable.propsSchema),
	emits: [
		'update:dataFetchDependencies',
		'update:pageIndex',
		'update:pageSize',
	],
	setup(props, { emit }) {
		// eslint-disable-next-line vue/no-setup-props-reactivity-loss
		const standardTableContext = useStandardTableContext(props.id)
		// eslint-disable-next-line vue/no-setup-props-reactivity-loss
		const tableContext = useTableContext(props.id)

		const appliedFilters = ref<KottiStandardTable.AppliedFilter[]>([])
		const searchValue = ref<string | null>(null) // TODO: type?

		const table = computed(() => tableContext.value.internal.table.value)
		const tablePagination = computed(() => table.value.getState().pagination)

		watch(
			[
				() => tableContext.value.internal.getOrdering(),
				tablePagination,
				searchValue,
			],
			([ordering, pagination, search]) => {
				if (
					standardTableContext.value.internal.paginationType ===
					KottiStandardTable.PaginationType.REMOTE
				) {
					emit('update:dataFetchDependencies', {
						ordering,
						pagination,
						search,
					})
				}
			},
			{ immediate: true },
		)

		return {
			appliedFilters,
			columnOptions: computed(() =>
				standardTableContext.value.internal.columns.map(({ id, label }) => ({
					key: id,
					label,
				})),
			),
			columnVisibility: computed(
				() =>
					tableContext.value.internal.table.value.getState().columnVisibility,
			),
			filters: computed(() => standardTableContext.value.internal.filters),
			formatAppliedFilter: ({
				id,
				value,
			}: KottiStandardTable.AppliedFilter) => {
				const filter = standardTableContext.value.internal.getFilter(id)

				if (!filter) {
					throw new Error(`filter not found for id "${id}"`)
				}

				const formattedValue = formatFilterValue(value, filter)

				return [filter.label, formattedValue].join(': ')
			},
			isLoading: computed(() => standardTableContext.value.internal.isLoading),
			onShowAllColumns: () => {
				tableContext.value.internal.table.value.toggleAllColumnsVisible()
			},
			onUpdateAppliedFilters: (value: KottiStandardTable.AppliedFilter[]) => {
				appliedFilters.value = value
			},
			onUpdateColumnVisivility: (
				value: KottiStandardTable.TableColumns.Props['value'],
			) => {
				tableContext.value.internal.table.value.setColumnVisibility(value)
			},
			onUpdatePageIndex: (value: number) => {
				table.value.setPageIndex(value)
				emit('update:pageIndex', value)
			},
			onUpdatePageSize: (value: number) => {
				table.value.setPageSize(value)
				emit('update:pageSize', value)
			},
			onUpdateSearchValue: (value: string | null) => {
				searchValue.value = value
			},
			pageIndex: computed(() => tablePagination.value.pageIndex),
			pageSize: computed(() => tablePagination.value.pageSize),
			pageSizeOptions: computed(
				() => standardTableContext.value.internal.pageSizeOptions,
			),
			rowCount: computed(() => table.value.getRowCount()),
			searchValue,
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-standard-table {
	display: flex;
	flex-direction: column;
	gap: var(--unit-4);

	&__actions {
		display: flex;
		gap: var(--unit-4);
		align-items: center;
	}

	&__applied-filters {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: left;
	}

	&__footer {
		display: flex;
		gap: var(--unit-4);
		align-items: center;

		> div {
			flex: 1 1 auto;
		}
	}

	&__header {
		display: flex;
		gap: var(--unit-4);
		align-items: center;

		h1 {
			margin-bottom: 0;
		}
	}

	&__info {
		display: flex;
		gap: var(--unit-4);
	}

	&__slot {
		margin-left: auto;
	}

	&__table {
		overflow: hidden;
		border: 1px solid var(--ui-02);
		border-radius: var(--unit-2);
	}

	&__table-actions {
		display: flex;
		flex: 1 1 auto;
		gap: var(--unit-4);
	}
}
</style>
