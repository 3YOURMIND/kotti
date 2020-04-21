import {
	computed,
	inject,
	ref,
	watch,
	SetupContext,
} from '@vue/composition-api'

import { KT_FORM_CONTEXT } from '../kotti-form/constants'
import { KottiForm } from '../kotti-form/types'

import { FORM_KEY_NONE } from './constants'
import { KtFieldErrors } from './errors'
import { KottiField } from './types'

export const useField = <DATA_TYPE>(
	props: KottiField.Props<DATA_TYPE>,
	emit: SetupContext['emit'],
	// eslint-disable-next-line sonarjs/cognitive-complexity
): KottiField.Returns<DATA_TYPE> => {
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

	// fetch value

	const currentValue = computed(() => {
		if (context === null) return props.value

		switch (props.formKey) {
			case FORM_KEY_NONE:
				return props.value

			case null:
				throw new KtFieldErrors.ImplicitFormKeyNone(props)

			default:
				return context.values.value[props.formKey]
		}
	})

	// validation

	const hideValidation = computed(() =>
		context === null ? false : context.hideValidation.value,
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

	return {
		currentValue,
		hideValidation,
		isDisabled: computed(() => props.isDisabled),
		isOptional: computed(() => props.isOptional),
		label: computed(() => props.label),
		setValue: ref((newValue: DATA_TYPE) => {
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
		validation,
	}
}
