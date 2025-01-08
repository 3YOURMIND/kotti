import type { Ref } from 'vue'
import { watch } from 'vue'

const getDefaultOptions = (): KeyframeAnimationOptions => ({
	duration: 250,
	easing: 'ease',
	fill: 'forwards',
})

export const useSlideAnimation = (
	element: Ref<HTMLElement | null>,
	isContentOpen: Readonly<Ref<boolean>>,
	options: KeyframeAnimationOptions,
): void => {
	const finalOptions = { ...getDefaultOptions(), ...options }
	const getRawHeight = (element: HTMLElement) => element.clientHeight

	const executeAnimation = async (willOpen: boolean): Promise<void> => {
		const animatedObject = element.value ?? null
		if (animatedObject === null) return
		const rawHeight = getRawHeight(animatedObject).toString()

		const frames: Keyframe[] = ['0px', `${rawHeight}px`].map((height) => ({
			height,
			overflow: 'hidden',
		}))
		const animation = animatedObject.animate(frames, finalOptions)

		animation.pause()

		if (willOpen) animation.play()
		else animation.reverse()

		await animation.finished

		// Clear animation keyframeEffects to allow animatedObject to resize
		animation.cancel()
	}

	watch(
		() => isContentOpen.value,
		(shouldBeShown, wasShown) => {
			if (shouldBeShown === wasShown) return

			void executeAnimation(shouldBeShown)
		},
		{ flush: 'post', immediate: true },
	)
}
