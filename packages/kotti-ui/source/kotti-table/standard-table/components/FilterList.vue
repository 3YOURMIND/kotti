<template>
	<ScrollableContainer class="filter-list">
		<component
			:is="getComponent(filter)"
			v-for="(filter, index) in filters"
			:key="index"
			:filter="filter"
			:isLoading="isLoading"
			:modelValue="getValue(filter)"
			@update:modelValue="onUpdateModelValue"
		/>
	</ScrollableContainer>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

import ScrollableContainer from '../../../shared-components/ScrollableContainer.vue'
import { KottiStandardTable } from '../types'
import { getEmptyValue, isEmptyValue } from '../utilities/filters'

import BooleanFilter from './filters/Boolean.vue'
import DateRangeFilter from './filters/DateRange.vue'
import MultiSelectFilter from './filters/MultiSelect.vue'
import NumberRangeFilter from './filters/NumberRange.vue'
import SingleSelectFilter from './filters/SingleSelect.vue'

export default defineComponent({
	name: 'FilterList',
	components: {
		BooleanFilter,
		DateRangeFilter,
		MultiSelectFilter,
		NumberRangeFilter,
		ScrollableContainer,
		SingleSelectFilter,
	},
	props: {
		appliedFilters: {
			default: () => [],
			type: Array as PropType<KottiStandardTable.AppliedFilter[]>,
		},
		filters: {
			default: () => [],
			type: Array as PropType<KottiStandardTable.FilterInternal[]>,
		},
		isLoading: { default: false, type: Boolean },
	},
	emits: ['update:appliedFilters'],
	setup(props, { emit }) {
		return {
			getComponent: (filter: KottiStandardTable.FilterInternal) => {
				switch (filter.type) {
					case KottiStandardTable.FilterType.BOOLEAN:
						return 'BooleanFilter'
					case KottiStandardTable.FilterType.DATE_RANGE:
						return 'DateRangeFilter'
					case KottiStandardTable.FilterType.MULTI_SELECT:
						return 'MultiSelectFilter'
					case KottiStandardTable.FilterType.NUMBER_RANGE:
						return 'NumberRangeFilter'
					case KottiStandardTable.FilterType.SINGLE_SELECT:
						return 'SingleSelectFilter'
					default:
						return null
				}
			},
			getValue: (filter: KottiStandardTable.FilterInternal) =>
				props.appliedFilters.find((v) => v.id === filter.id)?.value ??
				getEmptyValue(filter),
			onUpdateModelValue: (value: KottiStandardTable.AppliedFilter) => {
				const isNewValue = !props.appliedFilters.some((v) => v.id === value.id)
				const updatedValueList = (
					isNewValue
						? [...props.appliedFilters, value]
						: props.appliedFilters.map((v) => (v.id === value.id ? value : v))
				).filter(({ value }) => !isEmptyValue(value))

				emit('update:appliedFilters', updatedValueList)
			},
		}
	},
})
</script>

<style lang="scss" scoped>
/* stylelint-disable-next-line selector-class-pattern */
.filter-list :deep(.kt-field__wrapper) .kt-field__header__label__suffix {
	display: none;
}

.filter-list :deep(.kt-field),
.filter-list :deep(.kt-field-select) {
	margin-bottom: 0;
}

.filter-list :deep(.scrollable-container__content) {
	padding: 0;
}
</style>
