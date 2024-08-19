<template>
	<KtField
		v-bind="{ field }"
		:getEmptyValue="() => null"
		:helpTextSlot="$slots.helpText"
	>
		<input v-bind="inputProps" @input="onInput" />
	</KtField>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { InputHTMLAttributes } from 'vue/types/jsx'

import { KtField } from '../kotti-field'
import { useField, useForceUpdate } from '../kotti-field/hooks'
import { makeProps } from '../make-props'

import { KOTTI_FIELD_TEXT_SUPPORTS } from './constants'
import { KottiFieldText } from './types'

export default defineComponent({
	name: 'KtFieldText',
	components: {
		KtField,
	},
	props: makeProps(KottiFieldText.propsSchema),
	emits: ['input'],
	setup(props, { emit }) {
		const field = useField<KottiFieldText.Value>({
			emit,
			isEmpty: (value) => value === null,
			props,
			supports: KOTTI_FIELD_TEXT_SUPPORTS,
		})

		const { forceUpdate, forceUpdateKey } = useForceUpdate()

		return {
			field,
			inputProps: computed(
				(): InputHTMLAttributes & {
					class: string[]
					forceUpdateKey: number
				} => ({
					...field.inputProps,
					autocomplete: props.autoComplete,
					class: ['kt-field-text__wrapper'],
					forceUpdateKey: forceUpdateKey.value,
					type: 'text',
					size: 1,
					value: field.currentValue ?? '',
					placeholder: props.placeholder ?? undefined,
				}),
			),
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
.kt-field-text__wrapper {
	display: flex;
	width: 100%;
	padding: 0;
	margin: 0;
	line-height: 1.6;
	border: 0;
}
</style>
