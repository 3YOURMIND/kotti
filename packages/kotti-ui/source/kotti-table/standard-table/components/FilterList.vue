<template>
	<div class="filter-list">
		<component
			:is="getComponent(filter)"
			v-for="(filter, index) in filters"
			:key="index"
			:filter="filter"
			:isLoading="isLoading"
			:value="getValue(filter)"
			@input="onInput"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { makeProps } from '../../../make-props'
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
		SingleSelectFilter,
	},
	props: makeProps(KottiStandardTable.FilterList.propsSchema),
	emits: ['input'],
	setup(props, { emit }) {
		return {
			getComponent: (filter: KottiStandardTable.Filter) => {
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
			getValue: (filter: KottiStandardTable.Filter) =>
				props.value.find((appliedFilter) => appliedFilter.id === filter.id)
					?.value ?? getEmptyValue(filter),
			onInput: (
				value: KottiStandardTable.FilterValue,
				id: KottiStandardTable.Filter['id'],
			) => {
				const isNewValue = !props.value.some(
					(appliedFilter) => appliedFilter.id === id,
				)
				const updatedValue = (
					isNewValue
						? [...props.value, { id, value }]
						: props.value.map((appliedFilter) =>
								appliedFilter.id === id ? { id, value } : appliedFilter,
							)
				).filter(({ value }) => !isEmptyValue(value))

				emit('input', updatedValue)
			},
		}
	},
})
</script>

<style lang="scss" scoped>
.filter-list {
	:deep(.kt-field__wrapper) {
		/* stylelint-disable-next-line */
		.kt-field__header__label__suffix {
			display: none;
		}
	}
}
</style>
