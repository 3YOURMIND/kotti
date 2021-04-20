<template>
	<div class="kt-filter-list">
		<div class="kt-filter-list__content">
			<span
				v-show="filters.length === 0 && !isAddingFilter"
				v-text="translations.emptyListLabel"
			/>
			<div
				v-for="(filter, index) in filters"
				:key="filter.key"
				class="kt-filter-list__filter-row"
			>
				<FilterRow
					:column="getColumn(filter.key)"
					:columnOptions="getColumnOptions(filter.key)"
					:isFirstItem="index === 0"
					:isLoading="isLoading"
					:value="filter"
					@input="handleSetFilter(filter.key, $event)"
					@remove="handleRemoveFilter(filter.key)"
				/>
			</div>
			<div v-if="isAddingFilter" class="kt-filter-list__filter-row">
				<FilterRow
					:columnOptions="getColumnOptions()"
					:isFirstItem="filters.length === 0"
					@input="handleAddFilter"
					@remove="isAddingFilter = false"
				/>
			</div>
		</div>
		<div class="kt-filter-list__footer">
			<ButtonLink
				:disabled="isAddingFilter || filters.length >= columns.length"
				:label="translations.addFilterLabel"
				@click="isAddingFilter = true"
			/>
			<ButtonLink
				:disabled="filters.length === 0"
				:label="translations.clearAllLabel"
				@click="handleClearAll"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { computed, defineComponent, ref } from '@vue/composition-api'

import { useTranslationNamespace } from '../../kotti-translation/hooks'
import { Kotti } from '../../types'

import { getFilterInitialState } from './../utils'
import ButtonLink from './ButtonLink.vue'
import FilterRow from './FilterRow.vue'

export default defineComponent<{
	columns: Kotti.Filter.Column[]
	filters: Kotti.Filter.InternalFilter[]
	isLoading: boolean
}>({
	name: 'FilterList',
	components: {
		ButtonLink,
		FilterRow,
	},
	props: {
		columns: {
			default: () => [],
			type: Array,
		},
		filters: {
			default: () => [],
			type: Array,
		},
		isLoading: {
			default: false,
			type: Boolean,
		},
	},
	setup(props, { emit }) {
		const isAddingFilter = ref<boolean>(false)

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
			selectedColumnKey: Kotti.Filter.Column['key'],
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
			isAddingFilter.value = false
		}
		const handleClearAll = () => emit('input', [])
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
			handleClearAll,
			handleRemoveFilter,
			handleSetFilter,
			isAddingFilter,
			translations: useTranslationNamespace('KtFilter'),
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
@import '../../kotti-style/_variables.scss';

.kt-filter-list {
	width: 100%;
	max-height: 100%;
	background-color: #fff;

	&__content {
		display: flex;
		flex-direction: column;
		padding: $unit-3 $unit-3 0;
	}

	&__filter-row {
		padding-bottom: $unit-1;
	}

	&__footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: $unit-3;
	}
}
</style>
