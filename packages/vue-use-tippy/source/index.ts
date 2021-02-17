import {
	isRef,
	onMounted,
	ref,
	Ref,
	onUnmounted,
	watch,
} from '@vue/composition-api'
import castArray from 'lodash.castarray'
import tippy, { Props, Instance } from 'tippy.js'
import { VNode } from 'vue/types/umd'

type InstanceRefType = Instance<Props>[] | Instance<Props> | null
type Callback = (t: InstanceRefType) => void
type Target = Ref<VNode | null> | string

const applyForEvery = (
	instance: Ref<InstanceRefType>,
	callback: (tippyInstance: Instance<Props>) => void,
) => {
	if (instance.value !== null)
		for (const tippyInstance of castArray(instance.value))
			callback(tippyInstance)
}

/**
 * @see {@link https://atomiks.github.io/tippyjs/v6/all-props} for options
 */
export const useTippy = (
	targets: Array<Target> | Target,
	options: Ref<Partial<Props>>,
) => {
	const instance = ref<InstanceRefType>(null)

	const onMountCallbacks: Callback[] = []
	onMounted(() => {
		const unwrappedTargets = (() => {
			if (isRef(targets)) return targets.value

			if (Array.isArray(targets))
				return targets.map((target) => (isRef(target) ? target.value : target))

			return targets
		})()

		instance.value = tippy(unwrappedTargets, options.value)

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
		{ immediate: true },
	)

	return {
		onMount: (callback: Callback) => onMountCallbacks.push(callback),
		onUnmount: (callback: Callback) => onUnmountCallbacks.push(callback),
		tippy: instance,
	}
}
