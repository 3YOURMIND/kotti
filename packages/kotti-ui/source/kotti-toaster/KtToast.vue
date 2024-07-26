<script lang="ts">
import { computed, defineComponent, inject } from 'vue'

import { type ContextData, TOAST_CONTEXT } from './context'

export default defineComponent({
	name: 'KtToast',
	props: {
		text: { default: null, type: [String, null] },
		progress: { default: null, type: [Number, null] },
	},
	setup(props) {
		const context = inject<ContextData>(TOAST_CONTEXT) ?? null

		if (context === null) throw new Error('Could not find KtToastContext')

		return {
			onDelete: () => {
				context.value.delete()
			},
			progress2: computed(() => props.progress ?? context.value.progress),
			text2: computed(() => props.text ?? context.value.text),
		}
	},
})
</script>

<template>
	<div class="kt-toast">
		<div class="kt-toast__icon">
			<slot name="icon" />
		</div>
		<div class="kt-toast__text">
			<slot name="text">
				{{ text2 }}
			</slot>
		</div>
		<div class="kt-toast__text">
			<slot name="progress">
				{{ progress2 }}
			</slot>
		</div>
		<div class="kt-toast__close" @click="onDelete">
			<i class="yoco">close</i>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.kt-toast {
	display: flex;

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
</style>
