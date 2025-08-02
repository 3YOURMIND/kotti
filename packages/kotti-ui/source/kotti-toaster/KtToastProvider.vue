<script lang="ts">
import {
	computed,
	defineComponent,
	type PropType,
	provide,
	type UnwrapRef,
} from 'vue'

import { TOAST_CONTEXT, type ToastContext } from './context'

export default defineComponent({
	name: 'KtToastProvider',
	props: {
		data: { required: true, type: Object as PropType<UnwrapRef<ToastContext>> },
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
