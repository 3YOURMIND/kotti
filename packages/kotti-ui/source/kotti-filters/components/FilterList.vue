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
			:filter="filter"
			:isFirstItem="index === 0"
			:isLoading="isLoading"
			@input="handleSetFilter(filter.key, $event)"
			@remove="handleRemoveFilter(filter.key)"
		/>
		<FilterRow
			v-if="isAddingFilter"
			:columnOptions="getColumnOptions()"
			:isFirstItem="filters.length === 0"
			@input="handleAddFilter"
			@remove="handleCancelAddFilter"
		/>
	</div>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { computed, defineComponent } from '@vue/composition-api'

import { useTranslationNamespace } from '../../kotti-translation/hooks'
import { Kotti } from '../../types'
import { getFilterInitialState } from '../utils'

import ButtonLink from './ButtonLink.vue'
import FilterRow from './FilterRow.vue'

export default defineComponent<{
	columns: Kotti.Filters.Column.Any[]
	filters: Kotti.Filters.InternalFilter[]
	isAddingFilter: boolean
	isLoading: boolean
}>({
	name: 'FilterList',
	components: {
		ButtonLink,
		FilterRow,
	},
	props: {
		columns: {
			required: true,
			type: Array,
		},
		filters: {
			required: true,
			type: Array,
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
	setup(props, { emit }) {
		const currentFiltersKeys = computed<Kotti.Filters.InternalFilter['key'][]>(
			() => props.filters.map((filter) => filter.key),
		)

		const getColumn = (
			columnKey: Kotti.Filters.Column.Any['key'],
		): Kotti.Filters.Column.Any => {
			const column =
				props.columns.find((column) => column.key === columnKey) ?? null
			if (column === null)
				throw new Error('Invalid Filter Key: column not found')
			return column
		}
		const getColumnOptions = (
			selectedColumnKey: Kotti.Filters.Column.Any['key'] | undefined,
		): Kotti.FieldSingleSelect.Props['options'] =>
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

		const handleAddFilter = (filter: Kotti.Filters.InternalFilter) => {
			const newFilter = getFilterInitialState(filter.key, props.columns)
			if (!newFilter) return
			emit('input', [...props.filters, newFilter])
			emit('endAddingFilter')
		}
		const handleCancelAddFilter = () => {
			emit('endAddingFilter')
		}
		const handleRemoveFilter = (
			filterKey: Kotti.Filters.InternalFilter['key'],
		) => {
			const updatedFilters = props.filters.filter(
				(filter) => filter.key !== filterKey,
			)
			emit('input', updatedFilters)
		}
		const handleSetFilter = (
			oldFilterKey: Kotti.Filters.InternalFilter['key'],
			newFilter: Kotti.Filters.InternalFilter,
		) => {
			const updatedFilter = currentFiltersKeys.value.includes(newFilter.key)
				? newFilter
				: getFilterInitialState(newFilter.key, props.columns)

			const updatedFilters = props.filters.map((oldFilter) =>
				oldFilter.key === oldFilterKey ? updatedFilter : oldFilter,
			)
			emit('input', updatedFilters)
		}

		return {
			getColumn,
			getColumnOptions,
			handleAddFilter,
			handleCancelAddFilter,
			handleRemoveFilter,
			handleSetFilter,
			Kotti,
			translations: useTranslationNamespace('KtFilters'),
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
@import '../../kotti-style/_variables.scss';

.kt-filter__list {
	display: grid;
	grid-template-rows: auto;
	grid-template-columns: max-content repeat(3, 1fr) max-content;
	grid-gap: var(--unit-1);

	width: 50vw;

	@media (max-width: $size-md) {
		grid-template-columns: auto max-content;
	}

	@media (max-width: $size-xl) {
		width: 60vw;
	}
	@media (max-width: $size-lg) {
		width: 75vw;
	}
	@media (max-width: $size-md) {
		width: 90vw;
	}
	@media (max-width: $size-sm) {
		width: 95vw;
	}
}
</style>
