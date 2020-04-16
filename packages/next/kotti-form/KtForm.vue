<template>
	<!--<form @submit.prevent="onSubmit">-->
	<form @submit.prevent>
		<slot name="default" />
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

import { KT_FORM_CONTEXT } from './constants'
import { KottiForm } from './types'

export default defineComponent({
	name: 'KtForm',
	props: {
		validators: { default: {}, type: Object },
		value: { required: true, type: Object },
	},
	setup(props, { emit }) {
		const values = computed(() => {
			console.debug('KtForm: value changed')
			return cloneDeep(props.value)
		})

		const context = reactive<KottiForm.Context>({
			setValue(key, newValue) {
				console.debug('KtForm: setValue called')
				emit('input', {
					...props.value,
					[key]: newValue,
				})
			},
			validators: {},
			values,
		})

		provide(KT_FORM_CONTEXT, context)

		return {
			onSubmit() {
				console.debug('onSubmit')
				debugger
				throw new Error('Not Implemented')
			},
		}
	},
})
</script>
