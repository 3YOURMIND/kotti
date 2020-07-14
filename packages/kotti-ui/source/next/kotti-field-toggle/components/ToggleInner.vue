<template>
	<component
		:is="component"
		class="kt-field-toggle__inner"
		:class="toggleClasses"
	>
		<ToggleBox v-if="type === 'checkbox'" />
		<ToggleSwitch v-else />
		<slot name="default" />
		<input
			v-bind="inputProps"
			:checked="value === true"
			type="checkbox"
			@change="$emit('input', $event.target.checked)"
		/>
	</component>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

import ToggleBox from './ToggleBox.vue'
import ToggleSwitch from './ToggleSwitch.vue'

export default defineComponent({
	name: 'ToggleInner',
	components: { ToggleBox, ToggleSwitch },
	props: {
		component: { required: true, type: String },
		inputProps: { required: true, type: Object },
		isDisabled: { required: true, type: Boolean },
		type: { default: 'checkbox', type: String },
		value: { default: null, type: Boolean },
	},
	setup(props) {
		return {
			toggleClasses: computed(() => ({
				'kt-field-toggle__inner--is-disabled': props.isDisabled === true,
				'kt-field-toggle__inner--is-indeterminate': props.value === null,
				'kt-field-toggle__inner--is-off': props.value === false,
				'kt-field-toggle__inner--is-on': props.value === true,
			})),
		}
	},
})
</script>

<style lang="scss">
:root {
	--toggle-border-radius: 0.1rem;
}

.kt-field-toggle__inner {
	display: flex;
	align-items: center;

	input {
		display: none;
	}

	&--is-disabled {
		color: var(--text-05);
		cursor: not-allowed;
	}
}
</style>
