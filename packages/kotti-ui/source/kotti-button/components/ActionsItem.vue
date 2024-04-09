<template>
	<button
		ref="itemRef"
		v-bind="itemProps"
		@click.stop="onItemClick"
		@keydown.down.prevent
		@keydown.up.prevent
	>
		<i v-if="icon" class="yoco" v-text="icon" />
		<span v-text="label" />
	</button>
</template>

<script lang="ts">
import {
	computed,
	defineComponent,
	onMounted,
	onBeforeUnmount,
	ref,
	watch,
} from 'vue'
import { z } from 'zod'

import { makeProps } from '../../make-props'
import { isInFocus } from '../../utilities'
import { KottiSplitButton } from '../types'

const propsSchema = KottiSplitButton.actionSchema.extend({
	hasFocus: z.boolean().default(false),
	index: z.number(),
	rootDataTest: z.string().nullable().default(null),
})

export default defineComponent({
	name: 'SplitButtonActionsItem',
	props: makeProps(propsSchema),
	setup(props, { emit }) {
		const itemRef = ref<HTMLButtonElement | null>(null)

		const focusListener = () => {
			if (isInFocus(itemRef.value) && !props.hasFocus)
				emit('updateIndexInFocus', props.index)
		}

		onMounted(() =>
			itemRef.value?.addEventListener('focus', focusListener, {
				capture: true,
			}),
		)

		onBeforeUnmount(() =>
			itemRef.value?.removeEventListener('focus', focusListener),
		)

		watch(
			() => props.hasFocus,
			(hasFocus, hadFocus) => {
				if (hasFocus && !hadFocus) itemRef.value?.focus({ preventScroll: true })
			},
		)

		return {
			itemProps: computed(() => ({
				class: {
					'kt-split-button-actions-item': true,
					'kt-split-button-actions-item--is-disabled': props.isDisabled,
				},
				'data-test': [
					props.rootDataTest,
					`action-${String(props.index)}`,
					props.dataTest,
				]
					.filter(Boolean)
					.join('.'),
				disabled: props.isDisabled,
			})),
			itemRef,
			onItemClick: () => {
				if (props.isDisabled) return
				emit('click')
				props.onClick()
			},
		}
	},
})
</script>

<style lang="scss" scoped>
// Remove default styles from <button /> elements
@mixin remove-button-styles {
	padding: 0;
	margin: 0;
	font: inherit;
	text-align: inherit;
	appearance: none;
	background-color: transparent;
	border: none;
	border-radius: 0;
}

.kt-split-button-actions-item {
	@include remove-button-styles;

	display: flex;
	gap: var(--unit-2);
	align-items: center;
	width: 100%;
	padding: var(--unit-2) var(--unit-4);
	color: var(--text-01);
	cursor: pointer;

	&--is-disabled {
		cursor: not-allowed;
		opacity: 0.46;
	}

	&:focus {
		outline: none;
	}

	&:focus,
	&:hover:not(.kt-split-button-actions-item--is-disabled) {
		background-color: var(--ui-01);
	}

	.yoco {
		font-size: 1rem;
	}

	span {
		font-size: 16px;
		line-height: 20px;
	}
}
</style>
