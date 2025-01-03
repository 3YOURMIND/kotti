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
	--toggle-border-radius: 0.1rem;
}

.kt-field-toggle-inner {
	display: flex;
	align-items: flex-start;
	cursor: pointer;

	input {
		display: none;
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
