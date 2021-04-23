<template>
	<div class="kt-filter">
		<Search
			v-if="hasSearchColumn"
			:column="searchColumn"
			:filter="searchValue"
			:isLoading="isLoading"
			@input="setSearchFilter"
		/>
		<div ref="listTriggerRef">
			<ButtonLink
				:icon="Yoco.Icon.FILTER"
				:isLoading="isLoading"
				:label="filterLabel"
				@click="toggleListVisibility"
			/>
		</div>
		<div ref="listContentRef">
			<FilterList
				:columns="filterListColumns"
				:filters="filterListValues"
				:isAddingFilter="isAddingFilter"
				:isLoading="isLoading"
				@endAddingFilter="isAddingFilter = false"
				@input="setFilters"
			/>
			<Actions
				:isDisabled="areActionsDisabled"
				:isLoading="isLoading"
				@clearAll="clearAll"
				@startAddingFilter="isAddingFilter = true"
			/>
		</div>
		<div
			v-if="isListVisible"
			class="kt-filter__background"
			@click="toggleListVisibility"
		/>
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
			validator: (value: Kotti.Filter.InternalProps['columns']) =>
				value.every(
					(column) =>
						Array.isArray(column.operations) &&
						column.operations.length > 0 &&
						typeof column.key === 'string' &&
						column.key.length > 0 &&
						typeof column.label === 'string' &&
						column.label.length > 0,
				),
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

		const listContentRef = ref<Element | null>(null)
		const listTriggerRef = ref<Element | null>(null)
		const isAddingFilter = ref<boolean>(false)
		const isListVisible = ref<boolean>(false)
		const tippyInstanceRef = ref(null)

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

		const clearAll = () => {
			if (searchValue.value === null) {
				emit('input', [])
				return
			}
			emit('input', [searchValue.value])
		}
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
		const toggleListVisibility = () => {
			isListVisible.value = !isListVisible.value
			if (isListVisible.value) tippyInstanceRef.value.show()
			else {
				tippyInstanceRef.value.hide()
				isAddingFilter.value = false
			}
		}

		useTippy(
			listTriggerRef,
			computed(() => ({
				appendTo: () => document.body,
				arrow: roundArrow,
				content: listContentRef.value,
				hideOnClick: false,
				interactive: true,
				maxWidth: 'none',
				offset: [0, ARROW_HEIGHT],
				onCreate(instance) {
					tippyInstanceRef.value = instance
				},
				placement: 'bottom',
				theme: 'light-border',
				trigger: 'manual',
				zIndex: 1000,
			})),
		)

		return {
			areActionsDisabled,
			clearAll,
			filterListColumns,
			filterLabel,
			filterListValues,
			hasSearchColumn,
			isAddingFilter,
			isListVisible,
			listContentRef,
			listTriggerRef,
			searchColumn,
			searchValue,
			setFilters,
			setSearchFilter,
			toggleListVisibility,
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

	&__background {
		position: fixed;
		top: 0;
		left: 0;

		z-index: 900;
		width: 100vw;

		height: 100vh;
	}
}
</style>
