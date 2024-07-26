<script lang="ts">
import { computed, defineComponent, onBeforeMount, onUnmounted, ref } from 'vue'

import { makeProps } from '../make-props'

import type { RenderedMessage, ToasterReturn } from './create-toaster'
import KtToast from './KtToast.vue'
import KtToastProvider from './KtToastProvider.vue'
import { schema } from './types'

export default defineComponent({
	name: 'KtToaster',
	components: {
		KtToast,
		KtToastProvider,
	},
	props: makeProps(schema),
	setup(props) {
		const currentToasts = ref<Array<RenderedMessage>>([])

		const api = props.toaster._internal_pls_dont_touch as ToasterReturn<
			Record<string, Record<string, unknown>>
		>['_internal_pls_dont_touch']

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
						progress: toast.progress,
						text: toast.text,
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
			<KtToastProvider
				v-for="toast in renderedToasts"
				:key="toast.metadata.id"
				:data="toast.context"
			>
				<component
					:is="$slots[toast.type]"
					v-if="$slots[toast.type]"
					v-bind="toast.context"
				/>
				<KtToast v-else style="background-color: var(--primary-60)">
					<template #icon>
						<i class="yoco" v-text="toast.icon ?? 'TODO'" />
					</template>
				</KtToast>
			</KtToastProvider>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.kt-toaster__notifications {
	position: fixed;
	top: var(--unit-4);
	right: var(--unit-4);
	z-index: 100000;

	display: flex;
	flex-direction: column;
	gap: var(--unit-2);

	width: 448px;
}
</style>
