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
				$slots['control-actions'] ||
				inlineFilters.length > 0
			"
			class="kt-standard-table__controls"
		>
			<div v-if="!hideTableActions" class="kt-standard-table__table-actions">
				<TableSearch
					v-if="!options?.hideControls?.search"
					class="kt-standard-table__search-input"
					dataTest="table-search-input"
					:isLoading="isLoadingAndEmpty"
					:modelValue="searchValue"
					:placeholder="options?.searchPlaceholder ?? translations.search"
					size="small"
					@update:modelValue="onUpdateSearchValue"
				/>
				<TableFilters
					v-if="!options?.hideControls?.filters"
					:appliedFilters="appliedFilters"
					:filters="popoverFilters"
					:isLoading="isLoadingAndEmpty"
					:size="options?.popoversSize?.filters"
					@update:appliedFilters="onUpdateAppliedFilters"
				/>
				<KtColumnSelector
					v-if="!options?.hideControls?.columns"
					:canChangeColumnOrder="canChangeColumnOrder"
					canSearchColumn
					:categories="columnOptions"
					dataTest="table-column-edit"
					:isLoading="isLoadingAndEmpty"
					:selection="columnSelection"
					:size="options?.popoversSize?.columns"
					@update:selection="onUpdateColumnSelection"
				>
					<template #footer>
						<KtButton
							data-test="table-column-show-all-button"
							:disabled="isShowAllColumnsDisabled"
							:label="translations.showAll"
							type="text"
							@click="onShowAllColumns"
						/>
					</template>
				</KtColumnSelector>
			</div>
			<div class="kt-standard-table__right-aligned-container">
				<div v-if="$slots['control-actions']" class="kt-standard-table__slot">
					<slot name="control-actions" />
				</div>
				<FilterList
					v-if="inlineFilters.length > 0"
					class="kt-standard-table__inline-filters"
					:filters="inlineFilters"
					:isLoading="isLoadingAndEmpty"
					:value="appliedFilters"
					@input="onUpdateAppliedFilters"
				/>
			</div>
		</div>
		<div
			v-if="filterTags.length > 0 || $slots['applied-filter-actions']"
			class="kt-standard-table__info"
		>
			<div
				v-if="filterTags.length > 0 && !isLoadingAndEmpty"
				class="kt-standard-table__applied-filters"
			>
				<KtTag
					v-for="({ label, value }, index) in filterTags"
					:key="index"
					class="kt-standard-table__applied-filter-tag"
					isDisabled
					:label="label"
					:text="value"
				/>
			</div>
			<div
				v-if="$slots['applied-filter-actions']"
				class="kt-standard-table__slot"
			>
				<slot name="applied-filter-actions" />
			</div>
		</div>
		<TableGlobalSelection
			v-show="showGlobalSelection"
			:selectionCount="selectionCount"
			@emptySelection="unselectAllRows"
		/>
		<slot
			v-if="$slots['table']"
			:emptyText="emptyText"
			:isLoading="isLoading"
			name="table"
			:rows="tableRows"
			:tableId="tableId"
			:tableProps="{ emptyText, isLoading, tableId }"
		/>
		<KtTable
			v-else
			:emptyText="emptyText"
			:isLoading="isLoading"
			:tableId="tableId"
		/>
		<div class="kt-standard-table__footer">
			<TablePageSize
				v-bind="{
					isLoading,
					pageSize,
					pageSizeOptions,
				}"
				@update:pageSize="onUpdatePageSize"
			/>
			<TablePagination
				v-bind="{
					isLoading,
					pageIndex,
					pageSize,
					rowCount,
				}"
				@update:pageIndex="onUpdatePageIndex"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue'

import { KtButton } from '../kotti-button'
import { useTranslationNamespace } from '../kotti-i18n/hooks'
import { KtTag } from '../kotti-tag'
import { makeProps } from '../make-props'

import TableSearch from './components/SearchInput.vue'
import KtColumnSelector from './KtColumnSelector.vue'
import KtTable from './KtTable.vue'
import FilterList from './standard-table/components/FilterList.vue'
import TableFilters from './standard-table/components/Filters.vue'
import TableGlobalSelection from './standard-table/components/GlobalSelection.vue'
import TablePageSize from './standard-table/components/PageSize.vue'
import TablePagination from './standard-table/components/Pagination.vue'
import { useStandardTableContext } from './standard-table/context'
import { KottiStandardTable } from './standard-table/types'
import { formatFilterValue } from './standard-table/utilities/filters'
import { useTableContext } from './table/context'
import type { KottiColumnSelector } from './types'

export default defineComponent({
	name: 'KtStandardTable',
	components: {
		FilterList,
		KtButton,
		KtColumnSelector,
		KtTable,
		KtTag,
		TableFilters,
		TableGlobalSelection,
		TablePageSize,
		TablePagination,
		TableSearch,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} as any,
	props: makeProps(KottiStandardTable.propsSchema),
	emits: ['update:fetchData'],
	setup(props, { emit }) {
		// eslint-disable-next-line vue/no-setup-props-reactivity-loss
		const standardTableContext = useStandardTableContext(props.tableId)
		// eslint-disable-next-line vue/no-setup-props-reactivity-loss
		const tableContext = useTableContext(props.tableId)

		const appliedFilters = computed(
			() => standardTableContext.value.internal.appliedFilters,
		)
		const isLoading = computed(
			() => standardTableContext.value.internal.isLoading,
		)
		const searchValue = computed(
			() => standardTableContext.value.internal.searchValue,
		)

		const filters = computed(() => standardTableContext.value.internal.filters)
		const tablePagination = computed(
			() => standardTableContext.value.internal.pagination,
		)
		const options = computed(() => standardTableContext.value.internal.options)

		watch(
			[
				appliedFilters,
				() => tableContext.value.internal.getOrdering(),
				tablePagination,
				searchValue,
			],
			([filters, ordering, pagination, search]) => {
				emit('update:fetchData', {
					filters,
					ordering,
					pagination,
					search,
				})
			},
			{ immediate: true },
		)

		return {
			appliedFilters,
			canChangeColumnOrder: computed(
				() => standardTableContext.value.internal.hasDragAndDrop,
			),
			columnOptions: computed<KottiColumnSelector.Category[]>(() => [
				{
					label: null,
					options: standardTableContext.value.internal.columns.map(
						({ id, label }) => ({
							key: id,
							label,
						}),
					),
				},
			]),
			columnSelection: computed(
				() => standardTableContext.value.internal.columnOrder,
			),
			columnsInOrder: computed(() => tableContext.value),
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
			isLoading,
			isLoadingAndEmpty: computed(
				() =>
					isLoading.value &&
					tableContext.value.internal.table.getRowModel().rows.length === 0,
			),
			isShowAllColumnsDisabled: computed(
				(): boolean =>
					isLoading.value ||
					Object.values(tableContext.value.internal.visibleColumns).every(
						(optionValue) => optionValue,
					),
			),
			onShowAllColumns: () => {
				tableContext.value.internal.table.toggleAllColumnsVisible()
			},
			onUpdateAppliedFilters: (value: KottiStandardTable.AppliedFilter[]) => {
				standardTableContext.value.internal.setAppliedFilters(value)
				standardTableContext.value.internal.setPageIndex(0)
			},
			onUpdateColumnSelection: (value: string[]) => {
				standardTableContext.value.internal.setColumnSelection(value)
			},
			onUpdatePageIndex: standardTableContext.value.internal.setPageIndex,
			onUpdatePageSize: standardTableContext.value.internal.setPageSize,
			onUpdateSearchValue: (value: string | null) => {
				standardTableContext.value.internal.setSearchValue(value)
				standardTableContext.value.internal.setPageIndex(0)
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
			rowCount: computed(() => standardTableContext.value.internal.rowCount),
			searchValue,
			selectionCount: computed(
				() => tableContext.value.internal.selectionCount,
			),
			showGlobalSelection: computed(
				() =>
					standardTableContext.value.internal.selectMode === 'global' &&
					tableContext.value.internal.selectionCount > 0,
			),
			tableRows: computed(() =>
				tableContext.value.internal.table
					.getRowModel()
					.rows.map((row) => row.original),
			),
			translations: useTranslationNamespace('KtStandardTable'),
			unselectAllRows: tableContext.value.internal.unselectAllRows,
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
		gap: 4px;
		align-items: center;
		justify-content: left;
	}

	&__applied-filter-tag {
		margin: 0;
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

	&__search-input {
		flex: 1 1 auto;
		min-width: 8rem;
		max-width: 10rem;
	}

	&__slot {
		margin-left: auto;
	}

	&__table-actions {
		display: flex;
		flex: 1 1 auto;
		gap: var(--unit-4);
	}
}
</style>
