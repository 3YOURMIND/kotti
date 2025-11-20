<template>
	<div class="kt-filter__list">
		<i
			v-show="filters.length === 0 && !isAddingFilter"
			v-text="translations.emptyListLabel"
		/>
		<FilterRow
			v-for="(filter, index) in filters"
			:key="filter.key"
			:column="getColumn(filter.key)"
			:columnOptions="getColumnOptions(filter.key)"
			:dataTest="dataTest ? `${dataTest}.filter.${filter.key}` : null"
			:filter="filter"
			:isFirstItem="index === 0"
			:isLoading="isLoading"
			@remove="handleRemoveFilter(filter.key)"
			@update:modelValue="handleSetFilter(filter.key, $event)"
		/>
		<FilterRow
			v-if="isAddingFilter"
			:columnOptions="getColumnOptions()"
			:dataTest="dataTest ? `${dataTest}.addingFilter` : null"
			:isFirstItem="filters.length === 0"
			@remove="handleCancelAddFilter"
			@update:modelValue="handleAddFilter"
		/>
	</div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'

import type { KottiFieldSingleSelect } from '../../kotti-field-select/types'
import { useTranslationNamespace } from '../../kotti-i18n/hooks'
import type { KottiFilters } from '../types'
import { getFilterInitialState } from '../utils'

import FilterRow from './FilterRow.vue'

export default defineComponent({
	name: 'FilterList',
	components: {
		FilterRow,
	},
	props: {
		columns: {
			required: true,
			type: Array as PropType<KottiFilters.Column.Any[]>,
		},
		dataTest: {
			default: null,
			type: String,
		},
		filters: {
			required: true,
			type: Array as PropType<KottiFilters.InternalFilter[]>,
		},
		isAddingFilter: {
			default: false,
			type: Boolean,
		},
		isLoading: {
			default: false,
			type: Boolean,
		},
	},
	emits: ['endAddingFilter', 'update:modelValue'],
	setup(props, { emit }) {
		const currentFiltersKeys = computed<KottiFilters.InternalFilter['key'][]>(
			() => props.filters.map((filter) => filter.key),
		)

		const getColumn = (
			columnKey: KottiFilters.Column.Any['key'],
		): KottiFilters.Column.Any => {
			const column =
				props.columns.find((column) => column.key === columnKey) ?? null
			if (column === null)
				throw new Error('Invalid Filter Key: column not found')
			return column
		}
		const getColumnOptions = (
			selectedColumnKey?: KottiFilters.Column.Any['key'],
		): KottiFieldSingleSelect.Props['options'] =>
			props.columns
				.filter(
					(column) =>
						column.key === selectedColumnKey ||
						!currentFiltersKeys.value.includes(column.key),
				)
				.map((column) => ({
					label: column.label,
					value: column.key,
				}))

		const handleAddFilter = (filter: KottiFilters.InternalFilter): void => {
			const newFilter = getFilterInitialState(filter.key, props.columns)
			emit('update:modelValue', [...props.filters, newFilter])
			emit('endAddingFilter')
		}
		const handleCancelAddFilter = (): void => {
			emit('endAddingFilter')
		}
		const handleRemoveFilter = (
			filterKey: KottiFilters.InternalFilter['key'],
		): void => {
			const updatedFilters = props.filters.filter(
				(filter) => filter.key !== filterKey,
			)
			emit('update:modelValue', updatedFilters)
		}
		const handleSetFilter = (
			oldFilterKey: KottiFilters.InternalFilter['key'],
			newFilter: KottiFilters.InternalFilter,
		): void => {
			const updatedFilter = currentFiltersKeys.value.includes(newFilter.key)
				? newFilter
				: getFilterInitialState(newFilter.key, props.columns)

			const updatedFilters = props.filters.map((oldFilter) =>
				oldFilter.key === oldFilterKey ? updatedFilter : oldFilter,
			)
			emit('update:modelValue', updatedFilters)
		}

		return {
			getColumn,
			getColumnOptions,
			handleAddFilter,
			handleCancelAddFilter,
			handleRemoveFilter,
			handleSetFilter,
			translations: useTranslationNamespace('KtFilters'),
		}
	},
})
</script>

<style lang="scss" scoped>
@import '../../kotti-style/_variables';

.kt-filter__list {
	display: grid;
	grid-template-rows: auto;
	grid-template-columns: max-content repeat(3, 1fr) max-content;
	gap: var(--unit-1);
	width: 50vw;

	@media (width < $size-md) {
		grid-template-columns: auto max-content;
	}

	@media (width < $size-xl) {
		width: 60vw;
	}

	@media (width < $size-lg) {
		width: 75vw;
	}

	@media (width < $size-md) {
		width: 90vw;
	}

	@media (width < $size-sm) {
		width: 95vw;
	}
}
</style>
