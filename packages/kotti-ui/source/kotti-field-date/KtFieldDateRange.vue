<template>
	<GenericDateField
		v-bind="$props"
		:helpTextSlot="$slots.helpText"
		isRange
		@update:modelValue="onUpdateModelValue"
	/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { makeProps } from '../make-props'

import GenericDateField from './components/GenericDateField.vue'
import { KottiFieldDateRange } from './types'

export default defineComponent({
	name: 'KtFieldDateRange',
	components: {
		GenericDateField,
	},
	props: makeProps(KottiFieldDateRange.propsSchema),
	emits: ['update:modelValue'],
	setup(_, { emit }) {
		return {
			onUpdateModelValue: (payload: unknown) => {
				emit('update:modelValue', payload)
			},
		}
	},
})
</script>
