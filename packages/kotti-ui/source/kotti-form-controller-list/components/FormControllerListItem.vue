<template>
	<div><slot /></div>
</template>

<script lang="ts">
import { defineComponent, provide, computed } from 'vue'

import { KT_FORM_CONTEXT } from '../../kotti-form/constants'
import { KottiForm } from '../../kotti-form/types'
import { KottiFormControllerListItem } from '../types'

export default defineComponent({
	name: 'FormControllerListItem',
	props: {
		context: { required: true, type: Object },
		formKey: { required: true, type: String },
		index: { required: true, type: Number },
		values: { required: true, type: Object },
	},
	setup(props: KottiFormControllerListItem.Props, { emit }) {
		provide<KottiForm.Context>(KT_FORM_CONTEXT, {
			fieldInheritableProps: props.context.fieldInheritableProps,
			formPath: computed(() => [
				...props.context.formPath.value,
				props.formKey,
				props.index,
			]),
			onAddField: props.context.onAddField,
			onRemoveField: props.context.onRemoveField,
			setValue: (formKey, newValue) => emit('setValue', { formKey, newValue }),
			validators: props.context.validators,
			values: computed(() => props.values),
		})
	},
})
</script>
