<template>
	<KtField v-bind="{ field }" :getEmptyValue="() => null">
		<textarea v-bind="inputProps" @input="onInput" />
		<div slot="actionIcon" />
	</KtField>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

import { KtField } from '../kotti-field'
import { ktFieldProps } from '../kotti-field/constants'
import { useField, useForceUpdate } from '../kotti-field/hooks'

import { KtFieldTextAreaProps } from './types'

export default defineComponent({
	name: 'KtFieldTextArea',
	components: { KtField },
	props: {
		...ktFieldProps,
		rows: { default: 5, type: Number },
	},
	setup(props: KtFieldTextAreaProps, { emit }) {
		const field = useField<string | null>({
			emit,
			isCorrectDataType: (value): value is string | null =>
				typeof value === 'string' || value === null,
			isEmpty: (value) => value === null,
			props,
			supports: {
				clear: false,
				decoration: false,
				placeholder: true,
				tabIndex: true,
			},
		})

		const { forceUpdate, forceUpdateKey } = useForceUpdate()

		return {
			field,
			inputProps: computed((): Partial<HTMLTextAreaElement> & {
				class: unknown
				forceUpdateKey: number
			} => ({
				...field.inputProps,
				class: ['kt-field-text-area__wrapper'],
				forceUpdateKey: forceUpdateKey.value,
				placeholder: field.placeholder ?? undefined,
				rows: props.rows,
				value: field.currentValue ?? '',
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
.kt-field-text-area__wrapper {
	display: flex;
	width: 100%;
	padding: 8px 0;
	margin: 0;
	line-height: 1.6;
	color: var(--text-01);
	resize: vertical;
	border: 0;
	outline: none;

	&:disabled {
		color: var(--text-05);
	}
}
</style>
