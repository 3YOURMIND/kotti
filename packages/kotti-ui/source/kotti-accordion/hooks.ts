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

export const useSlideAnimaion = (
	element: Ref<HTMLElement | null>,
	options: Options,
) => {
	const { isInitiallyClosed, ...restOptions } = options
	const isContentOpen = ref(!isInitiallyClosed)

	const finalOptions = { ...getDefaultOptions(), ...restOptions }
	const getRawHeight = () => element.value?.clientHeight

	const triggerAnimation = async (
		willOpen: boolean,
	): Promise<Animation | void> => {
		const frames = ['0px', `${getRawHeight()}px`].map((height) => {
			return { height, overflow: 'hidden' }
		})
		const animation = element.value?.animate(frames, finalOptions) ?? null
		if (animation === null) return

		animation.pause()
		animation[willOpen ? 'play' : 'reverse']()

		return animation.finished
	}

	const up = async (): Promise<void> => {
		await triggerAnimation(false)
		isContentOpen.value = false
	}

	const down = async (): Promise<void> => {
		isContentOpen.value = true
		await triggerAnimation(true)
	}

	const toggle = (): Promise<void> => {
		return isContentOpen.value ? up() : down()
	}

	return { up, down, toggle, isContentOpen }
}
