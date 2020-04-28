<template>
	<KtField :getEmptyValue="() => null" v-bind="{ field }">
		<input v-bind="inputProps" style="width: 100%;" @input="onInput" />
	</KtField>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

import KtField from '../kotti-field'
import { ktFieldProps } from '../kotti-field/constants'
import { useField } from '../kotti-field/hooks'

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
			props,
		})

		return {
			field,
			inputProps: computed(() => ({
				...field.inputProps,
				type: 'text',
				value: field.currentValue,
				placeholder: field.placeholder ?? undefined,
			})),
			// FIXME: Find proper Types for this
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			onInput: (event: any) => {
				const newValue = event.target.value
				field.setValue(newValue === '' ? null : newValue)
			},
		}
	},
})
</script>
