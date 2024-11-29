<template>
	<div class="kt-standard-table">
		<div
			v-if="title || $slots['header-actions']"
			class="kt-standard-table__header"
		>
			<h1 v-if="title" v-text="title" />
			<div v-if="$slots['header-actions']" class="kt-standard-table__slot">
				<slot name="header-actions" />
			</div>
		</div>
		<div
			v-if="
				!hideTableActions ||
				$slots['controls-actions'] ||
				inlineFilters.length > 0
			"
			class="kt-standard-table__controls"
		>
			<div v-if="!hideTableActions" class="kt-standard-table__table-actions">
				<TableSearch
					v-if="!options?.hideControls?.search"
					:isLoading="isLoading"
					:placeholder="options?.searchPlaceholder"
					:value="searchValue"
					@input="onUpdateSearchValue"
				/>
				<TableFilters
					v-if="!options?.hideControls?.filters"
					:filters="popoverFilters"
					:isLoading="isLoading"
					:size="options?.popoversSize?.filters"
					:value="appliedFilters"
					@input="onUpdateAppliedFilters"
				/>
				<TableColumns
					v-if="!options?.hideControls?.columns"
					:isLoading="isLoading"
					:options="columnOptions"
					:size="options?.popoversSize?.columns"
					:value="columnVisibility"
					@input="onUpdateColumnVisivility"
					@showAll="onShowAllColumns"
				/>
			</div>
			<div class="kt-standard-table__right-aligned-container">
				<div v-if="$slots['controls-actions']" class="kt-standard-table__slot">
					<slot name="controls-actions" />
				</div>
				<FilterList
					v-if="inlineFilters.length > 0"
					class="kt-standard-table__inline-filters"
					:filters="inlineFilters"
					:isLoading="isLoading"
					:value="appliedFilters"
					@input="onUpdateAppliedFilters"
				/>
			</div>
		</div>
		<div
			v-if="filterTags.length > 0 || $slots['info-actions']"
			class="kt-standard-table__info"
		>
			<div
				v-if="filterTags.length > 0 && !isLoading"
				class="kt-standard-table__applied-filters"
			>
				<KtTag
					v-for="({ label, value }, index) in filterTags"
					:key="index"
					isDisabled
					:text="`${label}: ${value}`"
				/>
			</div>
			<div v-if="$slots['info-actions']" class="kt-standard-table__slot">
				<slot name="info-actions" />
			</div>
		</div>
		<div>
			<slot v-if="$slots['table']" name="table" />
			<KtTable
				v-else
				class="kt-standard-table__table"
				:isLoading="isLoading"
				:tableId="tableId"
			/>
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

import type { KottiFieldText } from '../kotti-field-text/types'
import { makeProps } from '../make-props'

import TableColumns from './standard-table/components/Columns.vue'
import FilterList from './standard-table/components/FilterList.vue'
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
		FilterList,
		TableColumns,
		TableFilters,
		TablePageSize,
		TablePagination,
		TableSearch,
	},
	props: makeProps(KottiStandardTable.propsSchema),
	emits: ['update:dataFetchDependencies'],
	setup(props, { emit }) {
		// eslint-disable-next-line vue/no-setup-props-reactivity-loss
		const standardTableContext = useStandardTableContext(props.tableId)
		// eslint-disable-next-line vue/no-setup-props-reactivity-loss
		const tableContext = useTableContext(props.tableId)

		const appliedFilters = ref<KottiStandardTable.AppliedFilter[]>([])
		const searchValue = ref<KottiFieldText.Value>(null)

		const filters = computed(() => standardTableContext.value.internal.filters)
		const table = computed(() => tableContext.value.internal.table.value)
		const tablePagination = computed(() => table.value.getState().pagination)
		const options = computed(() => standardTableContext.value.internal.options)

		watch(
			[
				appliedFilters,
				() => tableContext.value.internal.getOrdering(),
				tablePagination,
				searchValue,
			],
			([filters, ordering, pagination, search]) => {
				if (
					standardTableContext.value.internal.paginationType ===
					KottiStandardTable.PaginationType.REMOTE
				) {
					emit('update:dataFetchDependencies', {
						filters,
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
			filterTags: computed(() =>
				appliedFilters.value
					.map(({ id, value }) => {
						const filter = standardTableContext.value.internal.getFilter(id)

						if (!filter) {
							throw new Error(`filter not found for id "${id}"`)
						}

						const formattedValue = formatFilterValue(value, filter)

						return {
							label: filter.label,
							value: formattedValue,
						}
					})
					.filter(({ value }) => value.length > 0),
			),
			hideTableActions: computed(
				() =>
					options.value?.hideControls?.columns &&
					options.value.hideControls.filters &&
					options.value.hideControls.search,
			),
			inlineFilters: computed(() =>
				filters.value.filter((filter) => filter.displayInline),
			),
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
			},
			onUpdatePageSize: (value: number) => {
				table.value.setPageSize(value)
			},
			onUpdateSearchValue: (value: KottiFieldText.Value) => {
				searchValue.value = value
			},
			options,
			pageIndex: computed(() => tablePagination.value.pageIndex),
			pageSize: computed(() => tablePagination.value.pageSize),
			pageSizeOptions: computed(
				() => standardTableContext.value.internal.pageSizeOptions,
			),
			popoverFilters: computed(() =>
				filters.value.filter((filter) => !filter.displayInline),
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

	&__applied-filters {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: left;
	}

	&__controls {
		display: flex;
		gap: var(--unit-4);
		align-items: center;
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

	&__inline-filters {
		min-width: 9rem;

		:deep(.kt-field__wrapper) {
			.kt-field__header {
				display: none;
			}
		}
	}

	&__right-aligned-container {
		display: flex;
		gap: 0.8rem;
		gap: var(--unit-4);
		align-items: center;
		margin-left: auto;
	}

	&__slot {
		margin-left: auto;
	}

	&__table {
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
