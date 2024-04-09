<template>
	<component
		:is="component"
		class="kt-field-toggle-inner"
		:class="toggleClasses"
	>
		<component :is="svgComponent.is" :class="svgComponent.class" />
		<slot name="default" />
		<input
			v-bind="inputProps"
			:checked="value === true"
			type="checkbox"
			@change="onInput"
		/>
	</component>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, computed } from 'vue'
import type { InputHTMLAttributes } from 'vue/types/jsx'

import type { KottiField } from '../../kotti-field/types'
import { KottiFieldToggle } from '../types'

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
	setup(props, { emit }) {
		return {
			onInput: (event: Event) => {
				const newValue = (event.target as InputHTMLAttributes).checked

				if (!props.isDisabled) emit('input', newValue)
			},
			svgComponent: computed(() => {
				const isBox = props.type === KottiFieldToggle.Shared.Type.CHECKBOX
				return {
					is: isBox ? ToggleBox.name : ToggleSwitch.name,
					class: {
						'kt-field-toggle-inner__svg': true,
						'kt-field-toggle-inner__svg--is-box': isBox,
						'kt-field-toggle-inner__svg--is-switch': !isBox,
					},
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
	--toggle-border-radius: 0.1rem;
}

.kt-field-toggle-inner {
	display: flex;
	align-items: flex-start;
	cursor: pointer;

	input {
		display: none;
	}

	&__svg {
		flex-shrink: 0;

		&--is-box {
			// align checkbox with the center of the first line of the label
			// (assumption: font-size comes from common parent element)
			//  > starting point is upper end of the container (flex-start)
			//  > (+0.75em) Put upper edge of element into center (since line-height = 1.5 * font-size)
			//  > (-8px) Put it up half the height of the checkbox height (16px)
			transform: translateY(calc(0.75em - 8px));
		}

		&--is-switch {
			// align switch with the center of the first line of the label
			// (assumption: font-size comes from common parent element)
			//  > starting point is upper end of the container (flex-start)
			//  > (+0.75em) Put upper edge of element into center (since line-height = 1.5 * font-size)
			//  > (-10px) Put it up half the height of the switch height (20px)
			transform: translateY(calc(0.75em - 10px));
		}
	}

	&--is-disabled {
		color: var(--text-05);
		cursor: not-allowed;
	}

	> *:not(:first-child) {
		margin-left: 0.3rem;
	}
}
</style>
