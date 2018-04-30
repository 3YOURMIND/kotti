<template>
  <div class="form-group">
  <label :class="switchClass">
    <input type="checkbox" :checked="checkboxValue" @change="handleChange">
    <i class="form-icon"></i>
    <slot></slot>
    <span v-text="switchMessage" v-if="!$slots.default"/>
  </label>
</div>
</template>

<script>
export default {
	name: 'KtRadioGroup',
	props: {
		label: [String, Number],
		right: Boolean,
		value: Boolean,
		activeMessage: '',
		inactiveMessage: '',
	},
	computed: {
		switchClass() {
			return {
				'form-switch w-100': true,
				'form-switch-right': this.right,
			};
		},
		checkboxValue() {
			return this.value;
		},
		switchMessage() {
			return this.checkboxValue ? this.inactiveMessage : this.activeMessage;
		},
	},
	methods: {
		handleChange(event) {
			let val = event.target.checked;
			this.$emit('input', val);
		},
	},
};
</script>
