<template>
	<KtFieldDateRange
		:isLoading="isLoading"
		isOptional
		:label="filter.label"
		:placeholder="[startPlaceholder, endPlaceholder]"
		:shortcuts="shortcuts"
		:value="value"
		@input="onInput"
	/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import type { KottiFieldDateRange } from '../../../../kotti-field-date/types'
import { useTranslationNamespace } from '../../../../kotti-i18n/hooks'
import { makeProps } from '../../../../make-props'
import { KottiStandardTable } from '../../types'
import { getLast, today } from '../../utilities/date'

export default defineComponent({
	name: 'DateRangeFilter',
	props: makeProps(KottiStandardTable.DateRangeFilter.propsSchema),
	emits: ['input'],
	setup(props, { emit }) {
		const translations = useTranslationNamespace('KtStandardTable')

		return {
			endPlaceholder: translations.value.endDate,
			onInput: (value: KottiFieldDateRange.Value) => {
				emit('input', value, props.filter.id)
			},
			shortcuts: [
				{
					label: translations.value.today,
					value: [today(), today()],
				},
				{
					label: translations.value.lastWeek,
					value: [getLast('week'), today()],
				},
				{
					label: translations.value.lastMonth,
					value: [getLast('month'), today()],
				},
				{
					label: translations.value.lastYear,
					value: [getLast('year'), today()],
				},
			],
			startPlaceholder: translations.value.startDate,
		}
	},
})
</script>
