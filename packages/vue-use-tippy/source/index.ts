import {
	isRef,
	isReactive,
	onMounted,
	ref,
	Ref,
	onUnmounted,
	watch,
} from '@vue/composition-api'
import castArray from 'lodash.castarray'
import tippy, { Content, Props, Instance, Targets } from 'tippy.js'

type Callback = (t: Instance<Props>[] | null) => void

const applyForEvery = (
	instance: Ref<Instance<Props>[] | null>,
	callback: (tippyInstance: Instance<Props>) => void,
) => {
	if (instance.value)
		for (const tippyInstance of castArray(instance.value))
			callback(tippyInstance)
}

export const useTippy = (
	targets: Targets,
	options: Partial<Props> & {
		content: Ref<Content> | Content
	},
	// eslint-disable-next-line sonarjs/cognitive-complexity
) => {
	const instance = ref<Instance<Props>[] | null>(null)

	const onMountCallbacks: Callback[] = []
	onMounted(() => {
		if (isRef(options.content)) {
			watch(
				options.content,
				(newValue) => {
					options.content = newValue // NOOP?

					applyForEvery(instance, (tippyInstance) =>
						tippyInstance.setContent(newValue),
					)
				},
				{ immediate: true },
			)
		}

		const unwrappedTargets = (() => {
			if (isRef(targets)) return targets.value

			if (Array.isArray(targets))
				return targets.map((target) => (isRef(target) ? target.value : target))

			return targets
		})()

		instance.value = tippy(unwrappedTargets, options)
		onMountCallbacks.forEach((callback) => callback(instance.value))
	})

	const onUnmountCallbacks: Callback[] = []
	onUnmounted(() => {
		applyForEvery(instance, (tippyInstance) => tippyInstance.destroy())
		onUnmountCallbacks.forEach((callback) => callback(instance.value))
	})

	if (isReactive(options) || isRef(options)) {
		const watchSource = isReactive(options) ? () => options : options

		watch(
			watchSource,
			() =>
				applyForEvery(instance, (tippyInstance) =>
					tippyInstance.setProps(options),
				),
			{
				deep: true,
				immediate: true,
			},
		)
	}

	return {
		onMount: (callback: Callback) => onMountCallbacks.push(callback),
		onUnmount: (callback: Callback) => onUnmountCallbacks.push(callback),
		tippy: instance,
	}
}
