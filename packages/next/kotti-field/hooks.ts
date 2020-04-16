import { computed, inject, ref } from '@vue/composition-api'

import { KT_FORM_CONTEXT } from '../kotti-form/constants'
import { KottiForm } from '../kotti-form/types'

import { KottiField } from './types'

export const useField = <DATA_TYPE>(
	props: KottiField.Props<DATA_TYPE>,
): KottiField.Returns<DATA_TYPE> => {
	const context = inject<KottiForm.Context | null>(KT_FORM_CONTEXT, null)

	if (props.formKey === null) throw new Error('Not Implemented')

	const currentValue = computed(() => {
		// eslint-disable-next-line no-console
		console.debug('COMPUTED: currentValue updated')

		return context === null || props.formKey === null
			? props.value
			: context.values[props.formKey]
	})

	const validatorResult = computed(() => {
		const resolvedValidatorKey = props.validatorKey ?? props.formKey

		/**
		 * Return true here because without a validator, everything will always
		 * default to being valid
		 */
		if (resolvedValidatorKey === null) return true

		if (context !== null && resolvedValidatorKey in context.validators)
			return context.validators[resolvedValidatorKey](currentValue)

		return props.validator(currentValue)
	})

	const isValid = computed(() => validatorResult.value === true)
	const errorMessage = computed(() =>
		validatorResult.value === true ? null : validatorResult.value,
	)

	return {
		errorMessage,
		currentValue,
		isDisabled: ref(props.isDisabled),
		isOptional: ref(props.isOptional),
		isValid,
		label: ref(props.label),
		setValue: ref((newValue: DATA_TYPE) => {
			if (context === null || props.formKey === null)
				// FIXME: return (currentValue.value = newValue)
				throw new Error('Not Implemented')

			return context.setValue(props.formKey, newValue)
		}),
	}
}
