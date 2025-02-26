import cloneDeep from 'lodash/cloneDeep.js'
import type { Ref } from 'vue'
import {
	computed,
	inject,
	onBeforeMount,
	onMounted,
	onUnmounted,
	reactive,
	ref,
	watch,
} from 'vue'

import { KT_FORM_CONTEXT } from '../kotti-form/constants'
import type { KottiForm } from '../kotti-form/types'
import { useTranslationNamespace } from '../kotti-i18n/hooks'
import { isOrContainsEventTarget } from '../utilities'

import { FORM_KEY_NONE } from './constants'
import { ktFieldErrors } from './errors'
import { KottiField } from './types'

let ktFieldId = 1

const useDecoration = <DATA_TYPE>({
	props,
	supports,
}: Pick<KottiField.Hook.Parameters<DATA_TYPE>, 'props' | 'supports'>) => {
	return {
		leftIcon: computed(() => (supports.decoration ? props.leftIcon : null)),
		prefix: computed(() => (supports.decoration ? props.prefix : null)),
		rightIcon: computed(() => (supports.decoration ? props.rightIcon : null)),
		showVisibilityToggle: computed(() =>
			supports.decoration ? props.showVisibilityToggle : false,
		),
		suffix: computed(() => (supports.decoration ? props.suffix : null)),
	}
}

const useInputProps = <DATA_TYPE>({
	context,
	isDisabled,
	props,
}: Pick<KottiField.Hook.Parameters<DATA_TYPE>, 'props'> & {
	context: KottiForm.Context | null
	isDisabled: Ref<boolean>
}) => {
	// Generate unique id for input outside computed to avoid undesired reactivity
	const id = String(++ktFieldId)

	const formPath = computed(() => {
		if (context === null) return []

		if (props.formKey === null)
			throw new ktFieldErrors.ImplicitFormKeyNoneError(props)

		return props.formKey === FORM_KEY_NONE
			? [...context.formPath.value]
			: [...context.formPath.value, props.formKey]
	})

	return {
		inputProps: computed(() => ({
			'data-test': props.dataTest ?? formPath.value.join('.'),
			disabled: isDisabled.value,
			id,
			tabindex: props.tabIndex,
		})),
	}
}

const useTexts = (props: KottiField.PropsInternal) => {
	return {
		helpDescription: computed(() => props.helpDescription),
		helpText: computed(() => props.helpText),
		label: computed(() => props.label),
	}
}

const useValue = <DATA_TYPE>({
	context,
	emit,
	isDisabled,
	isEmpty,
	isLoading,
	props,
}: Pick<KottiField.Hook.Parameters<DATA_TYPE>, 'emit' | 'isEmpty' | 'props'> & {
	context: KottiForm.Context | null
	isDisabled: Ref<boolean>
	isLoading: Ref<boolean>
}) => {
	watch(
		() => props.formKey,
		(newFormKey) => {
			if (context !== null && newFormKey === null)
				throw new ktFieldErrors.ImplicitFormKeyNoneError(props)

			if (context === null && newFormKey !== null)
				throw new ktFieldErrors.InvalidPropOutsideOfContextError(
					props,
					'formKey',
				)
		},
		{ flush: 'post', immediate: true },
	)

	// fetch value

	const currentValue = computed((): DATA_TYPE => {
		if (context === null) return cloneDeep(props.value)

		switch (props.formKey) {
			case FORM_KEY_NONE:
				return cloneDeep(props.value)

			case null:
				throw new ktFieldErrors.ImplicitFormKeyNoneError(props)

			default:
				return context.values.value[props.formKey] as DATA_TYPE
		}
	})

	return {
		currentValue,
		isEmpty: computed(() => isEmpty(currentValue.value)),
		/**
		 * setValue
		 * @param newValue the value to set
		 * @param options defines forceUpdate to set value even when the field is disabled
		 */
		setValue: ref((newValue: unknown, options?: { forceUpdate: boolean }) => {
			if ((isDisabled.value || isLoading.value) && !options?.forceUpdate)
				throw new ktFieldErrors.DisabledSetValueCalledError(props)

			if (
				context === null ||
				props.formKey === null ||
				props.formKey === FORM_KEY_NONE
			) {
				emit('input', newValue)
				return
			}

			context.setValue(props.formKey, newValue)
		}),
	}
}

const useValidation = <DATA_TYPE>({
	context,
	currentValue,
	hideValidation,
	isEmpty,
	props,
}: Pick<KottiField.Hook.Parameters<DATA_TYPE>, 'props'> &
	Pick<
		KottiField.Hook.ReturnsWithRefs<DATA_TYPE>,
		'currentValue' | 'isEmpty'
	> & {
		context: KottiForm.Context | null
		hideValidation: Ref<KottiField.InheritablePropsInternal['hideValidation']>
	}) => {
	const translations = useTranslationNamespace('KtFields')

	const isMissingRequiredField = computed(
		(): boolean => !props.isOptional && isEmpty.value,
	)

	return {
		hideValidation,
		// FIXME: Write unit test to figure out if props.isDisabled affects this function or if a computed() is necessary
		validation: computed((): KottiField.Validation.Result => {
			const customValidation = (() => {
				if (!context && props.formKey)
					throw new ktFieldErrors.InvalidPropOutsideOfContextError(
						props,
						'formKey',
					)

				if (
					context &&
					props.formKey !== null &&
					props.formKey !== FORM_KEY_NONE &&
					props.formKey in context.validators.value
				)
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					return context.validators.value[props.formKey]!(currentValue.value)

				return props.validator(currentValue.value)
			})()

			return isMissingRequiredField.value
				? customValidation.type === 'error'
					? customValidation
					: { text: translations.value.requiredMessage, type: 'error' }
				: customValidation
		}),
	}
}

/**
 * Implements KottiField.InheritablePropsInternal
 * Prioritizes the field props, the context, and the passed default, respectively
 */
const useInheritableProperties = <DATA_TYPE>({
	context,
	props,
}: Pick<KottiField.Hook.Parameters<DATA_TYPE>, 'props'> & {
	context: KottiForm.Context | null
}) => {
	/**
	 * Get a single property from either the KtFieldComponents or the KtFormContext
	 * Gives priority to the KtFieldComponents and implements default fallbacks
	 */
	const useShared = <KEY extends keyof KottiField.InheritablePropsInternal>(
		key: KEY,
		defaultValue: KottiField.InheritablePropsInternal[KEY],
	) =>
		computed((): KottiField.InheritablePropsInternal[KEY] => {
			if (props[key]) return props[key]

			if (context !== null && context.fieldInheritableProps.value[key])
				return context.fieldInheritableProps.value[key]

			return defaultValue
		})

	const isLoading = useShared('isLoading', false)

	return {
		hideClear: useShared('hideClear', false),
		hideValidation: computed(() =>
			isLoading.value ? true : useShared('hideValidation', false).value,
		),
		isDisabled: useShared('isDisabled', false),
		isLoading,
		size: useShared('size', KottiField.Size.MEDIUM),
	}
}

/**
 * hook into lifecycle events
 */
const useNotifyContext = <DATA_TYPE>({
	context,
	field,
}: {
	context: KottiForm.Context | null
	field: KottiField.Hook.Returns<DATA_TYPE>
}) => {
	onMounted(() => {
		if (context) context.onAddField(field)
	})

	onUnmounted(() => {
		if (context) context.onRemoveField(field)
	})
}

export const useField = <DATA_TYPE>({
	emit,
	isEmpty,
	props,
	supports,
}: KottiField.Hook.Parameters<DATA_TYPE>): KottiField.Hook.Returns<DATA_TYPE> => {
	const context = inject<KottiForm.Context | null>(KT_FORM_CONTEXT, null)

	const sharedProperties = useInheritableProperties({ context, props })
	const values = useValue({
		context,
		emit,
		isDisabled: sharedProperties.isDisabled,
		isEmpty,
		isLoading: sharedProperties.isLoading,
		props,
	})

	// export

	const field = reactive<KottiField.Hook.ReturnsWithRefs<DATA_TYPE>>({
		...sharedProperties,
		...useDecoration({ props, supports }),
		...useInputProps({
			context,
			isDisabled: sharedProperties.isDisabled,
			props,
		}),
		...useTexts(props),
		...useValidation({
			context,
			currentValue: values.currentValue,
			hideValidation: sharedProperties.hideValidation,
			isEmpty: values.isEmpty,
			props,
		}),
		...values,
		hideClear: computed(
			() =>
				values.isEmpty.value ||
				sharedProperties.isDisabled.value ||
				(supports.clear ? sharedProperties.hideClear.value : true),
		),
		isBorderless: computed(() => props.isBorderless),
		isOptional: computed(() => props.isOptional),
	}) as KottiField.Hook.Returns<DATA_TYPE>

	useNotifyContext({ context, field })

	return field
}

export const useInput = (
	fieldId: string,
): {
	clickInput: () => void
	focusInput: () => void
} => {
	return {
		clickInput: () => {
			// eslint-disable-next-line unicorn/prefer-query-selector
			const inputEl = document.getElementById(fieldId)
			inputEl?.click()
		},
		focusInput: () => {
			// eslint-disable-next-line unicorn/prefer-query-selector
			const inputEl = document.getElementById(fieldId)
			inputEl?.focus()
		},
	}
}

/**
 * Vue doesn't support controlled input fields without explicitly re-rendering.
 * Therefore, in case nothing changed, we may need to re-render
 *
 * @description Vue doesn't alter native html input behavior; that is, the emitted value is immediately bound to :value
 * We need to force the component to re-render with the value that we actually last wanted to bind to `:value`
 * The emitted value doesn't immediately have to be the actually bound value; making the input `controlled`
 */
export const useForceUpdate = (): {
	forceUpdate: () => void
	forceUpdateKey: Ref<number>
} => {
	const forceUpdateKey = ref(0)

	return {
		forceUpdate: () => {
			// HACK: This basically just updates some arbitrary ref so that vue thinks the input element needs to be re-rendered
			forceUpdateKey.value++
		},
		forceUpdateKey,
	}
}

export const useKtFieldRef = (): Ref<{
	inputContainerRef: HTMLDivElement
	inputContainerWrapperRef: HTMLDivElement
} | null> => {
	/**
	 * both inputContainerRef and inputContainerWrapperRef
	 * are template refs on KtField.vue
	 */
	const ktFieldRef = ref<{
		inputContainerRef: Ref<HTMLDivElement>
		inputContainerWrapperRef: Ref<HTMLDivElement>
	} | null>(null)

	return ktFieldRef
}

export const useEmitBlur = <T>({
	emit,
	field,
	fieldTarget,
	findEventTarget,
	valueOverride,
}: {
	emit: (event: 'blur', value: T | null) => void
	field: KottiField.Hook.Returns<T>
	fieldTarget: Ref<Array<HTMLElement | null> | HTMLElement | null>
	findEventTarget?: (target: EventTarget | null) => EventTarget | null
	valueOverride?: T | null
}): void => {
	/**
	 * last element to capture the click or focus event
	 */
	const lastEventTarget = ref<EventTarget | null>(null)

	const isFieldTargeted = (target: Event['target'] | null): boolean =>
		Array.isArray(fieldTarget.value)
			? fieldTarget.value.some((ft) => isOrContainsEventTarget(ft, target))
			: isOrContainsEventTarget(fieldTarget.value, target)

	const onClickOrFocusChange = (event: Event) => {
		if (event.target === null || field.isDisabled) return

		const eventTarget = findEventTarget?.(event.target) ?? event.target

		const wasFieldTargetedBefore = isFieldTargeted(lastEventTarget.value)
		const isFieldTargetedNow = isFieldTargeted(eventTarget)

		if (!isFieldTargetedNow && wasFieldTargetedBefore) {
			if (valueOverride !== undefined) {
				emit('blur', field.currentValue === null ? null : valueOverride)
			} else {
				emit('blur', field.currentValue)
			}
		}

		lastEventTarget.value = eventTarget
	}

	onBeforeMount(() => {
		window.addEventListener('click', onClickOrFocusChange, true)
		window.addEventListener('focus', onClickOrFocusChange, true)
	})

	onUnmounted(() => {
		window.removeEventListener('click', onClickOrFocusChange)
		window.removeEventListener('focus', onClickOrFocusChange)
	})
}
