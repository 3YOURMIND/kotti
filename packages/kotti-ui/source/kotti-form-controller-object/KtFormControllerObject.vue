<template>
	<div>
		<slot :setValue="setValue" :setValues="setValues" :values="values" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, provide } from 'vue'

import { KT_FORM_CONTEXT } from '../kotti-form/constants'
import type { KottiForm } from '../kotti-form/types'

export default defineComponent({
	name: 'KtFormControllerObject',
	props: {
		formKey: { required: true, type: String },
	},
	setup(props) {
		const context = inject<KottiForm.Context | null>(KT_FORM_CONTEXT, null)
		if (context === null)
			throw new Error('KtFormControllerObject: Could Not Find KtFormContext')

		const values = computed((): KottiForm.ContextType => {
			const result = context.values.value[props.formKey]

			const errorText = (type: string) =>
				`KtFormControllerObject: Unexpected Data Type ${type}. Expected Object`

			if (result === null) throw new Error(errorText('null'))
			if (Array.isArray(result)) throw new Error(errorText('array'))
			if (typeof result !== 'object') throw new Error(errorText(typeof result))

			return result as KottiForm.ContextType
		})

		/**
		 * Updates a single key in a KtFormControllerObject values
		 */
		const setValue = (
			key: keyof KottiForm.ContextType,
			newValue: KottiForm.ContextType[keyof KottiForm.ContextType],
		) => {
			context.setValue(props.formKey, {
				...values.value,
				[key]: newValue,
			})
		}

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
			setValues: (newFormValues: KottiForm.ContextType) => {
				context.setValue(props.formKey, newFormValues)
			},
			values,
		}
	},
})
</script>
