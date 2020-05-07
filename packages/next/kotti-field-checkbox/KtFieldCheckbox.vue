<template>
	<KtField :getEmptyValue="() => null" v-bind="{ field }">
		<div slot="container" class="kt-field-checkbox__wrapper">
			<input v-bind="inputProps" @change="onChange" />
			<slot name="default" />
		</div>
	</KtField>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

import KtField from '../kotti-field'
import { ktFieldProps } from '../kotti-field/constants'
import { useField, useForceUpdate } from '../kotti-field/hooks'

import { KtFieldCheckboxProps } from './types'

export default defineComponent({
	name: 'KtFieldCheckbox',
	components: { KtField },
	props: {
		...ktFieldProps,
	},
	setup(props: KtFieldCheckboxProps, { emit }) {
		const field = useField<boolean | null>({
			emit,
			isCorrectDataType: (value): value is boolean | null =>
				typeof value === 'boolean' || value === null,
			props,
		})

		const { forceUpdate, forceUpdateKey } = useForceUpdate()

		return {
			field,
			inputProps: computed((): Partial<HTMLInputElement> & {
				forceUpdateKey: number
			} => ({
				...field.inputProps,
				checked: field.currentValue ?? false,
				forceUpdateKey: forceUpdateKey.value,
				type: 'checkbox',
			})),
			onChange: (event: { target: HTMLInputElement }) => {
				const newValue = event.target.checked
				field.setValue(typeof newValue === 'boolean' ? newValue : null)

				forceUpdate()
			},
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-field-checkbox__wrapper {
	display: flex;
	align-items: center;
}
</style>
