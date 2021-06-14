<template>
	<input
		v-bind="inputProps"
		@blur="() => (isFocussed = false)"
		@focus="() => (isFocussed = true)"
		@input="($event) => $emit('queryInputChanged', $event)"
	/>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'

import { KottiFieldSingleSelect, KottiFieldSingleSelectRemote } from '../types'

const DEFAULT_PROPS = {
	class: ['kt-field-select-single-remote__wrapper'],
	size: 1,
	type: 'text',
}

export default defineComponent<{
	label: KottiFieldSingleSelect.Props['options'][number]['label']
	placeholder: KottiFieldSingleSelect.Props['placeholder']
	queryString: KottiFieldSingleSelectRemote.Props['queryValue']
}>({
	name: 'SingleSelectInput',
	props: {
		label: { default: null, type: String },
		placeholder: { default: null, type: String },
		queryString: { default: null, type: String },
	},
	setup(props) {
		const isFocussed = ref(false)

		return {
			isFocussed,
			inputProps: computed(() => ({
				...DEFAULT_PROPS,
				...(isFocussed.value
					? {
							placeholder: props.label ?? props.placeholder ?? undefined,
							readOnly: false,
							value: props.queryString ?? undefined,
					  }
					: {
							placeholder: props.placeholder ?? undefined,
							readOnly: true,
							value: props.label ?? undefined,
					  }),
			})),
		}
	},
})
</script>

<style></style>
