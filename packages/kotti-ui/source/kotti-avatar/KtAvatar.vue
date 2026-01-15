<template>
	<div :class="avatarClasses" @click="onAvatarContainerClick">
		<img
			v-if="avatarAvailable"
			ref="triggerRef"
			class="kt-avatar__image"
			:src="src ?? undefined"
			@error="onImageFailedToLoad"
		/>
		<div v-else ref="triggerRef" class="kt-avatar__fallback">
			<i class="yoco" v-text="Yoco.Icon.USER_SOLID" />
		</div>
		<div ref="contentRef">
			<slot name="content">
				<span v-text="name" />
			</slot>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, useTemplateRef } from 'vue'

import { useTippy } from '@3yourmind/vue-use-tippy'
import { Yoco } from '@3yourmind/yoco'

import { TIPPY_DISTANCE_OFFSET } from '../constants'
import { makeProps } from '../make-props'

import { KottiAvatar } from './types'

export default defineComponent({
	name: 'KtAvatar',
	props: makeProps(KottiAvatar.propsSchema),
	emits: ['click'],
	setup(props, { emit, slots }) {
		const avatarFallback = ref(true)

		const contentRef = useTemplateRef<HTMLElement>('contentRef')
		const triggerRef = useTemplateRef<HTMLElement>('triggerRef')

		const hideTippy = computed(
			() => !props.isHoverable || (!slots.content && props.name === null),
		)

		useTippy(
			triggerRef,
			computed(() => ({
				appendTo: () => document.body,
				arrow: false,
				content: contentRef.value ?? undefined,
				interactive: true,
				offset: [0, TIPPY_DISTANCE_OFFSET],
				theme: 'kt-light-border',
				...(hideTippy.value
					? { trigger: 'manual' }
					: { trigger: 'mouseenter focusin' }),
			})),
		)

		onMounted(() => {
			if (contentRef.value === null)
				throw new Error('KtAvatar: Unbound `contentRef` for tippy: null')
		})

		return {
			avatarAvailable: computed(() => props.src && avatarFallback.value),
			avatarClasses: computed(() => ({
				'kt-avatar': true,
				'kt-avatar--is-hoverable': props.isHoverable,
				'kt-avatar--is-size-large': props.size === KottiAvatar.Size.LARGE,
				'kt-avatar--is-size-medium': props.size === KottiAvatar.Size.MEDIUM,
				'kt-avatar--is-size-small': props.size === KottiAvatar.Size.SMALL,
			})),
			avatarFallback,
			onAvatarContainerClick(event: MouseEvent) {
				emit('click', event)
			},
			onImageFailedToLoad: () => {
				avatarFallback.value = false
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
	aspect-ratio: 1/1;
	color: var(--ui-background);
	background: var(--ui-02);
	border: 0.1rem solid var(--ui-background);
	border-radius: 100%;

	&__fallback,
	&__image {
		position: absolute;
		inset: 0;
		width: 100%;
		aspect-ratio: 1/1;
	}

	&__fallback {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&__image {
		object-fit: cover;
		border-radius: 100%;
	}

	&--is-hoverable:hover {
		cursor: pointer;
		border: 0.1rem solid var(--avatar-color);
	}

	&--is-size-small {
		width: 1.6rem;
		height: 1.6rem;
		max-height: 1.6rem;
		font-size: 1.2rem;
	}

	&--is-size-medium {
		width: 2.4rem;
		height: 2.4rem;
		max-height: 2.4rem;
		font-size: 1.8rem;
	}

	&--is-size-large {
		width: 3.2rem;
		height: 3.2rem;
		max-height: 3.2rem;
		font-size: 2.4rem;
	}
}
</style>
