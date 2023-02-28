<template>
	<GenericSelectField
		v-bind="props"
		:helpTextSlot="$slots.helpText"
		isMultiple
		@emit="onEmit"
	>
		<template #option="values">
			<slot v-bind="values" name="option" />
		</template>
	</GenericSelectField>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { makeProps } from '../make-props'

import GenericSelectField from './components/GenericSelectField.vue'
import { KottiFieldMultiSelect } from './types'

export default defineComponent({
	name: 'KtFieldMultiSelect',
	components: {
		GenericSelectField,
	},
	props: makeProps(KottiFieldMultiSelect.propsSchema),
	setup(props: KottiFieldMultiSelect.PropsInternal, { emit }) {
		return {
			onEmit: ({ event, payload }: { event: string; payload: unknown }) => {
				emit(event, payload)
			},
			props,
		}
	},
})
</script>
