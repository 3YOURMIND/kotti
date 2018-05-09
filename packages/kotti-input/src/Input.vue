<template>
	<div :class="formClass">
		<label class="form-label" v-text="label" />
		<div :class="inputGroupClass">
			<span class="input-group-addon" v-text="addonText" />
			<input
				class="form-input"
				v-bind="$attrs"
				:type="type"
				:placeholder="placeholder"
				:value="currentValue"
				@input="handleInput"
				@change="handleChange"
			/>
			<i class="form-icon yoco" v-text="icon" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'KtInput',
	data() {
		return {
			currentValue: this.value || '',
		};
	},
	watch: {
		value(val, oldValue) {
			this.setCurrentValue(val);
		},
	},
	props: {
		label: String,
		value: [String, Number],
		addonText: {
			type: String,
			default: '',
		},
		icon: {
			type: String,
			default: '',
		},
		type: {
			type: String,
			default: 'text',
		},
		validate: {
			type: String,
			default: '',
		},
		placeholder: String,
		iconPosition: {
			type: String,
			default: 'left',
		},
	},
	computed: {
		inputGroupClass() {
			let iconClass;
			if (this.icon != '') {
				iconClass = `has-icon-${this.iconPosition}`;
			}
			return [
				iconClass,
				{
					'input-group': this.addonText != '',
				},
			];
		},
		formClass() {
			let validateClass = `is-${this.validate}`;
			return ['form-group', validateClass];
		},
	},
	methods: {
		setCurrentValue(value) {
			if (value === this.currentValue) return;
			this.currentValue = value;
		},
		handleInput(event) {
			const value = event.target.value;
			this.$emit('input', value);
			this.setCurrentValue(value);
		},
		handleChange(event) {
			this.$emit('change', event.target.value);
		},
	},
};
</script>

<style lang="scss" scoped>
</style>
