import { computed, inject, ref } from '@vue/composition-api'

import { KT_FORM_CONTEXT } from '../kotti-form/constants'
import { KottiForm } from '../kotti-form/types'

import { KottiField } from './types'

export const useField = <DATA_TYPE>(
	props: KottiField.Props<DATA_TYPE>,
): KottiField.Returns<DATA_TYPE> => {
	const context = inject<KottiForm.Context | null>(KT_FORM_CONTEXT, null)

	if (props.formKey === null) throw new Error('Not Implemented')

	const currentValue = computed(() =>
		context === null || props.formKey === null
			? props.value
			: context.values.value[props.formKey],
	)

	const validation = computed(
		(): KottiField.Validation.Result => {
			const resolvedValidatorKey = props.validatorKey ?? props.formKey

			/**
			 * Return true here because without a validator, everything will always
			 * default to being valid
			 */
			if (resolvedValidatorKey === null) return { type: null }

			if (context !== null && resolvedValidatorKey in context.validators.value)
				return context.validators.value[resolvedValidatorKey](
					currentValue.value,
				)

			return props.validator(currentValue.value)
		},
	)

	const hideValidation = computed(() =>
		context === null ? false : context.hideValidation.value,
	)

	return {
		currentValue,
		isDisabled: ref(props.isDisabled),
		isOptional: ref(props.isOptional),
		label: ref(props.label),
		setValue: ref((newValue: DATA_TYPE) => {
			if (context === null || props.formKey === null)
				// FIXME: return (currentValue.value = newValue)
				throw new Error('Not Implemented')

			return context.setValue(props.formKey, newValue)
		}),
		hideValidation,
		validation,
	}
}
