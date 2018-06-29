<template>
	<div class="form-group">
		<label class="form-label" v-text="label" />
		<label :class="switchClass">
			<input type="checkbox" :checked="checkboxValue" @change="handleChange" />
			<i class="form-icon" />
			<span v-if="!$slots.default" v-text="switchMessage" />
			<slot />
		</label>
	</div>
</template>

<script>
export default {
	name: 'KtRadioGroup',
	props: {
		label: [String, Number],
		right: {
			type: Boolean,
			default: false,
		},
		value: {
			type: Boolean,
			default: false,
		},
		activeMessage: {
			type: String,
			default: '',
		},
		inactiveMessage: {
			type: String,
			default: '',
		},
	},
	computed: {
		switchClass() {
			return {
				'form-switch': true,
				'form-switch-right': this.right,
			}
		},
		checkboxValue() {
			return this.value
		},
		switchMessage() {
			return this.checkboxValue ? this.inactiveMessage : this.activeMessage
		},
	},
	methods: {
		handleChange(event) {
			this.$emit('input', event.target.checked)
		},
	},
}
</script>
