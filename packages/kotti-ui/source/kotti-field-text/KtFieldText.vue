<template>
	<KtField
		v-bind="{ field }"
		ref="ktFieldRef"
		:getEmptyValue="() => null"
		:helpTextSlot="$slots.helpText"
	>
		<input v-bind="inputProps" @input="onInput" @keyup="onKeyup" />
	</KtField>
</template>

<script lang="ts">
import { computed, defineComponent, type InputHTMLAttributes } from 'vue'

import { KtField } from '../kotti-field'
import {
	useEmitBlur,
	useField,
	useForceUpdate,
	useKtFieldRef,
} from '../kotti-field/hooks'
import { makeProps } from '../make-props'

import { KOTTI_FIELD_TEXT_SUPPORTS } from './constants'
import { KottiFieldText } from './types'

export default defineComponent({
	name: 'KtFieldText',
	components: {
		KtField,
	},
	props: makeProps(KottiFieldText.propsSchema),
	emits: ['blur', 'keyup', 'update:modelValue'],
	setup(props, { emit }) {
		const field = useField<KottiFieldText.ModelValue>({
			emit,
			isEmpty: (value) => value === null,
			props,
			supports: KOTTI_FIELD_TEXT_SUPPORTS,
		})

		const { forceUpdate, forceUpdateKey } = useForceUpdate()
		const ktFieldRef = useKtFieldRef()

		useEmitBlur({
			emit,
			field,
			fieldTarget: computed(() => ktFieldRef.value?.inputContainerRef ?? null),
		})

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
					placeholder: props.placeholder ?? undefined,
					size: 1,
					type: 'text',
					value: field.currentValue ?? '',
				}),
			),
			ktFieldRef,
			onInput: (event: Event) => {
				const newValue = (event.target as HTMLInputElement).value
				field.setValue(newValue === '' ? null : newValue)

				forceUpdate()
			},
			onKeyup: (event: KeyboardEvent) => {
				emit('keyup', event)
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
