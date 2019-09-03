<template>
	<div :class="formGroupStyle">
		<div
			:class="decreaseButtonStyle"
			@click="setCurrentValue(currentValue + 1)"
		>
			<i class="yoco">minus</i>
		</div>
		<input
			ref="inputNumber"
			:class="inputStyle"
			type="number"
			:disabled="disabled"
			:value="currentValue"
			:max="max"
			:min="min"
			@input="setCurrentValue($event.target.value)"
		/>
		<div
			v-if="max && showMaxNumber"
			class="kt-input-number__max"
			v-text="max"
		/>
		<div
			:class="increaseButtonStyle"
			@click="setCurrentValue(currentValue + step)"
		>
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
	watch: {
		value(val) {
			this.currentValue = parseFloat(val)
		},
	},
	methods: {
		/* Do not use input.stepUp - this method does not work in internet explorer and is not transpiled by Babel  */
		setCurrentValue(value) {
			if (value === this.currentValue) return
			this.currentValue = typeof value === Number ? value : parseFloat(value)
			this.$emit('input', this.currentValue)
		},
	},
}
</script>
