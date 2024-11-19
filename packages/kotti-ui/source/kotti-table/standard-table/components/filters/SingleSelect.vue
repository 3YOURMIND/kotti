<template>
	<KtFieldSingleSelect
		:data-test="filter.dataTest"
		:isLoading="isLoading"
		:isUnsorted="filter.isUnsorted"
		isOptional
		:label="filter.label"
		:options="filter.options"
		:value="value"
		@input="$emit('input', $event, filter.id)"
	/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { makeProps } from '../../../../make-props'

import { KottiStandardTable } from '../../types'

export default defineComponent({
	name: 'SingleSelectFilter',
	props: makeProps(KottiStandardTable.SingleSelectFilter.propsSchema),
	emits: ['input'],
	setup() {
		return {}
	},
})
</script>
