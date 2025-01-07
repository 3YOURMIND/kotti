<template>
	<GenericDateField
		v-bind="$props"
		:helpTextSlot="$slots.helpText"
		isRange
		@emit="onEmit"
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
	setup(_, { emit }) {
		return {
			onEmit: ({ event, payload }: { event: string; payload: unknown }) => {
				emit(event, payload)
			},
		}
	},
})
</script>
