<script lang="ts">
import { computed, defineComponent, type PropType, provide } from 'vue'

import { type ContextData, TOAST_CONTEXT } from './context'

export default defineComponent({
	name: 'KtToastProvider',
	props: {
		data: { required: true, type: Object as PropType<ContextData> },
	},
	setup(props) {
		provide(
			TOAST_CONTEXT,
			computed(() => props.data),
		)

		return {}
	},
})
</script>

<template>
	<div>
		<slot />
	</div>
</template>
