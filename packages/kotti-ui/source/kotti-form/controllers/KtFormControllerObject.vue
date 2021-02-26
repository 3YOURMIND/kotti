<template>
	<div>
		<slot
			:setValue="(key, newValue) => setValue(key, newValue)"
			:setValues="setValues"
			:values="values"
		/>
	</div>
</template>

<script lang="ts">
import {
	defineComponent,
	inject,
	computed,
	provide,
} from '@vue/composition-api'

import { KT_FORM_CONTEXT } from '../constants'
import { KottiForm } from '../types'

import { KottiFormControllerObject } from './types'

export default defineComponent({
	name: 'KtFormControllerObject',
	props: {
		formKey: { required: true, type: String },
	},
	setup(props: KottiFormControllerObject.Props) {
		const context = inject<KottiForm.Context | null>(KT_FORM_CONTEXT, null)
		if (context === null)
			throw new Error('KtFormControllerObject: Could Not Find KtFormContext')

		const values = computed(
			(): KottiForm.ContextType => {
				const result = context.values.value[props.formKey]

				const errorText = (type: string) =>
					`KtFormControllerObject: Unexpected Data Type ${type}. Expected Object`

				if (result === null) throw new Error(errorText('null'))
				if (Array.isArray(result)) throw new Error(errorText('array'))
				if (typeof result !== 'object')
					throw new Error(errorText(typeof result))

				return result as KottiForm.ContextType
			},
		)

		/**
		 * Updates a single key in a KtFormControllerObject values
		 */
		const setValue = (key, newValue) =>
			context.setValue(props.formKey, {
				...values.value,
				[key]: newValue,
			})

		provide<KottiForm.Context>(KT_FORM_CONTEXT, {
			fieldInheritableProps: context.fieldInheritableProps,
			formPath: computed(() => [...context.formPath.value, props.formKey]),
			onAddField: context.onAddField,
			onRemoveField: context.onRemoveField,
			setValue,
			validators: context.validators,
			values,
		})

		return {
			setValue,
			/**
			 * Updates KtFormControllerObject values
			 */
			setValues: (newValue) => context.setValue(props.formKey, newValue),
			values,
		}
	},
})
</script>
