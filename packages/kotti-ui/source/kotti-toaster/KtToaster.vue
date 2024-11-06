<script lang="ts">
import { computed, defineComponent, onBeforeMount, onUnmounted, ref } from 'vue'

import { makeProps } from '../make-props'

import type { RenderedMessage, ToasterReturn } from './create-toaster'
import KtToast from './KtToast.vue'
import KtToastProvider from './KtToastProvider.vue'
import { KottiToaster } from './types'

export default defineComponent({
	name: 'KtToaster',
	components: {
		KtToast,
		KtToastProvider,
	},
	props: makeProps(KottiToaster.propsSchema),
	setup(props) {
		const currentToasts = ref<Array<RenderedMessage>>([])

		const api = (
			props.toaster as unknown as ToasterReturn<{
				[key: string]: Record<string, unknown>
				default: Record<string, never>
			}>
		)._internal_pls_dont_touch

		onBeforeMount(() => {
			api.subscribe((activeToasts) => {
				currentToasts.value = activeToasts
			})
		})

		onUnmounted(() => {
			api.unsubscribe()
			currentToasts.value = []
		})

		return {
			renderedToasts: computed(() =>
				currentToasts.value.map((toast) => ({
					...toast,
					context: {
						custom: toast.custom,
						delete: () => {
							api.requestDelete(toast.metadata.id)
						},
						duration: toast.duration,
						header: toast.header,
						progress: toast.progress,
						text: toast.text,
						type: toast.type,
					},
				})),
			),
		}
	},
})
</script>

<template>
	<div class="kt-toaster">
		<div class="kt-toaster__notifications">
			<transition-group name="toast-yum" tag="div">
				<KtToastProvider
					v-for="toast in renderedToasts"
					:key="toast.metadata.id"
					class="toast-yum-item"
					:data="toast.context"
				>
					<slot v-bind="toast.context" :name="toast.type">
						<KtToast />
					</slot>
				</KtToastProvider>
			</transition-group>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.kt-toaster__notifications {
	position: fixed;
	top: var(--unit-4);
	right: var(--unit-4);
	z-index: 100000;
	width: 400px;

	> div {
		display: flex;
		flex-direction: column;
		gap: var(--unit-2);
	}
}

// animation

$z-normal: 0;
$z-leaving: -1;

.toast-yum-item {
	width: 400px;
	isolation: isolate;
}

@media (prefers-reduced-motion: no-preference) {
	.toast-yum-item {
		transition: all var(--transition-medium) ease-in-out;
	}

	.toast-yum-move {
		transition: transform var(--transition-short) ease-in-out;
	}

	.toast-yum-enter,
	.toast-yum-leave-to {
		opacity: 0;
		transform: translateX(200px);
	}

	.toast-yum-leave-active {
		position: absolute;
		z-index: $z-leaving;
		transition: all var(--transition-medium) ease-in-out;
	}

	.toast-yum-leave-from {
		z-index: $z-normal;
		opacity: 1;
		transform: translateX(0);
	}
}
</style>
