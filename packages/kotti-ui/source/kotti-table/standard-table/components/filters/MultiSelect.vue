<template>
	<KtFieldMultiSelect
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
import { defineComponent } from 'vue'

import { makeProps } from '../../../../make-props'
import { KottiStandardTable } from '../../types'

export default defineComponent({
	name: 'MultiSelectFilter',
	props: makeProps(KottiStandardTable.MultiSelectFilter.propsSchema),
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
