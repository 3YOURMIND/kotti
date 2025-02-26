<template>
	<component
		:is="component"
		class="kt-field-toggle-inner"
		:class="toggleClasses"
	>
		<input
			v-bind="inputProps"
			:checked="value === true"
			:tabindex="isDisabled ? -1 : undefined"
			type="checkbox"
			@change="onInput"
		/>
		<component :is="svgComponent.is" :class="svgComponent.class" />
		<slot name="default" />
	</component>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue'
import type { InputHTMLAttributes } from 'vue/types/jsx'

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
				KottiField.Hook.Returns<KottiFieldToggle.Value>['inputProps']
			>,
		},
		isDisabled: { required: true, type: Boolean },
		type: { default: 'checkbox', type: String },
		value: { default: null, type: Boolean as PropType<boolean | null> },
	},
	emits: ['input'],
	setup(props, { emit }) {
		return {
			onInput: (event: Event) => {
				const newValue = (event.target as InputHTMLAttributes).checked

				if (!props.isDisabled) emit('input', newValue)
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
				'kt-field-toggle-inner--is-indeterminate': props.value === null,
				'kt-field-toggle-inner--is-off': props.value === false,
				'kt-field-toggle-inner--is-on': props.value === true,
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
	align-items: flex-start;
	cursor: pointer;

	input {
		width: 0;
		height: 0;

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

	&__svg {
		margin-right: var(--unit-2);
	}
}
</style>
