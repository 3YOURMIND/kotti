<template>
	<div :class="formRadioStyle">
		<label v-if="hasLabel" class="form-label" v-text="labelRep" />
		<input
			class="radio-input--hidden"
			:required="required"
			type="text"
			:value="invalidInput ? '' : 'notempty'"
		/>
		<slot />
	</div>
</template>

<script>
export default {
	name: 'KtRadioGroup',
	props: {
		label: {
			default: null,
			type: [String, Number],
		},
		listStyle: {
			default: false,
			type: Boolean,
		},
		name: {
			required: true,
			type: [String, Number],
		},
		value: {
			default: null,
			type: [String, Number],
		},
		required: {
			default: false,
			type: Boolean,
		},
	},
	computed: {
		formRadioStyle() {
			return {
				'form-group': true,
				'form-group--list-options': this.listStyle,
			}
		},
		hasLabel() {
			return this.label && this.label.length > 0
		},
		labelRep() {
			return this.required ? `${this.label} *` : this.label
		},
		invalidInput() {
			return this.value === null || this.value === undefined
		},
	},
}
</script>

<style lang="scss">
.form-group--list-options .form-radio {
	display: block;
}

.radio-input--hidden {
	display: none;
	&:invalid ~ .form-radio {
		.form-icon {
			border: 1px solid var(--support-error);
			&:focus {
				box-shadow: 0 0 0 0.1rem rgba(var(--support-error), 0.2);
			}
		}
	}
}
</style>
