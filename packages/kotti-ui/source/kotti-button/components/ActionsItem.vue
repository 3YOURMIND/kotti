<template>
	<button
		ref="itemRef"
		v-bind="itemProps"
		class="kt-split-button-actions-item"
		:disabled="isDisabled"
		@click.stop="onItemClick"
		@keydown.down.prevent
		@keydown.up.prevent
	>
		<MenuOptionItem
			v-bind="{ isDisabled }"
			class="kt-split-button-actions-item__content"
			isClickable
		>
			<i v-if="icon" class="yoco" v-text="icon" />
			<span v-text="label" />
		</MenuOptionItem>
	</button>
</template>

<script lang="ts">
import {
	computed,
	defineComponent,
	onBeforeUnmount,
	onMounted,
	ref,
	watch,
} from 'vue'
import { z } from 'zod'

import { makeProps } from '../../make-props'
import MenuOptionItem from '../../shared-components/menu-option/MenuOptionItem.vue'
import { isInFocus } from '../../utilities'
import { KottiSplitButton } from '../types'

const propsSchema = KottiSplitButton.actionSchema.extend({
	hasFocus: z.boolean().default(false),
	index: z.number(),
	rootDataTest: z.string().nullable().default(null),
})

export default defineComponent({
	name: 'SplitButtonActionsItem',
	components: {
		MenuOptionItem,
	},
	props: makeProps(propsSchema),
	emits: ['click', 'updateIndexInFocus'],
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
	width: 100%;
	color: var(--text-01);

	&__content {
		display: flex;
		gap: var(--unit-2);
		align-items: center;
	}

	&:focus {
		outline: none;
		background-color: var(--interactive-02-hover);
	}

	.yoco {
		font-size: 1rem;
	}
}
</style>
