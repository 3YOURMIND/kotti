import { Ref, watch } from 'vue'

const getDefaultOptions = (): KeyframeAnimationOptions => ({
	duration: 250,
	easing: 'ease',
	fill: 'forwards',
})

export const useSlideAnimation = (
	element: Ref<HTMLElement | null>,
	isContentOpen: Readonly<Ref<boolean>>,
	options: KeyframeAnimationOptions,
) => {
	const finalOptions = { ...getDefaultOptions(), ...options }
	const getRawHeight = (element: HTMLElement) => element.clientHeight

	const executeAnimation = async (willOpen: boolean): Promise<void> => {
		const animatedObject = element.value ?? null
		if (animatedObject === null) return

		const frames: Keyframe[] = ['0px', `${getRawHeight(animatedObject)}px`].map(
			(height) => ({ height, overflow: 'hidden' }),
		)
		const animation = animatedObject.animate(frames, finalOptions)

		animation.pause()
		willOpen ? animation.play() : animation.reverse()

		await animation.finished

		// Clear animation keyframeEffects to allow animatedObject to resize
		animation.cancel()
	}

	watch(
		() => isContentOpen.value,
		(shouldBeShown, wasShown) => {
			if (shouldBeShown === wasShown) return

			executeAnimation(shouldBeShown)
		},
		{ immediate: true },
	)
}
