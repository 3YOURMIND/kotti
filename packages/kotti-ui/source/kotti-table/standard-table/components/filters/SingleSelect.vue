<template>
	<KtFieldSingleSelect
		:data-test="filter.dataTest"
		:isLoading="isLoading"
		:isUnsorted="filter.isUnsorted"
		isOptional
		:label="filter.label"
		:modelValue="modelValue"
		:options="filter.options"
		size="small"
		@update:modelValue="onInput"
	/>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

import KtFieldSingleSelect from '../../../../kotti-field-select/KtFieldSingleSelect.vue'
import type { KottiStandardTable } from '../../types'

export default defineComponent({
	name: 'SingleSelectFilter',
	components: {
		KtFieldSingleSelect,
	},
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
		modelValue: { default: null, type: [String, Number] },
	},
	emits: ['update:modelValue'],
	setup(props, { emit }) {
		return {
			onInput: (value: KottiStandardTable.FilterValue) => {
				emit('update:modelValue', {
					id: props.filter.id,
					operation: props.filter.operations[0], // Current filters support only one operation
					value,
				})
			},
		}
	},
})
</script>
