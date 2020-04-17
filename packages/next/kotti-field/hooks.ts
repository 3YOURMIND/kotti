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
				throw new Error(
					'Encountered a KtField without a formKey inside a KtForm',
				)

			if (context === null && newFormKey !== null)
				throw new Error('Encountered a KtField with a formKey outside a KtForm')
		},
	)

	watch(
		() => props.validatorKey,
		(newValidatorKey) => {
			if (context === null && newValidatorKey !== null)
				throw new Error(
					'Encountered a KtField with a validatorKey outside a KtForm',
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
				throw new Error(
					'Encountered a KtField without a formKey inside a KtForm',
				)

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
			/**
			 * Using both a validatorKey and a validator is most likely a mistake. Therefore,
			 * this gets treated as an error here. If you need multiple validators, consider
			 * implementing a custom validator that checks multiple conditions instead.
			 */
			if (props.validatorKey && props.validator)
				throw new Error(
					`useField(${props.formKey}): You cannot define a "validatorKey" and a "validator" function at the same time.`,
				)

			if (context) {
				if (props.validatorKey) {
					/**
					 * If the validatorKey can’t be found in the context, this is most likely a mistake.
					 */
					if (!(props.validatorKey in context.validators.value))
						throw new Error(
							`useField(${props.formKey}): validatorKey “${props.validatorKey}” couldn’t be found in the KtFormContext validators`,
						)

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
				const errors = [
					props.validatorKey && `validatorKey: ${props.validatorKey}`,
					props.formKey && `formKey: ${props.formKey}`,
				].filter(Boolean)

				if (errors.length !== 0)
					throw new Error(
						`${errors.join(',')} defined outside a KtForm context.`,
					)
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
		isDisabled: ref(props.isDisabled),
		isOptional: ref(props.isOptional),
		label: ref(props.label),
		setValue: ref((newValue: DATA_TYPE) => {
			if (
				context === null ||
				props.formKey === null ||
				props.formKey === FORM_KEY_NONE
			)
				return emit('input', newValue)

			return context.setValue(props.formKey, newValue)
		}),
		hideValidation,
		validation,
	}
}
