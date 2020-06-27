<template>
	<KtField v-bind="{ field }" :getEmptyValue="() => null">
		<div slot="container" class="kt-field-toggle__wrapper">
			<label class="kt-field-toggle__wrapper__label">
				<ToggleBox v-if="type === 'checkbox'" :value="field.currentValue" />
				<ToggleSwitch v-else :value="field.currentValue" />
				<slot name="default" :value="field.currentValue" />
				<input v-bind="inputProps" @change="onChange" />
			</label>
		</div>
	</KtField>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

import { KtField } from '../kotti-field'
import { KOTTI_FIELD_PROPS } from '../kotti-field/constants'
import { useField, useForceUpdate } from '../kotti-field/hooks'

import ToggleBox from './components/ToggleBox.vue'
import ToggleSwitch from './components/ToggleSwitch.vue'
import { KottiFieldToggle } from './types'

export default defineComponent({
	name: 'KtFieldToggle',
	components: { KtField, ToggleBox, ToggleSwitch },
	props: {
		...KOTTI_FIELD_PROPS,
		type: {
			default: 'checkbox',
			type: String,
			validator: (value: unknown) => value === 'checkbox' || value === 'switch',
		},
	},
	setup(props: KottiFieldToggle.Props, { emit }) {
		const field = useField<boolean | null>({
			emit,
			isCorrectDataType: (value): value is boolean | null =>
				typeof value === 'boolean' || value === null,
			isEmpty: (value) => value !== true,
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
			inputProps: computed(() => ({
				...field.inputProps,
				checked: field.currentValue ?? false,
				class: 'kt-field-toggle__wrapper__input',
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
	--toggle-border-radius: 0.1rem;
}

.kt-field-toggle__wrapper {
	display: flex;
	align-items: center;

	&__input {
		display: none;
	}

	&__label {
		display: flex;
		align-items: center;
	}
}

.kt-field__wrapper--disabled {
	.kt-field-toggle__wrapper__label {
		color: var(--text-05);
	}
}
</style>
