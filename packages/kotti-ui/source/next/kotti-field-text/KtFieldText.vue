<template>
	<KtField v-bind="{ field }" :getEmptyValue="() => null">
		<input v-bind="inputProps" @input="onInput" />
	</KtField>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

import { KtField } from '../kotti-field'
import { KOTTI_FIELD_PROPS } from '../kotti-field/constants'
import { useField, useForceUpdate } from '../kotti-field/hooks'

import { KOTTI_FIELD_TEXT_SUPPORTS } from './constants'
import { KottiFieldText } from './types'

export default defineComponent({
	name: 'KtFieldText',
	components: { KtField },
	props: {
		...KOTTI_FIELD_PROPS,
		placeholder: { default: null, type: String },
	},
	setup(props: KottiFieldText.Props, { emit }) {
		const field = useField<KottiFieldText.Value>({
			emit,
			isCorrectDataType: (value): value is KottiFieldText.Value =>
				typeof value === 'string' || value === null,
			isEmpty: (value) => value === null,
			props,
			supports: KOTTI_FIELD_TEXT_SUPPORTS,
		})

		const { forceUpdate, forceUpdateKey } = useForceUpdate()

		return {
			field,
			/**
			 * FIXME: Type definition for HTMLInputElement was removed due to a bug
			 * when generating the types using rollup
			 */
			inputProps: computed(() => ({
				...field.inputProps,
				class: ['kt-field-text__wrapper'],
				forceUpdateKey: forceUpdateKey.value,
				type: 'text',
				value: field.currentValue ?? '',
				placeholder: props.placeholder ?? undefined,
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
