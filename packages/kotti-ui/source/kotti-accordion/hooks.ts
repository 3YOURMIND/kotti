import { ref, Ref } from '@vue/composition-api'

export type Options = KeyframeAnimationOptions & {
	isInitiallyClosed?: boolean
}

const getDefaultOptions = (): Options => ({
	duration: 250,
	easing: 'ease',
	fill: 'forwards',
	isInitiallyClosed: true,
})

export const useSlideAnimation = (
	element: Ref<HTMLElement | null>,
	options: Options,
) => {
	const { isInitiallyClosed, ...restOptions } = options
	const isContentOpen = ref(!isInitiallyClosed)

	const finalOptions = { ...getDefaultOptions(), ...restOptions }
	const getRawHeight = (element: HTMLElement) => element.clientHeight

	const executeAnimation = async (willOpen: boolean): Promise<void> => {
		const animatedObject = element.value ?? null
		if (animatedObject === null) return

		const frames: Keyframe[] = ['0px', `${getRawHeight(animatedObject)}px`].map(
			(height) => ({ height, overflow: 'hidden' }),
		)
		const animation = animatedObject.animate(frames, finalOptions)

		animation.pause()
		animation[willOpen ? 'play' : 'reverse']()

		await animation.finished

		// Clear animation keyframeEffects to allow animatedObject to resize
		animation.cancel()
	}

	const up = async (): Promise<void> => {
		await executeAnimation(false)
		isContentOpen.value = false
	}

	const down = async (): Promise<void> => {
		isContentOpen.value = true
		await executeAnimation(true)
	}

	const toggle = (): Promise<void> => {
		return isContentOpen.value ? up() : down()
	}

	return { toggle, isContentOpen }
}
