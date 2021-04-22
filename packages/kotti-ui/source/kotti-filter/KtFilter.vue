<template>
	<div class="kt-filter">
		<Search
			v-if="hasSearchColumn"
			:column="searchColumn"
			:filter="searchValue"
			:isLoading="isLoading"
			@input="setSearchFilter"
		/>
		<div ref="filterListTriggerRef">
			<ButtonLink
				:icon="Yoco.Icon.FILTER"
				:isLoading="isLoading"
				:label="filterLabel"
			/>
		</div>
		<div ref="filterListContentRef">
			<FilterList
				:columns="filterListColumns"
				:filters="filterListValues"
				:isAddingFilter="isAddingFilter"
				:isLoading="isLoading"
				@endAddingFilter="isAddingFilter = false"
				@input="setFilters"
			/>
			<Actions
				:isLoading="isLoading"
				@addFilter="isAddingFilter = true"
				@clearAll="clearAll"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { useTippy } from '@3yourmind/vue-use-tippy'
import { Yoco } from '@3yourmind/yoco'
import { computed, defineComponent, ref } from '@vue/composition-api'
import { roundArrow } from 'tippy.js'

import { useTranslationNamespace } from '../kotti-translation/hooks'
import { Kotti } from '../types'

import Actions from './components/Actions.vue'
import ButtonLink from './components/ButtonLink.vue'
import FilterList from './components/FilterList.vue'
import Search from './components/Search.vue'

const ARROW_HEIGHT = 7

export default defineComponent<Kotti.Filter.InternalProps>({
	name: 'KtFilter',
	components: {
		Actions,
		ButtonLink,
		FilterList,
		Search,
	},
	props: {
		columns: {
			required: true,
			type: Array,
		},
		isLoading: {
			default: false,
			type: Boolean,
		},
		value: {
			required: true,
			type: Array,
		},
	},
	setup(props, { emit }) {
		const translations = useTranslationNamespace('KtFilter')

		const isAddingFilter = ref<boolean>(false)
		const filterListContentRef = ref<Element | null>(null)
		const filterListTriggerRef = ref<Element | null>(null)

		const filterListColumns = computed<Kotti.Filter.Column[]>(() =>
			props.columns.filter(
				(column) => column.type !== Kotti.Filter.FilterType.SEARCH,
			),
		)
		const searchColumn = computed<Kotti.Filter.Column | null>(
			() =>
				props.columns.find(
					(column) => column.type === Kotti.Filter.FilterType.SEARCH,
				) ?? null,
		)
		const searchValue = computed<Kotti.Filter.InternalFilter | null>(
			() =>
				props.value.find((filter) => filter.key === searchColumn.value?.key) ??
				null,
		)
		const filterListValues = computed<Kotti.Filter.Value>(() =>
			props.value.filter((filter) => filter.key !== searchColumn.value?.key),
		)
		const areActionsDisabled = computed(
			() =>
				isAddingFilter.value ||
				filterListValues.value.length >= filterListColumns.value.length,
		)
		const filterLabel = computed<string>(() => {
			const filtersCount = filterListValues.value.length
			const label =
				filtersCount > 1
					? translations.value.filtersLabel
					: translations.value.filterLabel
			if (filtersCount === 0) return label
			return `${filtersCount} ${label}`
		})
		const hasSearchColumn = computed(() => searchColumn.value !== null)

		const clearAll = () => emit('input', [])
		const setFilters = (filters: Kotti.Filter.Value) => {
			if (searchValue.value === null) {
				emit('input', filters)
				return
			}
			emit('input', [...filters, searchValue.value])
		}
		const setSearchFilter = (searchFilter: Kotti.Filter.InternalFilter) => {
			if (hasSearchColumn.value) {
				if (searchFilter.value === null) {
					emit('input', filterListValues.value)
					return
				}
				emit('input', [...filterListValues.value, searchFilter])
			}
		}

		useTippy(
			filterListTriggerRef,
			computed(() => ({
				appendTo: () => document.body,
				arrow: roundArrow,
				content: filterListContentRef.value,
				hideOnClick: true,
				interactive: true,
				maxWidth: 'none',
				offset: [0, ARROW_HEIGHT],
				placement: 'bottom',
				theme: 'light-border',
				trigger: 'click',
				zIndex: 1000,
			})),
		)

		return {
			areActionsDisabled,
			clearAll,
			filterListColumns,
			filterLabel,
			filterListValues,
			filterListContentRef,
			filterListTriggerRef,
			hasSearchColumn,
			isAddingFilter,
			searchColumn,
			searchValue,
			setFilters,
			setSearchFilter,
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
@import '../kotti-style/_variables.scss';

.kt-filter {
	display: flex;
	align-items: center;
}
</style>
