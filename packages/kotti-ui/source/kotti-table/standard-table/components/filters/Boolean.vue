<template>
	<KtFieldToggle
		:data-test="filter.dataTest"
		:isLoading="isLoading"
		isOptional
		:label="filter.label"
		size="small"
		type="switch"
		:value="value"
		@input="onInput"
	>
		<span v-if="slotLabel" v-text="slotLabel" />
	</KtFieldToggle>
</template>

<script lang="ts">
import isNil from 'lodash/isNil.js'
import { computed, defineComponent } from 'vue'

import { makeProps } from '../../../../make-props'
import { KottiStandardTable } from '../../types'

export default defineComponent({
	name: 'BooleanFilter',
	props: makeProps(KottiStandardTable.BooleanFilter.propsSchema),
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
			slotLabel: computed(() => {
				if (!props.filter.slotLabels || isNil(props.value)) {
					return null
				}
				const index = props.value ? 1 : 0
				return props.filter.slotLabels[index]
			}),
		}
	},
})
</script>
