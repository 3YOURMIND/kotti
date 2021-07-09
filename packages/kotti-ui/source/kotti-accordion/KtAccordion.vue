<template>
	<div class="kt-accordion">
		<div :class="headerClasses" @click="headerToggle">
			<div class="kt-accordion__title">
				<slot name="title">
					<i v-if="icon" class="yoco kt-accordion__title__icon" v-text="icon" />
					<div class="kt-accordion__title__text" v-text="title" />
				</slot>
			</div>
			<div class="kt-accordion__toggle" @click.stop="toggle">
				<i class="yoco" v-text="toggleIcon" />
			</div>
		</div>
		<div :class="contentClasses">
			<div ref="contentInner" class="kt-accordion__content__inner">
				<slot />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { computed, defineComponent, ref } from '@vue/composition-api'

import { useSlideAnimaion } from './hooks'
import { KottiAccordion } from './types'

export default defineComponent<KottiAccordion.PropsInternal>({
	name: 'KtAccordion',
	props: {
		icon: { default: null, type: String },
		isClosed: { default: false, type: Boolean },
		isFullyClickable: { default: false, type: Boolean },
		title: { required: true, type: String },
	},
	setup(props) {
		const contentInner = ref<HTMLElement | null>(null)

		const { isContentOpen, toggle } = useSlideAnimaion(contentInner, {
			duration: 300,
			isInitiallyClosed: props.isClosed,
		})
		return {
			contentClasses: computed(() => ({
				'kt-accordion__content': true,
				'kt-accordion__content--is-closed': !isContentOpen.value,
				'kt-accordion__content--is-open': isContentOpen.value,
			})),
			contentInner,
			headerClasses: computed(() => ({
				'kt-accordion__header': true,
				'kt-accordion__header--clickable': props.isFullyClickable,
			})),
			headerToggle: () => {
				if (props.isFullyClickable) toggle()
			},
			toggle,
			toggleIcon: computed(() =>
				isContentOpen.value ? Yoco.Icon.MINUS : Yoco.Icon.PLUS,
			),
		}
	},
})
</script>

<style lang="scss" scoped>
:root {
	--accordion-color: var(--interactive-03);
}

.kt-accordion {
	margin-bottom: var(--unit-4);
	border-radius: 2px;

	&__header {
		display: flex;
		justify-content: space-between;
		padding: var(--unit-2) var(--unit-8);
		border: 1px solid var(--ui-02);

		.yoco {
			font-size: 1.2rem;
		}

		&--clickable {
			cursor: pointer;
		}
	}

	&__title {
		display: flex;
		flex-grow: 1;
		align-items: center;
		align-self: center;
		font-size: 16px;
		font-weight: 600;

		&__icon {
			display: inline-block;
			margin-right: var(--unit-4);
			color: var(--accordion-color);
		}

		&__text {
			display: inline-block;
		}
	}

	&__content {
		margin-top: -1px; // prevent border overlap when closed
		overflow: hidden;
		border: 1px solid var(--ui-02);
		border-top: none;
		transition: height 200ms linear;

		&__inner {
			padding: var(--unit-2) var(--unit-8);
		}
		&--is-open {
			height: var(--height);
		}
		&--is-closed {
			height: 0px;
		}
	}

	&__toggle {
		display: flex;
		align-items: center;
		align-self: center;
		margin-left: var(--unit-4);
		color: var(--accordion-color);
		cursor: pointer;
		user-select: none;
	}
}
</style>
