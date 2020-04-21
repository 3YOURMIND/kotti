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
		validators: { default: () => ({}), type: Object },
		value: { required: true, type: Object },
	},
	setup(props, { emit }) {
		const hideValidation = computed(() => props.hideValidation)
		const validators = computed(() => props.validators)
		const values = computed(() => cloneDeep(props.value))

		const context: KottiForm.Context = {
			hideValidation,
			setValue(key, newValue) {
				emit('input', {
					...props.value,
					[key]: newValue,
				})
			},
			validators,
			values,
		}

		provide<KottiForm.Context>(KT_FORM_CONTEXT, context)

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
