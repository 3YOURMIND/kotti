import {
	computed,
	inject,
	ref,
	watch,
	reactive,
	onUnmounted,
	onMounted,
	watchEffect,
} from '@vue/composition-api'
import cloneDeep from 'lodash/cloneDeep'

import { KT_FORM_CONTEXT } from '../kotti-form/constants'
import { KottiForm } from '../kotti-form/types'

import { FORM_KEY_NONE } from './constants'
import { KOTTI_FIELD_PROPS } from './constants'
import { KtFieldErrors } from './errors'
import { KottiField } from './types'

export const useField = <DATA_TYPE>({
	emit,
	isCorrectDataType,
	isEmpty,
	props,
	supports,
}: KottiField.Hook.Parameters<
	DATA_TYPE
>): KottiField.Hook.Returns<DATA_TYPE> => {
	const context = inject<KottiForm.Context | null>(KT_FORM_CONTEXT, null)

	// sanity-checks

	watch(
		() => props.formKey,
		(newFormKey) => {
			if (context !== null && newFormKey === null)
				throw new KtFieldErrors.ImplicitFormKeyNone(props)

			if (context === null && newFormKey !== null)
				throw new KtFieldErrors.InvalidPropOutsideOfContext(props, 'formKey')
		},
	)

	watch(
		() => props.validatorKey,
		(newValidatorKey) => {
			if (context === null && newValidatorKey !== null)
				throw new KtFieldErrors.InvalidPropOutsideOfContext(
					props,
					'validatorKey',
				)
		},
	)

	/**
	 * Some fields do not support a subset of the KtField.Props.
	 * We explicitly throw errors for props that are not effectively
	 * consumed (i.e. not to be displayed). This prevents users
	 * from accidentally passing unneeded or misleading props.
	 */
	watchEffect(() => {
		type Key = keyof KottiField.Supports
		type Value = Array<keyof KottiField.Props<DATA_TYPE>>

		const PROPS_TO_CHECK_FOR_SUPPORTS: Record<Key, Value> = {
			clear: ['hideClear'],
			decoration: ['leftIcon', 'rightIcon', 'prefix', 'suffix'],
			placeholder: ['placeholder'],
			tabIndex: ['tabIndex'],
		}

		for (const [supportsKey, propsToCheck] of Object.entries(
			PROPS_TO_CHECK_FOR_SUPPORTS,
		) as Array<[Key, Value]>)
			if (!supports[supportsKey])
				for (const propKey of propsToCheck)
					if (props[propKey] !== KOTTI_FIELD_PROPS[propKey].default)
						throw new KtFieldErrors.UnsupportedProp(props, {
							supportsKey,
							propKey,
							value: props[propKey],
						})
	})

	// fetch value

	const currentValue = computed(
		(): DATA_TYPE => {
			const value = (() => {
				if (context === null) return cloneDeep(props.value)

				switch (props.formKey) {
					case FORM_KEY_NONE:
						return cloneDeep(props.value)

					case null:
						throw new KtFieldErrors.ImplicitFormKeyNone(props)

					default:
						return context.values.value[props.formKey] as DATA_TYPE
				}
			})()

			if (!isCorrectDataType(value))
				throw new KtFieldErrors.InvalidDataType(props, value)

			return value
		},
	)

	// formPath

	const formPath = computed(() => {
		if (context === null) return []

		if (props.formKey === null)
			throw new KtFieldErrors.ImplicitFormKeyNone(props)

		return props.formKey === FORM_KEY_NONE
			? [...context.formPath.value]
			: [...context.formPath.value, props.formKey]
	})

	// validation

	const isLoading = computed(() => {
		if (props.isLoading) return true
		if (context !== null) return context.isLoading.value
		return false
	})

	const hideValidation = computed(() =>
		isLoading.value
			? true
			: context === null
			? false
			: context.hideValidation.value,
	)

	const isMissingRequiredField = computed(
		(): boolean => !props.isOptional && isEmpty(currentValue.value),
	)

	const validation = computed(
		// eslint-disable-next-line sonarjs/cognitive-complexity
		(): KottiField.Validation.Result => {
			if (props.validatorKey && props.validator)
				throw new KtFieldErrors.NonDeterministicValidatorUsage(props)

			if (context) {
				if (props.validatorKey) {
					if (!(props.validatorKey in context.validators.value))
						throw new KtFieldErrors.ValidatorNotFound(props)

					return context.validators.value[props.validatorKey](
						currentValue.value,
					)
				}

				// if no validatorKey is defined, we should try to fall-back to using the formKey
				if (
					props.formKey !== null &&
					props.formKey !== FORM_KEY_NONE &&
					props.formKey in context.validators.value
				)
					return context.validators.value[props.formKey](currentValue.value)
			} else {
				if (props.validatorKey)
					throw new KtFieldErrors.InvalidPropOutsideOfContext(
						props,
						'validatorKey',
					)

				if (props.formKey)
					throw new KtFieldErrors.InvalidPropOutsideOfContext(props, 'formKey')
			}

			/**
			 * Return default validator result here because without a validator, everything will always
			 * default to being valid
			 */
			return props.validator
				? props.validator(currentValue.value)
				: { type: null }
		},
	)

	// export

	const isDisabled = computed(() => props.isDisabled)

	const field = reactive<KottiField.Hook.ReturnsWithRefs<DATA_TYPE>>({
		currentValue,
		helpText: computed(() => props.helpText),
		hideClear: computed(() => props.hideClear),
		hideValidation,
		inputProps: computed(() => ({
			/**
			 * in a controllerListItem, we want to identify a field by
			 * the formId.formKey without the index
			 * thus, we’re only including strings in order to get rid of array indices
			 */
			'data-test': formPath.value
				.filter(
					(pathSegment: string | number) => typeof pathSegment === 'string',
				)
				.join('.'),
			disabled: isDisabled.value,
			tabindex: props.tabIndex,
		})),
		isDisabled,
		isEmpty: computed(() => isEmpty(currentValue.value)),
		isLoading,
		isOptional: computed(() => props.isOptional),
		isSmall: computed(() => props.isSmall),
		label: computed(() => props.label),
		leftIcon: computed(() => props.leftIcon),
		placeholder: computed(() => props.placeholder),
		prefix: computed(() => props.prefix),
		rightIcon: computed(() => props.rightIcon),
		// FIXME: Maybe this needs to be a computed, because props.isDisabled wouldn’t change otherwise
		// not sure though, might need to write a unit test for this case to figure it out
		setValue: ref((newValue: unknown) => {
			if (!isCorrectDataType(newValue))
				throw new KtFieldErrors.InvalidDataType(props, newValue)

			if (props.isDisabled)
				throw new KtFieldErrors.DisabledSetValueCalled(props)

			if (
				context === null ||
				props.formKey === null ||
				props.formKey === FORM_KEY_NONE
			)
				return emit('input', newValue)

			return context.setValue(props.formKey, newValue)
		}),
		suffix: computed(() => props.suffix),
		validation: computed(
			(): KottiField.Validation.Result =>
				isMissingRequiredField.value
					? validation.value.type === 'error'
						? validation.value
						: { type: 'error', text: 'This Field is Required' }
					: validation.value,
		),
	})

	// hook into lifecycle events

	onMounted(() => {
		if (context) context.onAddField(field)
	})

	onUnmounted(() => {
		if (context) context.onRemoveField(field)
	})

	return field
}

/**
 * Vue doesn't support controlled input fields without explicitly re-rendering.
 * Therefore, in case nothing changed, we may need to re-render
 *
 * @description Vue doesn't alter native html input behavior; that is, the emitted value is immediately bound to :value
 * We need to force the component to re-render with the value that we actually last wanted to bind to `:value`
 * The emitted value doesn't immediately have to be the actually bound value; making the input `controlled`
 */
export const useForceUpdate = () => {
	const forceUpdateKey = ref(0)

	return {
		forceUpdateKey,
		forceUpdate: () => {
			// HACK: This basically just updates some arbitrary ref so that vue thinks the input element needs to be re-rendered
			forceUpdateKey.value++
		},
	}
}
