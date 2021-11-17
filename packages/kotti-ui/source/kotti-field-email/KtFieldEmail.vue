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

import { KOTTI_FIELD_EMAIL_SUPPORTS } from './constants'
import { KottiFieldEmail } from './types'

export default defineComponent({
	name: 'KtFieldEmail',
	components: { KtField },
	props: {
		...KOTTI_FIELD_PROPS,
		autoComplete: {
			required: true,
			type: String,
			validator: (value) => ['email', 'username'].includes(value),
		},
		value: { default: null, type: String },
	},
	setup(props: KottiFieldEmail.Props, { emit }) {
		const field = useField<KottiFieldEmail.Value, string | null>({
			emit,
			isCorrectDataType: (value): value is KottiFieldEmail.Value =>
				typeof value === 'string' || value === null,
			isEmpty: (value) => value === null,
			props,
			supports: KOTTI_FIELD_EMAIL_SUPPORTS,
		})

		const { forceUpdate, forceUpdateKey } = useForceUpdate()

		return {
			field,
			inputProps: computed(
				(): Partial<HTMLInputElement> & {
					class: object
					forceUpdateKey: number
				} => ({
					...field.inputProps,
					autocomplete: props.autoComplete,
					class: ['kt-field-email__wrapper'],
					forceUpdateKey: forceUpdateKey.value,
					type: 'email',
					size: 1,
					value: field.currentValue ?? '',
					placeholder: props.placeholder ?? undefined,
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
.kt-field-email__wrapper {
	display: flex;
	width: 100%;
	padding: 0;
	margin: 0;
	line-height: 1.6;
	border: 0;
}
</style>
