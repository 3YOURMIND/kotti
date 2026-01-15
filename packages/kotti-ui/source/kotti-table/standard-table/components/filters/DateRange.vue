<template>
	<KtFieldDateRange
		:isLoading="isLoading"
		isOptional
		:label="filter.label"
		:modelValue="modelValue"
		:placeholder="[translations.startDate, translations.endDate]"
		:shortcuts="shortcuts"
		size="small"
		@update:modelValue="onUpdateModelValue"
	/>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue'

import KtFieldDateRange from '../../../../kotti-field-date/KtFieldDateRange.vue'
import { useTranslationNamespace } from '../../../../kotti-i18n/hooks'
import type { KottiStandardTable } from '../../types'
import { getLast, getToday } from '../../utilities/date'

export default defineComponent({
	name: 'DateRangeFilter',
	components: {
		KtFieldDateRange,
	},
	props: {
		filter: {
			required: true,
			type: Object as PropType<
				KottiStandardTable.FilterInternal & {
					type: KottiStandardTable.FilterType.DATE_RANGE
				}
			>,
		},
		isLoading: { default: false, type: Boolean },
		modelValue: {
			default: () => [null, null],
			type: Array as unknown as PropType<[string | null, string | null]>,
		},
	},
	emits: ['update:modelValue'],
	setup(props, { emit }) {
		const translations = useTranslationNamespace('KtStandardTable')

		return {
			onUpdateModelValue: (value: KottiStandardTable.FilterValue) => {
				emit('update:modelValue', {
					id: props.filter.id,
					operation: props.filter.operations[0], // Current filters support only one operation
					value,
				})
			},
			shortcuts: computed(() => [
				{
					label: translations.value.today,
					value: [getToday(), getToday()],
				},
				{
					label: translations.value.lastWeek,
					value: [getLast('week'), getToday()],
				},
				{
					label: translations.value.lastMonth,
					value: [getLast('month'), getToday()],
				},
				{
					label: translations.value.lastYear,
					value: [getLast('year'), getToday()],
				},
			]),
			translations,
		}
	},
})
</script>
