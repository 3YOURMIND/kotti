<script lang="ts">
import { defineComponent, onBeforeMount, onUnmounted, ref } from 'vue'

import { makeProps } from '../make-props'
import { schema } from './types'
import type { RenderedMessage } from './create-toaster'

// toaster keeps unshown toasts
// component asks for ownership transfer when it has space

export default defineComponent({
	name: 'KtToaster',
	props: makeProps(schema),
	setup(props) {
		const currentToasts = ref<Array<RenderedMessage>>([])

		onBeforeMount(() => {
			// TODO: onMounted(?)
			props.toaster._internal_pls_dont_touch.subscribe((activeToasts) => {
				currentToasts.value = activeToasts
			})
		})

		onUnmounted(() => {
			props.toaster._internal_pls_dont_touch.unsubscribe()
		})

		const deleteToast = (deleteId: string) => {
			// currentToasts.value = currentToasts.value.filter(
			// 	({ metadata }) => metadata.id !== deleteId,
			// )

			props.toaster._internal_pls_dont_touch.requestDelete(deleteId)
		}

		return {
			currentToasts,
			deleteToast,
		}
	},
})
</script>

<template>
	<div class="kt-toaster">
		<Teleport to="body">
			<div class="kt-toaster__notifications">
				<div
					v-for="toast in currentToasts"
					:key="toast.metadata.id"
					class="kt-toast"
				>
					<div class="kt-toast__icon">
						<i class="yoco" v-text="toast.icon" />
					</div>
					<div class="kt-toast__text">{{ toast.text }}</div>
					<div class="kt-toast__text">{{ toast.progress }}</div>
					<div
						class="kt-toast__close"
						@click="() => deleteToast(toast.metadata.id)"
					>
						<i class="yoco">close</i>
					</div>
				</div>
			</div>
		</Teleport>
	</div>
</template>

<style lang="scss" scoped>
.kt-toast {
	display: flex;

	/* padding: var(--unit-2) var(--unit-4); */

	background-color: var(--ui-01);

	border-radius: var(--border-radius);
	border: 1px solid var(--gray-20);
	overflow: hidden;

	&__icon,
	&__close {
		.yoco {
			font-size: var(--unit-6);
			height: var(--unit-6);
			width: var(--unit-6);
		}
	}

	&__icon {
		display: flex;

		padding: var(--unit-2) var(--unit-2) var(--unit-2) var(--unit-4);
	}

	&__text {
		flex: 1;
		padding-block: var(--unit-2);
	}

	&__close {
		display: flex;
		align-items: center;
		justify-content: center;

		padding: var(--unit-2) var(--unit-4) var(--unit-2) var(--unit-2);

		cursor: pointer;

		&:hover {
			background-color: var(--interactive-01);
			color: #fff;
		}
	}
}

.kt-toaster {
	background-color: red;
}

.kt-toaster__notifications {
	position: fixed;
	top: var(--unit-4);
	right: var(--unit-4);

	display: flex;
	flex-direction: column;
	gap: var(--unit-2);
}
</style>
