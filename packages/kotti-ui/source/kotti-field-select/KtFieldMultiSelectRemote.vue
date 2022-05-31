<template>
	<GenericSelectField
		v-bind="props"
		:helpTextSlot="$slots.helpText"
		isMultiple
		isRemote
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
import { KottiFieldMultiSelectRemote } from './types'

export default defineComponent({
	name: 'KtFieldMultiSelectRemote',
	components: {
		GenericSelectField,
	},
	props: makeProps(KottiFieldMultiSelectRemote.propsSchema),
	setup(props: KottiFieldMultiSelectRemote.PropsInternal, { emit }) {
		return {
			onEmit: ({ event, payload }: { event: string; payload: unknown }) => {
				emit(event, payload)
			},
			props,
		}
	},
})
</script>
