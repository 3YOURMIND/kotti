<template>
	<GenericSelectField
		v-bind="$props"
		:helpTextSlot="$slots.helpText"
		isRemote
		@emit="onEmit"
	>
		<template #option="values">
			<slot v-bind="values" name="option" />
		</template>
		<template #selection="values">
			<slot v-bind="values" name="selection" />
		</template>
	</GenericSelectField>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { makeProps } from '../make-props'

import GenericSelectField from './components/GenericSelectField.vue'
import { KottiFieldSingleSelectRemote } from './types'

export default defineComponent({
	name: 'KtFieldSingleSelectRemote',
	components: {
		GenericSelectField,
	},
	props: makeProps(KottiFieldSingleSelectRemote.propsSchema),
	setup(_, { emit }) {
		return {
			onEmit: ({ event, payload }: { event: string; payload: unknown }) => {
				emit(event, payload)
			},
		}
	},
})
</script>
