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
import { computed, defineComponent, type PropType } from 'vue'

import { useTranslationNamespace } from '../../../../kotti-i18n/hooks'
import type { KottiStandardTable } from '../../types'
import { getLast, today } from '../../utilities/date'

export default defineComponent({
	name: 'DateRangeFilter',
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
		value: {
			default: () => [null, null],
			type: Array as unknown as PropType<[string | null, string | null]>,
		},
	},
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
