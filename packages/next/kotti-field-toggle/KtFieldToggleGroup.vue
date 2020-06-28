<template>
	<KtField v-bind="{ field }" :getEmptyValue="() => null" isGroup>
		<div
			slot="container"
			class="kt-field-toggle-group__wrapper"
			:forceUpdateKey="forceUpdateKey"
		>
			<label
				v-for="option of optionsWithChecked"
				:key="option.key"
				class="kt-field-toggle-group__wrapper__label"
				:class="{
					'kt-field-toggle-group__wrapper--is-disabled':
						option.disabled === true,
				}"
			>
				<input
					v-bind="inputProps"
					:checked="option.value === true"
					@change="option.disabled !== true && onChange(option.key, $event)"
				/>
				<ToggleBox v-if="type === 'checkbox'" :value="option.value" />
				<ToggleSwitch v-else :value="option.value" />
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

import ToggleBox from './components/ToggleBox.vue'
import ToggleSwitch from './components/ToggleSwitch.vue'
import {
	KOTTI_FIELD_TOGGLE_GROUP_PROPS,
	KOTTI_FIELD_TOGGLE_SUPPORTS,
} from './constants'
import { KottiFieldToggleGroup } from './types'

export default defineComponent({
	name: 'KtFieldToggleGroup',
	components: { KtField, ToggleBox, ToggleSwitch },
	props: {
		...KOTTI_FIELD_PROPS,
		...KOTTI_FIELD_TOGGLE_GROUP_PROPS,
	},
	setup(props: KottiFieldToggleGroup.Props, { emit }) {
		const field = useField<KottiFieldToggleGroup.Value>({
			emit,
			isCorrectDataType: (value): value is KottiFieldToggleGroup.Value =>
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
			supports: KOTTI_FIELD_TOGGLE_SUPPORTS,
		})

		const { forceUpdate, forceUpdateKey } = useForceUpdate()

		return {
			field,
			forceUpdateKey: forceUpdateKey.value,
			inputProps: computed(() => ({
				...field.inputProps,
				class: 'kt-field-toggle-group__wrapper__input',
				type: 'checkbox',
			})),
			onChange: (
				key: KottiFieldToggleGroup.Entry['key'],
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
					value: field.currentValue[option.key],
				})),
			),
		}
	},
})
</script>

<style lang="scss">
.kt-field-toggle-group__wrapper {
	display: flex;
	flex-direction: column;

	&--is-disabled {
		color: var(--text-05);
	}

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
		.kt-field-toggle-group__wrapper__label {
			color: var(--text-05);
		}
	}
}
</style>
