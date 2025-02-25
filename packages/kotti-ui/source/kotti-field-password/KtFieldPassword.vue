<template>
	<KtField
		v-bind="{ field }"
		ref="ktFieldRef"
		:getEmptyValue="() => null"
		:helpTextSlot="$slots.helpText"
		@visibilityChange="handleVisibilityChange"
	>
		<input v-bind="inputProps" @input="onInput" />
	</KtField>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import type { InputHTMLAttributes } from 'vue/types/jsx'

import { KtField } from '../kotti-field'
import {
	useEmitBlur,
	useField,
	useForceUpdate,
	useKtFieldRef,
} from '../kotti-field/hooks'
import { makeProps } from '../make-props'

import { KOTTI_FIELD_PASSWORD_SUPPORTS } from './constants'
import { KottiFieldPassword } from './types'

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
		const ktFieldRef = useKtFieldRef()

		useEmitBlur({
			emit,
			field,
			fieldTarget: computed(() => ktFieldRef.value?.inputContainerRef ?? null),
			valueOverride: '•••',
		})

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
			ktFieldRef,
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
