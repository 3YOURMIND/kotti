<template>
	<div :class="formRadioStyle">
		<label v-if="hasLabel" class="form-label" v-text="labelRep" />
		<input
			:required="required"
			:value="invalidInput ? '' : 'notempty'"
			type="text"
			class="radio-input--hidden"
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
@import '../../kotti-style/mixins/index.scss';
.form-group--list-options .form-radio {
	display: block;
}
.radio-input--hidden {
	display: none;
	&:invalid ~ .form-radio {
		.form-icon {
			border: 1px solid $red-500;
			&:focus {
				@include control-shadow($red-500);
			}
		}
	}
}
</style>
