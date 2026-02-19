import type { Ref, WritableComputedRef } from 'vue'
import { computed } from 'vue'

export type ReactStyleUpdater<INTERNAL_VALUE> = (
	updater: INTERNAL_VALUE | ((prevState: INTERNAL_VALUE) => INTERNAL_VALUE),
) => void

type Other<INTERNAL_VALUE> = {
	recalculate: () => void
	tanstackGetter: () => INTERNAL_VALUE
	tanstackSetter: ReactStyleUpdater<INTERNAL_VALUE>
}

type Options<INTERNAL_VALUE, EXTERNAL_VALUE> = {
	get(value: INTERNAL_VALUE): EXTERNAL_VALUE
	set(oldValue: EXTERNAL_VALUE): INTERNAL_VALUE
	sync?(oldValue: INTERNAL_VALUE): INTERNAL_VALUE
	value: Ref<INTERNAL_VALUE>
}

export const useComputedRef = <INTERNAL_VALUE, EXTERNAL_VALUE = INTERNAL_VALUE>(
	options: Options<INTERNAL_VALUE, EXTERNAL_VALUE>,
): Other<INTERNAL_VALUE> & WritableComputedRef<EXTERNAL_VALUE> => {
	const internalValue = options.value

	const result = computed({
		get(): EXTERNAL_VALUE {
			return options.get(internalValue.value)
		},
		set(external: EXTERNAL_VALUE): void {
			internalValue.value = options.set(external)
		},
	}) as Partial<Other<INTERNAL_VALUE>> & WritableComputedRef<EXTERNAL_VALUE>

	result.recalculate = () => {
		if (!options.sync) return
		internalValue.value = options.sync(internalValue.value)
	}
	result.tanstackGetter = () => internalValue.value
	result.tanstackSetter = (updater) => {
		if (typeof updater === 'function') {
			internalValue.value = (
				updater as (prevState: INTERNAL_VALUE) => INTERNAL_VALUE
			)(internalValue.value)
			return
		}

		internalValue.value = updater
	}

	return result as Other<INTERNAL_VALUE> & WritableComputedRef<EXTERNAL_VALUE>
}
