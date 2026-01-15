<template>
	<GenericDateField
		v-bind="$props"
		hasTime
		:helpTextSlot="$slots.helpText"
		@update:modelValue="onUpdateModelValue"
	/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { makeProps } from '../make-props'

import GenericDateField from './components/GenericDateField.vue'
import { KottiFieldDateTime } from './types'

export default defineComponent({
	name: 'KtFieldDateTime',
	components: {
		GenericDateField,
	},
	props: makeProps(KottiFieldDateTime.propsSchema),
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
