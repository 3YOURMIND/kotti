<template>
	<!--<form @submit.prevent="onSubmit">-->
	<form @submit.prevent>
		<slot name="default" />
	</form>
</template>

<script lang="ts">
import { computed, defineComponent, provide } from '@vue/composition-api'
import cloneDeep from 'lodash/cloneDeep'

import { KT_FORM_CONTEXT } from './constants'
import { KottiForm } from './types'

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

		provide<KottiForm.Context>(KT_FORM_CONTEXT, {
			hideValidation,
			setValue(key, newValue) {
				emit('input', {
					...props.value,
					[key]: newValue,
				})
			},
			isLoading,
			validators,
			values,
		})

		return {
			onSubmit() {
				// eslint-disable-next-line no-console
				console.debug('onSubmit')
				// eslint-disable-next-line no-debugger
				debugger
				throw new Error('Not Implemented')
			},
		}
	},
})
</script>
