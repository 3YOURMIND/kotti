<template>
	<form @submit.prevent="onSubmit">
		<slot name="default" />
		<!-- onSubmit only triggers if there is a submit button in the form -->
		<input v-show="false" type="submit" />
	</form>
</template>

<script lang="ts">
import cloneDeep from 'lodash/cloneDeep.js'
import type { PropType } from 'vue'
import { computed, defineComponent, provide, reactive } from 'vue'

import { KottiField } from '../kotti-field/types'
import { makeProps } from '../make-props'

import { KT_FORM_CONTEXT, KT_FORM_SUBMIT_CONTEXT } from './constants'
import { ktFormErrors } from './errors'
import type { KottiForm } from './types'
import { getValidationSummary } from './utilities'

let id = 0

export default defineComponent({
	name: 'KtForm',
	props: {
		...makeProps(
			// FIXME: should be done on propsSchema level once KtForms use zod
			KottiField.inheritablePropsSchema.merge(
				KottiField.potentiallySupportedPropsSchema.pick({
					hideClear: true,
				}),
			),
		),
		formId: {
			default: () => `autoGeneratedFormId${++id}`,
			type: String,
		},
		preventSubmissionOn: {
			default: 'error',
			type: String as PropType<KottiForm.Props['preventSubmissionOn']>,
			validator: (
				value: unknown,
			): value is KottiForm.Props['preventSubmissionOn'] => {
				return (
					typeof value === 'string' &&
					['error', 'NEVER', 'warning'].includes(value)
				)
			},
		},
		validators: { default: () => ({}), type: Object },
		value: { required: true, type: Object },
	},
	emits: ['input', 'submit'],
	setup(props, { emit }) {
		const currentFieldsWrapper = reactive<{
			currentFields: KottiField.Hook.Returns<unknown>[]
		}>({ currentFields: [] })

		const values = computed(() => cloneDeep(props.value))
		const isLoading = computed(() => props.isLoading)

		provide<KottiForm.Context>(KT_FORM_CONTEXT, {
			fieldInheritableProps: computed(() => ({
				hideClear: props.hideClear,
				hideValidation: props.hideValidation,
				isDisabled: props.isDisabled,
				isLoading: props.isLoading,
				showVisibilityToggle: props.showVisibilityToggle,
				size: props.size,
			})),
			formPath: computed(() => [props.formId]),
			onAddField(toAdd) {
				currentFieldsWrapper.currentFields = [
					...currentFieldsWrapper.currentFields,
					toAdd as (typeof currentFieldsWrapper.currentFields)[number],
				]
			},
			onRemoveField(toRemove) {
				currentFieldsWrapper.currentFields =
					currentFieldsWrapper.currentFields.filter(
						(field) => field !== toRemove,
					)
			},
			setValue(key, newValue) {
				emit('input', {
					...props.value,
					[key]: newValue,
				})
			},
			validators: computed(() => props.validators),
			values,
		})

		const validations = computed(() =>
			currentFieldsWrapper.currentFields.map((field) => field.validation),
		)

		const valueIsValid = ({ type }: KottiField.Validation.Result) => {
			if (props.preventSubmissionOn === 'warning')
				return type !== 'warning' && type !== 'error'

			if (props.preventSubmissionOn === 'error') return type !== 'error'

			return true
		}

		const validationSummary = computed(() =>
			getValidationSummary(validations.value),
		)

		const isValid = computed(() => validations.value.every(valueIsValid))

		provide<KottiForm.SubmitContext>(KT_FORM_SUBMIT_CONTEXT, {
			isLoading,
			isValid,
			validationSummary,
		})

		return {
			onSubmit() {
				switch (props.preventSubmissionOn) {
					case 'warning':
						if (validationSummary.value.warnings.length > 0)
							throw new ktFormErrors.ValidationError(
								props,
								'warning',
								validationSummary.value.warnings,
							)
					// fall through
					case 'error':
						if (validationSummary.value.errors.length > 0)
							throw new ktFormErrors.ValidationError(
								props,
								'error',
								validationSummary.value.errors,
							)
					// fall through
					case 'NEVER':
						break
				}

				if (!isValid.value)
					throw new ktFormErrors.UnexpectedValidationStateError(props)

				const onSubmitData: KottiForm.Events.Submit = {
					validationSummary: validationSummary.value,
					values: values.value,
				}

				/**
				 * Deep-clone to prevent users from accidentally modifying the internal state
				 */
				emit('submit', cloneDeep(onSubmitData))
			},
			validations,
		}
	},
})
</script>
