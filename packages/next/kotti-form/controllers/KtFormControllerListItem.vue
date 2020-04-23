<template>
	<div><slot /></div>
</template>

<script lang="ts">
import { defineComponent, provide, computed } from '@vue/composition-api'

import { KT_FORM_CONTEXT } from '../constants'
import { KottiForm } from '../types'

export default defineComponent({
	name: 'KtFormControllerListItem',
	props: {
		context: { required: true, type: Object },
		values: { required: true, type: Object },
	},
	setup(
		props: {
			context: KottiForm.Context
			values: Record<string, unknown>
		},
		{ emit },
	) {
		provide<KottiForm.Context>(KT_FORM_CONTEXT, {
			hideValidation: props.context.hideValidation,
			isLoading: props.context.isLoading,
			setValue: (formKey, newValue) => emit('setValue', { formKey, newValue }),
			validators: props.context.validators,
			values: computed(() => props.values),
		})
	},
})
</script>
