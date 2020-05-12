<template>
	<KtField v-bind="{ field }" :getEmptyValue="() => null" isGroup>
		<div
			slot="container"
			class="kt-field-checkbox-group__wrapper"
			:forceUpdateKey="forceUpdateKey"
		>
			<label
				v-for="option of optionsWithChecked"
				:key="option.key"
				class="kt-field-checkbox__wrapper__label"
			>
				<input
					v-bind="field.inputProps"
					:checked="option.checked"
					class="kt-field-checkbox__wrapper__input"
					type="checkbox"
					@change="onChange(option.key, $event)"
				/>
				<KtCheckbox :value="option.checked" />

				<div v-text="option.label" />
			</label>
		</div>
	</KtField>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import KtField from '../kotti-field'
import KtCheckbox from '../kotti-field-checkbox/KtCheckbox.vue'
import { ktFieldProps } from '../kotti-field/constants'
import { useField, useForceUpdate } from '../kotti-field/hooks'

import { KtFieldCheckboxGroup } from './types'

export default defineComponent({
	name: 'KtFieldCheckboxGroup',
	components: { KtField, KtCheckbox },
	props: {
		...ktFieldProps,
		options: { required: true, type: Array },
	},
	setup(props: KtFieldCheckboxGroup.Props, { emit }) {
		const field = useField<KtFieldCheckboxGroup.Value>({
			emit,
			isCorrectDataType: (value): value is KtFieldCheckboxGroup.Value =>
				typeof value === 'object' &&
				value !== null &&
				Object.values(value).every(
					(value) => typeof value === 'boolean' || value === null,
				),
			props,
		})

		const { forceUpdate, forceUpdateKey } = useForceUpdate()

		return {
			field,
			forceUpdateKey,
			onChange: (
				key: KtFieldCheckboxGroup.Entry['key'],
				event: { target: HTMLInputElement },
			) => {
				const newValue = event.target.checked
				field.setValue({
					...field.currentValue,
					[key]: typeof newValue === 'boolean' ? newValue : null,
				})
				forceUpdate()
			},
			optionsWithChecked: computed(() =>
				props.options.map((option) => ({
					...option,
					checked: field.currentValue[option.key] ?? false,
				})),
			),
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-field-checkbox-group__wrapper {
	display: flex;
	flex-direction: column;

	&__label {
		display: flex;
	}
	&__input {
		display: none;
	}
}
</style>
