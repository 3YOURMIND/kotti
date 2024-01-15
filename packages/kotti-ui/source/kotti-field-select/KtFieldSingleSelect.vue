<template>
	<GenericSelectField
		v-bind="$props"
		:helpTextSlot="$slots.helpText"
		@emit="onEmit"
	>
		<template #option="values">
			<slot v-bind="values" name="option" />
		</template>
	</GenericSelectField>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { makeProps } from '../make-props'

import GenericSelectField from './components/GenericSelectField.vue'
import { KottiFieldSingleSelect } from './types'

export default defineComponent({
	name: 'KtFieldSingleSelect',
	components: {
		GenericSelectField,
	},
	props: makeProps(KottiFieldSingleSelect.propsSchema),
	setup(_, { emit }) {
		return {
			onEmit: ({ event, payload }: { event: string; payload: unknown }) => {
				emit(event, payload)
			},
		}
	},
})
</script>
