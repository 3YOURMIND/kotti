<template>
	<div><slot /></div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { computed, defineComponent, provide } from 'vue'

import { KT_FORM_CONTEXT } from '../../kotti-form/constants'
import type { KottiForm } from '../../kotti-form/types'
import type { KottiFormControllerListItem } from '../types'

export default defineComponent({
	name: 'FormControllerListItem',
	props: {
		context: {
			required: true,
			type: Object as PropType<KottiFormControllerListItem.Props['context']>,
		},
		formKey: { required: true, type: String },
		index: { required: true, type: Number },
		values: {
			required: true,
			type: Object as PropType<KottiFormControllerListItem.Props['values']>,
		},
	},
	emits: ['setValue'],
	setup(props, { emit }) {
		/* eslint-disable vue/no-setup-props-reactivity-loss */
		/**
		 * FIXME: This is not reactive and will likely cause issues. Fixing this
		 * would require adjusting types in KottiForm.Context to support computed
		 * which is out of scope
		 */
		provide<KottiForm.Context>(KT_FORM_CONTEXT, {
			fieldInheritableProps: props.context.fieldInheritableProps,
			formPath: computed(() => [
				...props.context.formPath.value,
				props.formKey,
				props.index,
			]),
			onAddField: props.context.onAddField,
			onRemoveField: props.context.onRemoveField,
			setValue: (formKey, newValue) => {
				emit('setValue', { formKey, newValue })
			},
			validators: props.context.validators,
			values: computed(() => props.values),
		})
	},
})
</script>
