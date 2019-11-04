<template>
	<div :class="formRadioStyle">
		<label v-if="hasLabel" class="form-label" v-text="labelRep" />
		<slot />
	</div>
</template>

<script>
export default {
	name: 'KtRadioGroup',
	props: {
		label: {
			default: null,
			types: [String, Number, null],
		},
		listStyle: {
			default: false,
			type: Boolean,
		},
		name: {
			required: true,
			types: [String, Number],
		},
		value: {
			default: null,
			types: [String, Number, null],
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
				'form-group--invalid': this.invalidInput,
			}
		},
		hasLabel() {
			return this.label && this.label.length
		},
		labelRep() {
			return this.required ? `${this.label} *` : this.label
		},
		invalidInput() {
			return this.required && (this.value === null || this.value === '')
		},
	},
}
</script>

<style lang="scss">
@import '../../kotti-style/_variables.scss';
@import '../../kotti-style/mixins/index.scss';

.form-group--list-options .form-radio {
	display: block;
}
.form-group--invalid {
	.form-radio {
		.form-icon {
			border: 1px solid $red-500;
			&:focus {
				@include control-shadow($red-500);
			}
		}
	}
}
</style>
