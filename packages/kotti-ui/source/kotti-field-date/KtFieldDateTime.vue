<template>
	<GenericDateField
		v-bind="$props"
		hasTime
		:helpTextSlot="$slots.helpText"
		@emit="onEmit"
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
	setup(_, { emit }) {
		return {
			onEmit: ({ event, payload }: { event: string; payload: unknown }) => {
				emit(event, payload)
			},
		}
	},
})
</script>
