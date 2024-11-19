<script lang="ts">
import { computed, defineComponent, type PropType, provide } from 'vue'

import { TOAST_CONTEXT, type ToastContext } from './context'

export default defineComponent({
	name: 'KtToastProvider',
	props: {
		data: { required: true, type: Object as PropType<ToastContext> },
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
	<!-- TODO: Wrapping div can possibly be removed in vue3 -->
	<div>
		<slot />
	</div>
</template>
