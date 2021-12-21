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
import { defineComponent, computed } from '@vue/composition-api'

import { KtField } from '../kotti-field'
import { KOTTI_FIELD_PROPS } from '../kotti-field/constants'
import { useField, useForceUpdate } from '../kotti-field/hooks'

import { KOTTI_FIELD_PASSWORD_SUPPORTS } from './constants'
import { KottiFieldPassword } from './types'

export default defineComponent({
	name: 'KtFieldPassword',
	components: { KtField },
	props: {
		...KOTTI_FIELD_PROPS,
		autoComplete: {
			required: true,
			type: String,
			validator: (value) =>
				['current-password', 'new-password'].includes(value),
		},
		value: { default: null, type: String },
	},
	setup(props: KottiFieldPassword.Props, { emit }) {
		const field = useField<KottiFieldPassword.Value>({
			emit,
			isCorrectDataType: (value): value is KottiFieldPassword.Value =>
				typeof value === 'string' || value === null,
			isEmpty: (value) => value === null,
			props,
			supports: KOTTI_FIELD_PASSWORD_SUPPORTS,
		})

		const { forceUpdate, forceUpdateKey } = useForceUpdate()

		return {
			field,
			inputProps: computed(
				(): Partial<HTMLInputElement> & {
					class: string[]
					forceUpdateKey: number
				} => ({
					...field.inputProps,
					autocomplete: props.autoComplete,
					class: ['kt-field-password__wrapper'],
					forceUpdateKey: forceUpdateKey.value,
					placeholder: props.placeholder ?? undefined,
					type: 'password',
					size: 1,
					value: field.currentValue ?? '',
				}),
			),
			onInput: (event: { target: HTMLInputElement }) => {
				const newValue = event.target.value
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
