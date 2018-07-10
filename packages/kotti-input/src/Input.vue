<template>
	<div :class="formClass">
		<label :class="formLabelClass" v-text="label" />
		<div :class="inputGroupClass">
			<span class="input-group-addon" v-text="addonText" />
			<input
				v-bind="$attrs"
				:placeholder="placeholder"
				:type="type"
				:value="currentValue"
				@change="handleChange"
				@input="handleInput"
				@blur="handleBlur"
				@focus="handleFocus"
				:class="formInputClass"
			/>
			<i class="form-icon yoco" v-text="icon" />
		</div>
		<div class="form-validation-text" v-if="validateText">
			<span v-text="validateText" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'KtInput',
	data() {
		return {
			currentValue: this.value || '',
			isFocused: false,
		}
	},
	watch: {
		value(val, oldValue) {
			this.setCurrentValue(val)
		},
	},
	props: {
		addonText: { type: String, default: '' },
		icon: { type: String, default: '' },
		iconPosition: { type: String, default: 'left' },
		label: String,
		placeholder: String,
		type: { type: String, default: 'text' },
		validate: { type: String, default: '' },
		validateText: { type: String, default: '' },
		value: [String, Number],
		isCompact: Boolean,
	},
	computed: {
		inputGroupClass() {
			return {
				'input-group': Boolean(this.addonText),
				[`has-icon-${this.iconPosition}`]: Boolean(this.icon),
			}
		},
		formInputClass() {
			return {
				'form-input': true,
				'form-input--compact': this.isCompact,
			}
		},
		formLabelClass() {
			return {
				'form-label': true,
				'form-label--compact': this.isCompact,
				'form-label--compact--focus':
					this.isCompact && (this.isFocused || this.currentValue),
			}
		},
		formClass() {
			const validateClass = this.validate ? `is-${this.validate}` : ''
			return ['form-group', validateClass]
		},
	},
	methods: {
		setCurrentValue(value) {
			if (value === this.currentValue) return
			this.currentValue = value
		},
		handleInput(event) {
			const value = event.target.value
			this.$emit('input', value)
			this.setCurrentValue(value)
		},
		handleFocus() {
			this.isFocused = true
		},
		handleBlur() {
			this.isFocused = false
		},
		handleChange(event) {
			this.$emit('change', event.target.value)
		},
	},
}
</script>
