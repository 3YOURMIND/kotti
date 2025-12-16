<template>
	<GenericDateField
		v-bind="$props"
		hasTime
		:helpTextSlot="$slots.helpText"
		isRange
		@update:modelValue="onUpdateModelValue"
	/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { makeProps } from '../make-props'

import GenericDateField from './components/GenericDateField.vue'
import { KottiFieldDateTimeRange } from './types'

export default defineComponent({
	name: 'KtFieldDateTimeRange',
	components: {
		GenericDateField,
	},
	props: makeProps(KottiFieldDateTimeRange.propsSchema),
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
