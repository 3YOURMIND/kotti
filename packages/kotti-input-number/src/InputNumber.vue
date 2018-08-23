<template>
	<div :class="formGroupStyle">
		<div :class="decreaseButtonStyle" @click="decreaseNumber">
			<i class="yoco">minus</i>
		</div>
		<input
			:class="inputStyle"
			type="number"
			:disabled="disabled"
			:step="step"
			:value="currentValue"
			:max="max"
			:min="min"
			ref="inputNumber"
			@change="handleInput"
		/>
		<div v-if="max && showMaxNumber" class="kt-input-number__max" v-text="max"/>
		<div :class="increaseButtonStyle" @click="increaseNumber">
			<i class="yoco">plus</i>
		</div>
	</div>
</template>

<script>
export default {
	name: 'KtInputNumber',
	props: {
		max: { type: Number, default: null },
		min: { type: Number, default: null },
		value: { type: Number, default: null },
		step: { type: Number, default: 1 },
		disabled: { type: Boolean, default: false },
		showMaxNumber: { type: Boolean, default: false },
		fullWidth: { type: Boolean, default: false },
	},
	data() {
		return {
			currentValue: this.value || 0,
		}
	},
	watch: {
		value(val, oldValue) {
			this.setCurrentValue(val)
		},
	},
	computed: {
		formGroupStyle() {
			return {
				'kt-input-number form-group': true,
				'form-group--100': this.fullWidth,
				'form-group--error': this.formError,
			}
		},
		formError() {
			if (this.currentValue > this.max && this.max !== null) return true
			if (this.currentValue < this.min && this.min !== null) return true
			if (this.currentValue === '' || isNaN(this.currentValue)) return true
			return false
		},
		inputStyle() {
			return {
				'kt-input-number__input': true,
				'kt-input-number__input--100': this.fullWidth,
				'kt-input-number__input--disabled': this.disabled,
				'kt-input-number__input--max': this.showMaxNumber,
			}
		},
		increaseButtonStyle() {
			return {
				'kt-input-number__button': true,
				'kt-input-number__button--disabled':
					this.currentValue == this.max || this.disabled,
			}
		},
		decreaseButtonStyle() {
			return {
				'kt-input-number__button': true,
				'kt-input-number__button--disabled':
					this.currentValue == this.min || this.disabled,
			}
		},
	},
	methods: {
		setCurrentValue(value) {
			if (value === this.currentValue) return
			this.currentValue = value
		},
		increaseNumber() {
			if (this.disabled) return
			this.$refs.inputNumber.stepUp(1)
			this.handleInput()
		},
		decreaseNumber() {
			if (this.disabled) return
			this.$refs.inputNumber.stepDown(1)
			this.handleInput()
		},
		handleInput() {
			this.currentValue = parseFloat(this.$refs.inputNumber.value)
			this.$emit('input', this.currentValue)
		},
	},
}
</script>
