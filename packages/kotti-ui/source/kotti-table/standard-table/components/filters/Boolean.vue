<template>
	<KtFieldToggle
		:data-test="filter.dataTest"
		:isLoading="isLoading"
		isOptional
		:label="filter.label"
		size="small"
		type="switch"
		:value="value"
		@input="$emit('input', $event, filter.id)"
	>
		<span v-if="slotLabel" v-text="slotLabel" />
	</KtFieldToggle>
</template>

<script lang="ts">
import isNil from 'lodash/isNil'
import { computed, defineComponent } from 'vue'

import { makeProps } from '../../../../make-props'
import { KottiStandardTable } from '../../types'

export default defineComponent({
	name: 'BooleanFilter',
	props: makeProps(KottiStandardTable.BooleanFilter.propsSchema),
	emits: ['input'],
	setup(props) {
		return {
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
