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
					v-bind="inputProps"
					:checked="option.checked"
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
import { KOTTI_FIELD_PROPS } from '../kotti-field/constants'
import { useField, useForceUpdate } from '../kotti-field/hooks'

import KtCheckbox from './components/KtFieldCheckboxStyle.vue'
import { KOTTI_FIELD_CHECKBOX_GROUP_PROPS } from './constants'
import { KottiFieldCheckboxGroup } from './types'

export default defineComponent({
	name: 'KtFieldCheckboxGroup',
	components: { KtField, KtCheckbox },
	props: {
		...KOTTI_FIELD_PROPS,
		...KOTTI_FIELD_CHECKBOX_GROUP_PROPS,
	},
	setup(props: KottiFieldCheckboxGroup.Props, { emit }) {
		const field = useField<KottiFieldCheckboxGroup.Value>({
			emit,
			isCorrectDataType: (value): value is KottiFieldCheckboxGroup.Value =>
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
				tabIndex: true,
			},
		})

		const { forceUpdate, forceUpdateKey } = useForceUpdate()

		return {
			field,
			forceUpdateKey: forceUpdateKey.value,
			inputProps: computed(() => ({
				...field.inputProps,
				class: 'kt-field-checkbox-group__wrapper__input',
				type: 'checkbox',
			})),
			onChange: (
				key: KottiFieldCheckboxGroup.Entry['key'],
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

		&:not(:last-child) {
			margin-bottom: 0.4rem;
		}
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
