import castArray from 'lodash.castarray'
import tippy, { Props, Instance } from 'tippy.js'
import { onMounted, ref, Ref, onUnmounted, watch } from 'vue'

type InstanceRefType = Instance<Props>[] | Instance<Props> | null
type Callback = (t: InstanceRefType) => void
type Target = Ref<Element | null>

const applyForEvery = (
	instance: Ref<InstanceRefType>,
	callback: (tippyInstance: Instance<Props>) => void,
) => {
	if (instance.value !== null)
		for (const tippyInstance of castArray(instance.value))
			callback(tippyInstance)
}

const unwrapAndThrowOnNull = (target: Target) => {
	if (target.value === null) throw new Error('useTippy: Unexpected null target')

	return target.value
}

/**
 * @see {@link https://atomiks.github.io/tippyjs/v6/all-props} for options
 */
export const useTippy = (
	targets: Array<Target> | Target | string,
	options: Ref<Partial<Props>>,
) => {
	const instance = ref<InstanceRefType>(null)

	const onMountCallbacks: Callback[] = []
	onMounted(() => {
		if (typeof targets === 'string') {
			instance.value = tippy(targets, options.value)
		} else if (Array.isArray(targets)) {
			const unwrappedTargets = targets.map((target) =>
				unwrapAndThrowOnNull(target),
			)
			instance.value = tippy(unwrappedTargets, options.value)
		} else {
			instance.value = tippy(unwrapAndThrowOnNull(targets), options.value)
		}

		onMountCallbacks.forEach((callback) => callback(instance.value))
	})

	const onUnmountCallbacks: Callback[] = []
	onUnmounted(() => {
		applyForEvery(instance, (tippyInstance) => tippyInstance.destroy())

		onUnmountCallbacks.forEach((callback) => callback(instance.value))
	})

	watch(
		options,
		() =>
			applyForEvery(instance, (tippyInstance) =>
				tippyInstance.setProps(options.value),
			),
		{ immediate: true, flush: 'post' },
	)

	return {
		onMount: (callback: Callback) => onMountCallbacks.push(callback),
		onUnmount: (callback: Callback) => onUnmountCallbacks.push(callback),
		tippy: instance,
	}
}
