<template>
	<KtField v-bind="{ field }" :getEmptyValue="() => null">
		<input v-bind="inputProps" @input="onInput" />
	</KtField>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

import { KtField } from '../kotti-field'
import { ktFieldProps } from '../kotti-field/constants'
import { useField, useForceUpdate } from '../kotti-field/hooks'

import { KtFieldTextProps } from './types'

export default defineComponent({
	name: 'KtFieldText',
	components: { KtField },
	props: {
		...ktFieldProps,
	},
	setup(props: KtFieldTextProps, { emit }) {
		const field = useField<string | null>({
			emit,
			isCorrectDataType: (value): value is string | null =>
				typeof value === 'string' || value === null,
			isEmpty: (value) => value === null,
			props,
			supports: {
				clear: true,
				decoration: true,
				placeholder: true,
				tabIndex: true,
			},
		})

		const { forceUpdate, forceUpdateKey } = useForceUpdate()

		return {
			field,
			inputProps: computed((): Partial<HTMLInputElement> & {
				class: unknown
				forceUpdateKey: number
			} => ({
				...field.inputProps,
				class: ['kt-field-text__wrapper'],
				forceUpdateKey: forceUpdateKey.value,
				type: 'text',
				value: field.currentValue ?? '',
				placeholder: field.placeholder ?? undefined,
			})),
			onInput: (event: { target: HTMLInputElement }) => {
				const newValue = event.target.value
				field.setValue(newValue === '' ? null : newValue)

				forceUpdate()
			},
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-field-text__wrapper {
	display: flex;
	width: 100%;
	padding: 0;
	margin: 0;
	line-height: 1.6;
	color: var(--text-01);
	border: 0;
	outline: none;

	&:disabled {
		color: var(--text-05);
	}
}
</style>
