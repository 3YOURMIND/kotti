<template>
	<form @submit.prevent="onSubmit">
		<slot name="default" />
		<!-- onSubmit only triggers if there is a submit button in the form -->
		<input v-show="false" type="submit" />
	</form>
</template>

<script lang="ts">
import {
	computed,
	defineComponent,
	provide,
	reactive,
} from '@vue/composition-api'
import cloneDeep from 'lodash/cloneDeep'

import { KottiField } from '../kotti-field/types'

import { KT_FORM_CONTEXT } from './constants'
import { KottiForm } from './types'
import { getValidationSummary } from './utilities'

export default defineComponent({
	name: 'KtForm',
	props: {
		hideValidation: { default: false, type: Boolean },
		isLoading: { default: false, type: Boolean },
		validators: { default: () => ({}), type: Object },
		value: { required: true, type: Object },
	},
	setup(props, { emit }) {
		const hideValidation = computed(() => props.hideValidation)
		const isLoading = computed(() => props.isLoading)
		const validators = computed(() => props.validators)
		const values = computed(() => cloneDeep(props.value))

		const currentFieldsWrapper = reactive<{
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			currentFields: KottiField.Returns<any>[]
		}>({ currentFields: [] })

		provide<KottiForm.Context>(KT_FORM_CONTEXT, {
			hideValidation,
			setValue(key, newValue) {
				emit('input', {
					...props.value,
					[key]: newValue,
				})
			},
			isLoading,
			onAddField(toAdd) {
				currentFieldsWrapper.currentFields = [
					...currentFieldsWrapper.currentFields,
					toAdd,
				]
			},
			onRemoveField(toRemove) {
				currentFieldsWrapper.currentFields = currentFieldsWrapper.currentFields.filter(
					(field) => field !== toRemove,
				)
			},
			validators,
			values,
		})

		const validations = computed(() =>
			currentFieldsWrapper.currentFields.map((field) => field.validation),
		)

		const isValid = computed(() =>
			validations.value.every((validation) =>
				// TODO: Implement props.validation strict level flag
				['warning', 'success', null].includes(validation.type),
			),
		)

		return {
			onSubmit() {
				if (isValid.value) {
					const validationSummary = getValidationSummary(validations.value)

					emit('submit', {
						validationSummary,
						values: values.value,
					} as KottiForm.Events.Submit)
				}
			},
			validations,
		}
	},
})
</script>
