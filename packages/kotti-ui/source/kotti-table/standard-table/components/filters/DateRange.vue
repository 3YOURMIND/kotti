<template>
	<KtFieldDateRange
		:isLoading="isLoading"
		isOptional
		:label="filter.label"
		:placeholder="[translations.startDate, translations.endDate]"
		:shortcuts="shortcuts"
		size="small"
		:value="value"
		@input="onInput"
	/>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

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
			onInput: (value: KottiStandardTable.FilterValue) => {
				emit('input', {
					id: props.filter.id,
					operation: props.filter.operations[0], // Current filters support only one operation
					value,
				})
			},
			shortcuts: computed(() => [
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
			]),
			translations,
		}
	},
})
</script>
