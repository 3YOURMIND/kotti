<template>
	<div><slot /></div>
</template>

<script lang="ts">
import { defineComponent, provide, computed } from '@vue/composition-api'

import { KottiField } from '../../kotti-field/types'
import { KT_FORM_CONTEXT } from '../constants'
import { KottiForm } from '../types'

export default defineComponent({
	name: 'KtFormControllerListItem',
	props: {
		context: { required: true, type: Object },
		formKey: { required: true, type: String },
		index: { required: true, type: Number },
		values: { required: true, type: Object },
	},
	setup(
		props: {
			context: KottiForm.Context
			formKey: Exclude<KottiField.Props<object[]>['formKey'], null>
			index: number
			values: Record<string, unknown>
		},
		{ emit },
	) {
		provide<KottiForm.Context>(KT_FORM_CONTEXT, {
			formPath: computed(() => [
				...props.context.formPath.value,
				props.index,
				props.formKey,
			]),
			hideValidation: props.context.hideValidation,
			isLoading: props.context.isLoading,
			onAddField: props.context.onAddField,
			onRemoveField: props.context.onRemoveField,
			setValue: (formKey, newValue) => emit('setValue', { formKey, newValue }),
			validators: props.context.validators,
			values: computed(() => props.values),
		})
	},
})
</script>
