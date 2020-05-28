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
				class="kt-field-checkbox-group__wrapper__label"
			>
				<input
					v-bind="field.inputProps"
					:checked="option.checked"
					class="kt-field-checkbox-group__wrapper__input"
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

import { KtField } from '../kotti-field'
import { ktFieldProps } from '../kotti-field/constants'
import { useField, useForceUpdate } from '../kotti-field/hooks'

import KtCheckbox from './components/KtFieldCheckboxStyle.vue'
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
			isEmpty: (value) =>
				value !== null &&
				typeof value === 'object' &&
				Object.values(value).every((value) => value !== true),
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

<style lang="scss">
.kt-field-checkbox-group__wrapper {
	display: flex;
	flex-direction: column;

	&__label {
		display: flex;
		margin-bottom: 0.4rem;
	}

	&__input {
		display: none;
	}
}

.kt-field__wrapper {
	&--disabled {
		.kt-field-checkbox-group__wrapper__label {
			color: var(--text-05);
		}
	}
}
</style>
