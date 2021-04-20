<template>
	<div class="kt-filter">
		<div v-if="hasSearchColumn" class="kt-filter__search-field">
			<Search
				:column="searchColumn"
				:filter="searchValue"
				:isLoading="isLoading"
				@input="setSearchFilter"
			/>
		</div>
		<div ref="filterListTriggerRef">
			<ButtonLink :icon="Yoco.Icon.FILTER" :label="filterLabel" />
		</div>
		<div ref="filterListContentRef" class="kt-filter__filter-list">
			<FilterList
				:columns="filterListColumns"
				:filters="filterListValues"
				:isLoading="isLoading"
				@input="setFilters"
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

import ButtonLink from './components/ButtonLink.vue'
import FilterList from './components/FilterList.vue'
import Search from './components/Search.vue'

const ARROW_HEIGHT = 7

export default defineComponent<Kotti.Filter.InternalProps>({
	name: 'KtFilter',
	components: {
		ButtonLink,
		FilterList,
		Search,
	},
	props: {
		columns: {
			default: () => [],
			type: Array,
		},
		isLoading: {
			default: false,
			type: Boolean,
		},
		value: {
			default: () => [],
			type: Array,
		},
	},
	setup(props, { emit }) {
		const translations = useTranslationNamespace('KtFilter')

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
		const filterLabel = computed<string>(() => {
			const filtersCount = Object.keys(filterListValues.value).length
			const label =
				filtersCount > 1
					? translations.value.filtersLabel
					: translations.value.filterLabel
			if (filtersCount === 0) return label
			return `${filtersCount} ${label}`
		})
		const hasSearchColumn = computed<boolean>(() => searchColumn.value !== null)

		const setFilters = (filters: Kotti.Filter.Value) => {
			if (searchValue.value === null) {
				emit('input', filters)
				return
			}
			emit('input', [...filters, searchValue.value])
		}
		const setSearchFilter = (searchFilter: Kotti.Filter.InternalFilter) => {
			if (hasSearchColumn.value) {
				if (searchFilter?.value === null) {
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
			filterListColumns,
			filterLabel,
			filterListValues,
			filterListContentRef,
			filterListTriggerRef,
			hasSearchColumn,
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
	width: fit-content;

	&__filter-list {
		width: 40vw; // TODO remove fixed width and make it responsive
	}

	&__search-field {
		width: 12rem;
		padding-right: 0.5rem;
	}
}
</style>
