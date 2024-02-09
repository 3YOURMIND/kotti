<template>
	<div class="kt-accordion">
		<div class="kt-accordion__header" :data-test="dataTest" @click="toggle">
			<div class="kt-accordion__title">
				<slot name="title">
					<i v-if="icon" class="yoco kt-accordion__icon" v-text="icon" />
					<div class="kt-accordion__text" v-text="title" />
				</slot>
			</div>
			<div class="kt-accordion__toggle" @click.stop="toggle">
				<i class="yoco" v-text="toggleIcon" />
			</div>
		</div>
		<div :class="contentClasses">
			<div ref="contentInnerRef" class="kt-accordion__inner">
				<slot />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { computed, defineComponent, ref } from 'vue'

import { makeProps } from '../make-props'

import { useSlideAnimation } from './hooks'
import { KottiAccordion } from './types'

//** How much time should be spent on open/close animation in milliseconds */
const ANIMATION_DURATION = 300

export default defineComponent({
	name: 'KtAccordion',
	props: makeProps(KottiAccordion.propsSchema),
	setup(props, { emit }) {
		const contentInnerRef = ref<HTMLElement | null>(null)

		useSlideAnimation(
			contentInnerRef,
			computed(() => !props.isClosed),
			{ duration: ANIMATION_DURATION },
		)
		return {
			contentClasses: computed(() => ({
				'kt-accordion__content': true,
				'kt-accordion__content--is-closed': props.isClosed,
				'kt-accordion__content--is-open': !props.isClosed,
			})),
			contentInnerRef,
			toggle: () => emit('update:isClosed', !props.isClosed),
			toggleIcon: computed(() =>
				props.isClosed ? Yoco.Icon.PLUS : Yoco.Icon.MINUS,
			),
		}
	},
})
</script>

<style lang="scss">
:root {
	--accordion-color: var(--interactive-03);
}
</style>

<style lang="scss" scoped>
.kt-accordion {
	margin-bottom: var(--unit-4);
	border-radius: 2px;

	&__header {
		display: flex;
		justify-content: space-between;
		padding: var(--unit-2) var(--unit-8);
		cursor: pointer;
		border: 1px solid var(--ui-02);

		.yoco {
			font-size: 1.2rem;
		}
	}

	&__title {
		display: flex;
		flex-grow: 1;
		align-items: center;
		align-self: center;
		font-size: 16px;
		font-weight: 600;
	}

	&__icon {
		display: inline-block;
		margin-right: var(--unit-4);
		color: var(--accordion-color);
	}

	&__text {
		display: inline-block;
	}

	&__content {
		margin-top: -1px; // prevent border overlap when closed
		overflow: hidden;
		border: 1px solid var(--ui-02);
		border-top: none;

		&--is-open {
			height: auto;
		}

		&--is-closed {
			height: 0;
		}
	}

	&__inner {
		padding: var(--unit-2) var(--unit-8);
	}

	&__toggle {
		display: flex;
		align-items: center;
		align-self: center;
		margin-left: var(--unit-4);
		color: var(--accordion-color);
		user-select: none;
	}
}
</style>
