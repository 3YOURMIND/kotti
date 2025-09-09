<template>
	<KtFieldMultiSelect
		:data-test="filter.dataTest"
		:isLoading="isLoading"
		:isUnsorted="filter.isUnsorted"
		isOptional
		:label="filter.label"
		:modelValue="modelValue"
		:options="filter.options"
		size="small"
		@update:modelValue="onUpdateModelValue"
	/>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

import KtFieldMultiSelect from '../../../../kotti-field-select/KtFieldMultiSelect.vue'
import type { KottiStandardTable } from '../../types'

export default defineComponent({
	name: 'MultiSelectFilter',
	components: {
		KtFieldMultiSelect,
	},
	props: {
		filter: {
			required: true,
			type: Object as PropType<
				KottiStandardTable.FilterInternal & {
					type: KottiStandardTable.FilterType.MULTI_SELECT
				}
			>,
		},
		isLoading: { default: false, type: Boolean },
		modelValue: {
			default: () => [null, null],
			type: Array as PropType<(number | string)[]>,
		},
	},
	emits: ['update:modelValue'],
	setup(props, { emit }) {
		return {
			onUpdateModelValue: (value: KottiStandardTable.FilterValue) => {
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
