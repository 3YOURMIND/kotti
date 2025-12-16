<template>
	<component
		:is="component"
		class="kt-field-toggle-inner"
		:class="toggleClasses"
	>
		<input
			v-bind="inputProps"
			:checked="modelValue === true"
			:tabindex="isDisabled ? -1 : undefined"
			type="checkbox"
			@change="onInput"
		/>
		<component :is="svgComponent.is" :class="svgComponent.class" />
		<slot name="default" />
	</component>
</template>

<script lang="ts">
import type { InputHTMLAttributes, PropType } from 'vue'
import { computed, defineComponent } from 'vue'

import { KottiFieldToggle } from '../../kotti-field-toggle/types'
import type { KottiField } from '../../kotti-field/types'

import ToggleBox from './ToggleBox.vue'
import ToggleSwitch from './ToggleSwitch.vue'

export default defineComponent({
	name: 'ToggleInner',
	components: { ToggleBox, ToggleSwitch },
	props: {
		component: { required: true, type: String },
		inputProps: {
			required: true,
			type: Object as PropType<
				KottiField.Hook.Returns<KottiFieldToggle.ModelValue>['inputProps']
			>,
		},
		isDisabled: { required: true, type: Boolean },
		modelValue: { default: null, type: Boolean as PropType<boolean | null> },
		type: { default: 'checkbox', type: String },
	},
	emits: ['update:modelValue'],
	setup(props, { emit }) {
		return {
			onInput: (event: Event) => {
				const newValue = (event.target as InputHTMLAttributes).checked

				if (!props.isDisabled) emit('update:modelValue', newValue)
			},
			svgComponent: computed(() => {
				const isBox = props.type === KottiFieldToggle.Shared.Type.CHECKBOX
				return {
					class: {
						'kt-field-toggle-inner__svg': true,
						'kt-field-toggle-inner__svg--is-box': isBox,
						'kt-field-toggle-inner__svg--is-switch': !isBox,
					},
					is: isBox ? ToggleBox.name : ToggleSwitch.name,
				}
			}),
			toggleClasses: computed(() => ({
				'kt-field-toggle-inner--is-disabled': props.isDisabled,
				'kt-field-toggle-inner--is-indeterminate': props.modelValue === null,
				'kt-field-toggle-inner--is-off': props.modelValue === false,
				'kt-field-toggle-inner--is-on': props.modelValue === true,
			})),
		}
	},
})
</script>

<style lang="scss">
:root {
	--toggle-border-radius: 1px;
}

.kt-field-toggle-inner {
	display: flex;
	gap: var(--unit-2);
	align-items: flex-start;
	cursor: pointer;

	input {
		display: none;

		&:focus + .kt-field-toggle-inner__svg--is-box {
			outline: 1px solid var(--primary-50);
			outline-offset: 3px;
		}

		&:focus:not(:focus-visible) + .kt-field-toggle-inner__svg--is-box {
			outline: none;
		}

		&:focus + .kt-field-toggle-inner__svg--is-switch {
			outline: 1px solid var(--primary-50);
			outline-offset: 1px;
		}

		&:focus:not(:focus-visible) + .kt-field-toggle-inner__svg--is-switch {
			outline: none;
		}
	}

	&--is-disabled {
		color: var(--text-05);
		cursor: not-allowed;
	}
}
</style>
