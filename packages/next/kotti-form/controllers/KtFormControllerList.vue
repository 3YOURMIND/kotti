<template>
	<div>
		<KtFormControllerListItem
			v-for="(value, index) in currentValue"
			:key="index"
			:context="context"
			:value="value"
			@setValue="setValue({ ...$event, index })"
		>
			<slot />
		</KtFormControllerListItem>
	</div>
</template>

<script lang="ts">
import { defineComponent, inject, computed } from '@vue/composition-api'

import { KT_FORM_CONTEXT } from '../constants'
import { KottiForm } from '../types'

import KtFormControllerListItem from './KtFormControllerListItem.vue'

export default defineComponent({
	name: 'KtFormControllerList',
	components: { KtFormControllerListItem },
	props: {
		formKey: { required: true, type: String },
	},
	setup(props) {
		const context = inject<KottiForm.Context | null>(KT_FORM_CONTEXT, null)
		if (context === null)
			throw new Error('KtFormControllerList: Could Not Find KtFormContext')

		const currentValue = computed<unknown[]>(() => {
			const result = context.values.value[props.formKey]
			if (!Array.isArray(result))
				throw new Error(
					`KtFormControllerList: Unexpected Data Type ${typeof result}. Expected Array`,
				)
			return result
		})

		const setValue = ({
			formKey,
			index,
			newValue,
		}: {
			formKey: string
			index: number
			newValue: unknown
		}) => {
			context.setValue(
				props.formKey,
				context.values.value[props.formKey].map((oldValue: object, i: number) =>
					i === index ? { ...oldValue, [formKey]: newValue } : oldValue,
				),
			)
		}

		return { context, currentValue, setValue }
	},
})
</script>
