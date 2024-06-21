import castArray from 'lodash.castarray'
import type { Props, Instance } from 'tippy.js'
import _tippy from 'tippy.js'
import type { Ref } from 'vue'
import { onMounted, ref, onUnmounted, watch } from 'vue'

/**
 * HACK: This hacky evaluation to tippy at runtime should just be
 * ```js
 * import tippy from 'tippy.js'
 * ```
 *
 * However, there is a strange bug for some user apps, that will load
 * vue-use-tippy as ESM but tippy.js as CJS. If that happens, they
 * will see a error akin to "tippy is not a function".
 *
 * If tippy is not already (correctly) a function, we guess it might
 * be on `.default`
 */
const tippy =
	typeof _tippy === 'function'
		? _tippy
		: (_tippy as unknown as { default: typeof _tippy }).default

type InstanceRefType = Instance[] | Instance | null
type Callback = (t: InstanceRefType) => void
type Target = Ref<Element | null>

const applyForEvery = (
	instance: Ref<InstanceRefType>,
	callback: (tippyInstance: Instance) => void,
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
): {
	onMount: (callback: Callback) => void
	onUnmount: (callback: Callback) => void
	tippy: Ref<InstanceRefType>
} => {
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

		onMountCallbacks.forEach((callback) => {
			callback(instance.value)
		})
	})

	const onUnmountCallbacks: Callback[] = []
	onUnmounted(() => {
		applyForEvery(instance, (tippyInstance) => {
			tippyInstance.destroy()
		})

		onUnmountCallbacks.forEach((callback) => {
			callback(instance.value)
		})
	})

	watch(
		options,
		() => {
			applyForEvery(instance, (tippyInstance) => {
				tippyInstance.setProps(options.value)
			})
		},
		{ immediate: true, flush: 'post' },
	)

	return {
		onMount: (callback: Callback) => onMountCallbacks.push(callback),
		onUnmount: (callback: Callback) => onUnmountCallbacks.push(callback),
		tippy: instance,
	}
}
