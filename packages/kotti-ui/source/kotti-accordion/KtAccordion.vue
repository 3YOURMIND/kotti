<template>
	<div class="accordion">
		<div
			class="accordion__header"
			:class="{ 'accordion__header--clickable': isFullyClickable }"
			@click="headerToggle"
		>
			<div class="accordion__title">
				<slot name="title">
					<i v-if="icon" class="yoco accordion__title__icon" v-text="icon" />
					<div class="accordion__title__text" v-text="title" />
				</slot>
			</div>
			<div class="accordion__toggle" @click.stop="toggle">
				<i class="yoco" v-text="isContentOpen ? 'minus' : 'plus'" />
			</div>
		</div>
		<div
			class="accordion__content"
			:class="isContentOpen ? 'is-open' : 'is-close'"
		>
			<div ref="contentInner" class="inner">
				<slot />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

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
			contentInner,
			headerToggle: () => {
				if (props.isFullyClickable) toggle()
			},
			isContentOpen,
			toggle,
		}
	},
})
</script>

<style lang="scss">
:root {
	--accordion-color: var(--interactive-03);
}

@import '../kotti-style/_variables.scss';

.accordion {
	margin-bottom: var(--unit-4);
	border-radius: 2px;
}

.accordion__header {
	display: flex;
	justify-content: space-between;
	padding: var(--unit-2) var(--unit-8);
	border: 1px solid var(--ui-02);

	.yoco {
		font-size: 1.2rem;
	}
}
.accordion__header--clickable {
	cursor: pointer;
}

.accordion__title {
	display: flex;
	flex-grow: 1;
	align-items: center;
	align-self: center;
	font-size: 16px;
	font-weight: 600;
}

.accordion__content {
	margin-top: -1px; // prevent border overlap when closed
	overflow: hidden;
	border: 1px solid var(--ui-02);
	border-top: none;
	transition: height 200ms linear;

	.inner {
		padding: var(--unit-2) var(--unit-8);
	}
	&.is-open {
		height: var(--height);
	}
	&.is-close {
		height: 0px;
	}
}

.accordion__title__icon,
.accordion__title__text {
	display: inline-block;
}

.accordion__title__icon {
	margin-right: var(--unit-4);
	color: var(--accordion-color);
}

.accordion__toggle {
	display: flex;
	align-items: center;
	align-self: center;
	margin-left: var(--unit-4);
	color: var(--accordion-color);
	cursor: pointer;
	user-select: none;
}
</style>
