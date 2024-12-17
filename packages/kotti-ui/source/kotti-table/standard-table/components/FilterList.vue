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
import { defineComponent, type PropType } from 'vue'

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
	props: {
		filters: {
			default: () => [],
			type: Array as PropType<KottiStandardTable.FilterInternal[]>,
		},
		isLoading: { default: false, type: Boolean },
		value: {
			default: () => [],
			type: Array as PropType<KottiStandardTable.AppliedFilter[]>,
		},
	},
	emits: ['input'],
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
				props.value.find((v) => v.id === filter.id)?.value ??
				getEmptyValue(filter),
			onInput: (value: KottiStandardTable.AppliedFilter) => {
				const isNewValue = !props.value.some((v) => v.id === value.id)
				const updatedValueList = (
					isNewValue
						? [...props.value, value]
						: props.value.map((v) => (v.id === value.id ? value : v))
				).filter(({ value }) => !isEmptyValue(value))

				emit('input', updatedValueList)
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
