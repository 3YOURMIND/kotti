<template>
	<KtPopover
		v-if="filters && filters.length > 0"
		size="md"
		:trigger="isLoading ? 'manual' : 'click'"
	>
		<KtButton
			:disabled="isLoading"
			:icon="Yoco.Icon.CHEVRON_DOWN"
			:isLoading="isLoading"
			:label="translations.editFilters"
		/>
		<template #content>
			<div class="table-filters">
				<component
					:is="getComponent(filter)"
					v-for="(filter, index) in filters"
					:key="index"
					:filter="filter"
					:isLoading="isLoading"
					:value="getValue(filter)"
					@input="onInput"
				/>
				<KtButton
					:label="translations.clearAll"
					type="text"
					@click="$emit('input', [])"
				/>
			</div>
		</template>
	</KtPopover>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { Yoco } from '@3yourmind/yoco'

import { useTranslationNamespace } from '../../../kotti-i18n/hooks'
import { makeProps } from '../../../make-props'
import { KottiStandardTable } from '../types'
import { getDefaultValue, isFilterValueEmpty } from '../utilities/filters'

import BooleanFilter from './filters/Boolean.vue'
import DateRangeFilter from './filters/DateRange.vue'
import MultiSelectFilter from './filters/MultiSelect.vue'
import NumberRangeFilter from './filters/NumberRange.vue'
import SingleSelectFilter from './filters/SingleSelect.vue'

export default defineComponent({
	name: 'TableFilters',
	components: {
		BooleanFilter,
		DateRangeFilter,
		MultiSelectFilter,
		NumberRangeFilter,
		SingleSelectFilter,
	},
	props: makeProps(KottiStandardTable.TableFilters.propsSchema),
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
			getValue: (filter: KottiStandardTable.Filter) => {
				const value = props.value.find(
					(appliedFilter) => appliedFilter.id === filter.id,
				)?.value
				return value ?? getDefaultValue(filter)
			},
			onInput: (
				value: KottiStandardTable.FilterValue,
				id: KottiStandardTable.Filter['id'],
			) => {
				const newOrEditedFilter: KottiStandardTable.AppliedFilter = {
					id,
					value,
				}
				const isEmpty = isFilterValueEmpty(newOrEditedFilter.value)

				const isUpdatedValue = props.value.some(
					(appliedFilter) => appliedFilter.id === newOrEditedFilter.id,
				)

				if (isUpdatedValue) {
					emit(
						'input',
						props.value.reduce(
							(filters: KottiStandardTable.AppliedFilter[], appliedFilter) => {
								if (appliedFilter.id === newOrEditedFilter.id) {
									if (!isEmpty) {
										filters.push(newOrEditedFilter)
									}
									return filters
								}
								filters.push(appliedFilter)
								return filters
							},
							[],
						),
					)
				} else if (!isEmpty) {
					emit('input', [...props.value, newOrEditedFilter])
				}
			},
			translations: useTranslationNamespace('KtStandardTable'),
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
.table-filters {
	display: flex;
	flex-direction: column;
	max-height: 50vh;
	overflow-y: auto;

	::v-deep > .kt-button {
		flex-shrink: 0;
		align-self: end;
	}
}
</style>
