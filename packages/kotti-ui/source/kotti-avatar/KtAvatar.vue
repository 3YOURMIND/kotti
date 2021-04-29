<template>
	<div
		ref="triggerRef"
		:class="avatarClasses"
		@click="($event) => $emit('click', $event)"
	>
		<slot>
			<div v-if="avatarAvailable">
				<img class="kt-avatar__image" :src="src" @error="imgFallBack" />
			</div>
			<div v-else :class="avatarFallbackClasses">
				<div class="kt-avatar__fallback__head" />
				<div class="kt-avatar__fallback__body" />
			</div>
		</slot>
	</div>
</template>
<script lang="ts">
import { useTippy } from '@3yourmind/vue-use-tippy'
import { computed, defineComponent, ref } from '@vue/composition-api'
import { roundArrow } from 'tippy.js'

import { KottiAvatar } from './types'

const ARROW_HEIGHT = 7
export default defineComponent<KottiAvatar.PropsInternal>({
	name: 'KtAvatar',
	props: {
		isHoverable: { default: false, type: Boolean },
		isSelected: { default: false, type: Boolean },
		isSmall: { default: false, type: Boolean },
		name: { default: null, type: String },
		showTooltip: { default: false, type: Boolean },
		src: { default: null, type: String },
	},
	setup(props) {
		const avatarFallback = ref(true)
		const triggerRef = ref<Element | null>(null)

		useTippy(
			triggerRef,
			computed(() => ({
				arrow: roundArrow,
				content: props.name,
				offset: [0, ARROW_HEIGHT],
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				onShow: (_) => (props.showTooltip ? null : false),
				placement: 'bottom',
				theme: 'kt-avatar-tooltip',
			})),
		)

		return {
			avatarAvailable: computed(
				() => props.src !== null && avatarFallback.value,
			),
			avatarClasses: computed(() => ({
				'kt-avatar': true,
				'kt-avatar--is-hoverable': props.isHoverable,
				'kt-avatar--is-selected': props.isSelected,
				'kt-avatar--is-small': props.isSmall,
			})),
			avatarFallback,
			avatarFallbackClasses: computed(() => ({
				'kt-avatar__fallback': true,
				'kt-avatar__fallback--is-small': props.isSmall,
			})),
			imgFallBack: () => (avatarFallback.value = false),
			triggerRef,
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-avatar {
	--avatar-color: var(--interactive-01);
	position: relative;
	display: inline-flex;
	width: 2.4rem;
	height: 2.4rem;
	background: var(--gray-20);
	border: 0.1rem solid var(--white);
	border-radius: 100%;

	.tippy-box[data-theme~='kt-navbar-tooltip'] {
		color: var(--gray-10);
		background-color: var(--gray-90);
		border: 1px solid var(--gray-90);
		box-shadow: 0 4px 14px -2px var(--gray-100);
	}

	&--is {
		&-hoverable:hover {
			cursor: pointer;
			border: 0.1rem solid var(--avatar-color);
		}

		&-selected {
			background: var(--avatar-color);
		}

		&-small {
			width: 1.6rem;
			height: 1.6rem;
		}
	}

	&__image {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;

		width: 100%;
		height: 100%;

		border-radius: 100%;
		object-fit: cover;
	}

	&__fallback {
		&__head {
			position: absolute;
			top: 0.5rem;
			left: 0.8rem;
			width: 0.6rem;
			height: 0.6rem;
			background: var(--white);
			border-radius: 100%;
		}

		&__body {
			position: absolute;
			top: 1.3rem;
			left: 0.5rem;
			width: 1.2rem;
			height: 0.4rem;
			background: var(--white);
			border-radius: 50% 50% 0 0;
		}

		&--is-small {
			.kt-avatar__fallback__head {
				top: 0.3rem;
				left: 0.5rem;
				width: 0.4rem;
				height: 0.4rem;
			}

			.kt-avatar__fallback__body {
				top: 0.8rem;
				left: 0.3rem;
				width: 0.8rem;
				height: 0.3rem;
			}
		}
	}
}
</style>
