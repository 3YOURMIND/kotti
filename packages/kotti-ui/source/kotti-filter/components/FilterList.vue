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
			:isFirstItem="index === 0"
			:isLoading="isLoading"
			:value="filter"
			@input="handleSetFilter(filter.key, $event)"
			@remove="handleRemoveFilter(filter.key)"
		/>
		<FilterRow
			v-if="isAddingFilter"
			:columnOptions="getColumnOptions()"
			:isFirstItem="filters.length === 0"
			@input="handleAddFilter"
			@remove="isAddingFilter = false"
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
	columns: Kotti.Filter.Column[]
	filters: Kotti.Filter.InternalFilter[]
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
		const filtersKeys = computed<Kotti.Filter.InternalFilter['key'][]>(() =>
			props.filters.map((filter) => filter.key),
		)

		const getColumn = (
			columnKey: Kotti.Filter.Column['key'],
		): Kotti.Filter.Column => {
			const column =
				props.columns.find((column) => column.key === columnKey) ?? null
			if (column === null)
				throw new Error('Invalid Filter Key: column not found')
			return column
		}
		const getColumnOptions = (
			selectedColumnKey: Kotti.Filter.Column['key'] | undefined,
		): Kotti.FieldSingleSelect.Props['options'] =>
			props.columns
				.filter(
					(column) =>
						column.key === selectedColumnKey ||
						!filtersKeys.value.includes(column.key),
				)
				.map((column) => ({
					label: column.label,
					value: column.key,
				}))

		const handleAddFilter = (filter: Kotti.Filter.InternalFilter) => {
			const newFilter = getFilterInitialState(filter.key, props.columns)
			if (!newFilter) return
			emit('input', [...props.filters, newFilter])
			emit('endAddingFilter')
		}
		const handleRemoveFilter = (
			filterKey: Kotti.Filter.InternalFilter['key'],
		) => {
			const updatedFilters = props.filters.filter(
				(filter) => filter.key !== filterKey,
			)
			emit('input', updatedFilters)
		}
		const handleSetFilter = (
			filterKey: Kotti.Filter.InternalFilter['key'],
			filter: Kotti.Filter.InternalFilter,
		) => {
			const updatedFilters = props.filters.map((item) => {
				if (item.key === filterKey) {
					return filtersKeys.value.includes(filter.key)
						? filter
						: getFilterInitialState(filter.key, props.columns)
				}
				return item
			})
			emit('input', updatedFilters)
		}

		return {
			getColumn,
			getColumnOptions,
			handleAddFilter,
			handleRemoveFilter,
			handleSetFilter,
			Kotti,
			translations: useTranslationNamespace('KtFilter'),
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
	grid-template-columns: max-content repeat(3, 8fr) max-content;
	grid-gap: $unit-1;

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
