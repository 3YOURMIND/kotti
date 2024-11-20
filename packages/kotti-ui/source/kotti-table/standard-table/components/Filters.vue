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
					:disabled="isLoading"
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
import { getEmptyValue, isEmptyValue } from '../utilities/filters'

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

	:deep(.kt-button) {
		flex-shrink: 0;
		align-self: end;
	}

	:deep(.kt-field__wrapper) {
		/* stylelint-disable-next-line */
		.kt-field__header__label__suffix {
			display: none;
		}
	}
}
</style>
