<template>
	<GenericDateField
		v-bind="$props"
		:helpTextSlot="$slots.helpText"
		@update:modelValue="onUpdateModelValue"
	/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { makeProps } from '../make-props'

import GenericDateField from './components/GenericDateField.vue'
import { KottiFieldDate } from './types'

export default defineComponent({
	name: 'KtFieldDate',
	components: {
		GenericDateField,
	},
	props: makeProps(KottiFieldDate.propsSchema),
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
