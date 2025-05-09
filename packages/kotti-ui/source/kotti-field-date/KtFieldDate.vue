<template>
	<GenericDateField v-bind="$props" @emit="onEmit" />
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
	setup(_, { emit }) {
		return {
			onEmit: ({ event, payload }: { event: string; payload: unknown }) => {
				emit(event, payload)
			},
		}
	},
})
</script>
