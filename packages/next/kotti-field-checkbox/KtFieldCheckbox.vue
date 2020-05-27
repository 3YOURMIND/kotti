<template>
	<KtField v-bind="{ field }" :getEmptyValue="() => null">
		<div slot="container" class="kt-field-checkbox__wrapper">
			<label class="kt-field-checkbox__wrapper__label">
				<input
					v-bind="inputProps"
					class="kt-field-checkbox__wrapper__input"
					@change="onChange"
				/>
				<KtCheckbox :value="field.currentValue" />
				<slot name="default" />
			</label>
		</div>
	</KtField>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

import { KtField } from '../kotti-field'
import { ktFieldProps } from '../kotti-field/constants'
import { useField, useForceUpdate } from '../kotti-field/hooks'

import KtCheckbox from './components/KtFieldCheckboxStyle.vue'
import { KtFieldCheckboxProps } from './types'

export default defineComponent({
	name: 'KtFieldCheckbox',
	components: { KtField, KtCheckbox },
	props: {
		...ktFieldProps,
	},
	setup(props: KtFieldCheckboxProps, { emit }) {
		const field = useField<boolean | null>({
			emit,
			isCorrectDataType: (value): value is boolean | null =>
				typeof value === 'boolean' || value === null,
			isEmpty: (value) => value !== true,
			props,
			supports: {
				clear: false,
				decoration: false,
				placeholder: false,
				tabIndex: true,
			},
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

<style lang="scss">
:root {
	--checkbox-border-radius: 0.1rem;
}

.kt-field-checkbox__wrapper {
	display: flex;
	align-items: center;

	&__input {
		// margin-right: 0.4rem;
		display: none;
	}

	&__label {
		display: flex;
		align-items: center;
	}
}
</style>
