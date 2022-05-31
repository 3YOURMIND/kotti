<template>
	<div :class="avatarClasses" @click="onAvatarContainerClick">
		<img
			v-if="avatarAvailable"
			ref="tooltipTriggerRef"
			class="kt-avatar__image"
			:src="src"
			@error="onImageFailedToLoad"
		/>
		<div v-else ref="tooltipTriggerRef" class="kt-avatar__fallback">
			<i class="yoco" v-text="Yoco.Icon.USER_SOLID" />
		</div>
	</div>
</template>

<script lang="ts">
import { useTippy } from '@3yourmind/vue-use-tippy'
import { Yoco } from '@3yourmind/yoco'
import { computed, defineComponent, Ref, ref } from '@vue/composition-api'
import { roundArrow } from 'tippy.js'

import { TIPPY_LIGHT_BORDER_ARROW_HEIGHT } from '../constants'
import { makeProps } from '../make-props'

import { KottiAvatar } from './types'

const useTooltip = (name: Ref<string | null>) => {
	const tooltipTriggerRef = ref<Element | null>(null)

	useTippy(
		tooltipTriggerRef,
		computed(() => ({
			appendTo: () => document.body,
			arrow: roundArrow,
			content: name.value,
			offset: [0, TIPPY_LIGHT_BORDER_ARROW_HEIGHT],
			theme: 'light-border',
			...(name.value === null ? { trigger: 'manual' } : {}),
		})),
	)

	return {
		tooltipTriggerRef,
	}
}

export default defineComponent<KottiAvatar.PropsInternal>({
	name: 'KtAvatar',
	props: makeProps(KottiAvatar.propsSchema),
	setup(props, { emit }) {
		const avatarFallback = ref(true)

		return {
			...useTooltip(computed(() => props.name)),
			avatarAvailable: computed(() => props.src && avatarFallback.value),
			avatarClasses: computed(() => ({
				'kt-avatar': true,
				'kt-avatar--is-hoverable': props.isHoverable,
				'kt-avatar--is-size-large': props.size === KottiAvatar.Size.LARGE,
				'kt-avatar--is-size-medium': props.size === KottiAvatar.Size.MEDIUM,
				'kt-avatar--is-size-small': props.size === KottiAvatar.Size.SMALL,
			})),
			avatarFallback,
			onImageFailedToLoad: () => {
				avatarFallback.value = false
			},
			onAvatarContainerClick(event: MouseEvent) {
				emit('click', event)
			},
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
:root {
	--avatar-color: var(--interactive-01);
}

.kt-avatar {
	position: relative;
	display: inline-flex;
	color: var(--white);
	background: var(--ui-02);
	border: 0.1rem solid var(--white);
	border-radius: 100%;

	&__fallback,
	&__image {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;

		width: 100%;
		height: 100%;
	}

	&__fallback {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&__image {
		border-radius: 100%;
		object-fit: cover;
	}

	&--is-hoverable:hover {
		cursor: pointer;
		border: 0.1rem solid var(--avatar-color);
	}

	&--is-size-small {
		width: 1.6rem;
		height: 1.6rem;
		font-size: 1.2rem;
	}

	&--is-size-medium {
		width: 2.4rem;
		height: 2.4rem;
		font-size: 1.8rem;
	}

	&--is-size-large {
		width: 3.2rem;
		height: 3.2rem;
		font-size: 2.4rem;
	}
}
</style>
