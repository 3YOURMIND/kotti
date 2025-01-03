<template>
	<div class="kt-filter">
		<FilterSearch
			v-if="searchColumn !== null"
			:column="searchColumn"
			:dataTest="dataTest"
			:filter="searchValue"
			:isLoading="isLoading"
			@input="setSearchFilter"
		/>
		<div ref="listTriggerRef">
			<ButtonLink
				:dataTest="dataTest ? `${dataTest}.showFilters` : undefined"
				:icon="Yoco.Icon.FILTER"
				:isLoading="isLoading"
				:label="filterLabel"
				@click="toggleListVisibility"
			/>
		</div>
		<div ref="listContentRef">
			<FilterList
				:columns="filterListColumns"
				:dataTest="dataTest"
				:filters="filterListValues"
				:isAddingFilter="isAddingFilter"
				:isLoading="isLoading"
				@endAddingFilter="isAddingFilter = false"
				@input="setFilters"
			/>
			<FilterActions
				:dataTest="dataTest"
				:isAddDisabled="isAddDisabled"
				:isClearAllDisabled="isClearAllDisabled"
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
import castArray from 'lodash/castArray.js'
import type { PropType } from 'vue'
import { computed, defineComponent, ref } from 'vue'

import { useTippy } from '@3yourmind/vue-use-tippy'
import { Yoco } from '@3yourmind/yoco'

import { TIPPY_DISTANCE_OFFSET } from '../constants'
import { useTranslationNamespace } from '../kotti-i18n/hooks'

import ButtonLink from './components/ButtonLink.vue'
import FilterActions from './components/FilterActions.vue'
import FilterList from './components/FilterList.vue'
import FilterSearch from './components/FilterSearch.vue'
import { KottiFilters } from './types'
import { isValidColumn } from './validators'

export default defineComponent({
	name: 'KtFilters',
	components: {
		ButtonLink,
		FilterActions,
		FilterList,
		FilterSearch,
	},
	props: {
		columns: {
			required: true,
			type: Array as PropType<KottiFilters.PropsInternal['columns']>,
			validator: (
				value: unknown,
			): value is KottiFilters.PropsInternal['columns'] => {
				return (
					Array.isArray(value) && value.every((column) => isValidColumn(column))
				)
			},
		},
		dataTest: {
			default: null,
			type: String,
		},
		isLoading: {
			default: false,
			type: Boolean,
		},
		value: {
			required: true,
			type: Array as PropType<KottiFilters.PropsInternal['value']>,
		},
	},
	emits: ['input'],
	setup(props, { emit }) {
		const translations = useTranslationNamespace('KtFilters')

		const listContentRef = ref<Element | null>(null)
		const listTriggerRef = ref<Element | null>(null)
		const isAddingFilter = ref<boolean>(false)
		const isListVisible = ref<boolean>(false)

		const filterListColumns = computed<KottiFilters.Column.Any[]>(() =>
			props.columns.filter(
				(column) => column.type !== KottiFilters.FilterType.SEARCH,
			),
		)

		const searchColumn = computed(
			() =>
				props.columns.find(
					(column) => column.type === KottiFilters.FilterType.SEARCH,
				) ?? null,
		)

		const searchValue = computed<KottiFilters.InternalFilterSearch | null>(
			() =>
				(props.value.find((filter) => filter.key === searchColumn.value?.key) ??
					null) as KottiFilters.InternalFilterSearch | null,
		)

		const filterListValues = computed<KottiFilters.Value>(() =>
			props.value.filter((filter) => filter.key !== searchColumn.value?.key),
		)
		const isAddDisabled = computed(
			() =>
				isAddingFilter.value ||
				filterListValues.value.length >= filterListColumns.value.length,
		)
		const isClearAllDisabled = computed(
			() => isAddingFilter.value || filterListValues.value.length === 0,
		)
		const filterLabel = computed<string>(() => {
			const filtersCount = filterListValues.value.length
			const label =
				filtersCount > 1
					? translations.value.filtersLabel
					: translations.value.filterLabel
			if (filtersCount === 0) return label
			return `${String(filtersCount)} ${label}`
		})

		const clearAll = () => {
			if (searchValue.value === null) {
				emit('input', [])
				return
			}
			emit('input', [searchValue.value])
		}
		const setFilters = (filters: KottiFilters.Value) => {
			if (searchValue.value === null) {
				emit('input', filters)
				return
			}
			emit('input', [...filters, searchValue.value])
		}
		const setSearchFilter = (searchFilter: KottiFilters.InternalFilter) => {
			if (searchColumn.value !== null) {
				if (searchFilter.value === null) {
					emit('input', filterListValues.value)
					return
				}
				emit('input', [...filterListValues.value, searchFilter])
			}
		}

		const { tippy } = useTippy(
			listTriggerRef,
			computed(() => ({
				appendTo: () => document.body,
				arrow: false,
				content: listContentRef.value ?? undefined,
				hideOnClick: false,
				interactive: true,
				maxWidth: 'none',
				offset: [0, TIPPY_DISTANCE_OFFSET],
				placement: 'bottom',
				theme: 'light-border',
				trigger: 'manual',
				zIndex: 1000,
			})),
		)

		const toggleListVisibility = () => {
			if (tippy.value === null) return

			const tippys = castArray(tippy.value)

			isListVisible.value = !isListVisible.value

			if (!isListVisible.value) {
				isAddingFilter.value = false
			}

			for (const tippy of tippys) {
				if (isListVisible.value) tippy.show()
				else tippy.hide()
			}
		}

		return {
			clearAll,
			filterLabel,
			filterListColumns,
			filterListValues,
			isAddDisabled,
			isAddingFilter,
			isClearAllDisabled,
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
		inset: 0;
		z-index: 999;
	}
}
</style>
