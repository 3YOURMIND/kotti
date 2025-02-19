<template>
	<KtField
		v-bind="{ field }"
		:getEmptyValue="() => null"
		:helpTextSlot="$slots.helpText"
		@visibilityChange="handleVisibilityChange"
	>
		<input v-bind="inputProps" @blur="onBlur" @input="onInput" />
	</KtField>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import type { InputHTMLAttributes } from 'vue/types/jsx'

import { KtField } from '../kotti-field'
import { useField, useForceUpdate } from '../kotti-field/hooks'
import { makeProps } from '../make-props'

import { KOTTI_FIELD_PASSWORD_SUPPORTS } from './constants'
import { KottiFieldPassword } from './types'

const VALUE_PLACEHOLDER = '•••'

export default defineComponent({
	name: 'KtFieldPassword',
	components: { KtField },
	props: makeProps(KottiFieldPassword.propsSchema),
	emits: ['blur', 'input'],
	setup(props, { emit }) {
		const field = useField<KottiFieldPassword.Value>({
			emit,
			isEmpty: (value) => value === null,
			props,
			supports: KOTTI_FIELD_PASSWORD_SUPPORTS,
		})
		const fieldType = ref('password')
		const { forceUpdate, forceUpdateKey } = useForceUpdate()
		return {
			field,
			handleVisibilityChange: () => {
				const isValueHidden = fieldType.value === 'password'
				fieldType.value = isValueHidden ? 'text' : 'password'
			},
			inputProps: computed(
				(): InputHTMLAttributes & {
					class: string[]
					forceUpdateKey: number
				} => ({
					...field.inputProps,
					autocomplete: props.autoComplete,
					class: ['kt-field-password__wrapper'],
					forceUpdateKey: forceUpdateKey.value,
					placeholder: props.placeholder ?? undefined,
					size: 1,
					type: fieldType.value,
					value: field.currentValue ?? '',
				}),
			),
			onBlur: () => {
				emit('blur', field.currentValue === null ? null : VALUE_PLACEHOLDER)
			},
			onInput: (event: Event) => {
				const newValue = (event.target as HTMLInputElement).value
				field.setValue(newValue === '' ? null : newValue)

				forceUpdate()
			},
		}
	},
})
</script>

<style lang="scss">
.kt-field-password__wrapper {
	display: flex;
	width: 100%;
	padding: 0;
	margin: 0;
	line-height: 1.6;
	border: 0;
}
</style>
