<template>
	<GenericDateField
		v-bind="$props"
		hasTime
		:helpTextSlot="$slots.helpText"
		isRange
		@emit="onEmit"
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
	setup(_, { emit }) {
		return {
			onEmit: ({ event, payload }: { event: string; payload: unknown }) => {
				emit(event, payload)
			},
		}
	},
})
</script>
