<template>
	<component
		:is="component"
		class="kt-field-toggle__inner"
		:class="{
			'kt-field-toggle__inner--is-disabled': disabled === true,
		}"
	>
		<ToggleBox v-if="type === 'checkbox'" :value="value" />
		<ToggleSwitch v-else :value="value" />
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
import { defineComponent } from '@vue/composition-api'

import ToggleBox from './ToggleBox.vue'
import ToggleSwitch from './ToggleSwitch.vue'

export default defineComponent({
	name: 'ToggleInner',
	components: { ToggleBox, ToggleSwitch },
	props: {
		component: { required: true, type: String },
		disabled: { default: false, type: Boolean },
		inputProps: { required: true, type: Object },
		type: { default: 'checkbox', type: String },
		value: { default: null, type: Boolean },
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
}

.kt-field__wrapper--disabled .kt-field-toggle__inner,
.kt-field-toggle-group__inner--is-disabled {
	color: var(--text-05);
}
</style>
