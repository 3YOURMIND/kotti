<template>
	<KtFieldSingleSelect
		:data-test="filter.dataTest"
		:isLoading="isLoading"
		:isUnsorted="filter.isUnsorted"
		isOptional
		:label="filter.label"
		:options="filter.options"
		size="small"
		:value="value"
		@input="onInput"
	/>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

import type { KottiStandardTable } from '../../types'

export default defineComponent({
	name: 'SingleSelectFilter',
	props: {
		filter: {
			required: true,
			type: Object as PropType<
				KottiStandardTable.FilterInternal & {
					type: KottiStandardTable.FilterType.SINGLE_SELECT
				}
			>,
		},
		isLoading: { default: false, type: Boolean },
		value: { default: null, type: [String, Number] },
	},
	emits: ['input'],
	setup(props, { emit }) {
		return {
			onInput: (value: KottiStandardTable.FilterValue) => {
				emit('input', {
					id: props.filter.id,
					operation: props.filter.operations[0], // Current filters support only one operation
					value,
				})
			},
		}
	},
})
</script>
