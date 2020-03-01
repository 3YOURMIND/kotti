<template>
	<div :class="formGroupStyle">
		<div :class="decreaseButtonStyle" @click="decrementValue">
			<i :class="yocoClassDecrement">minus</i>
		</div>
		<input
			type="number"
			:min="min"
			:max="max"
			:step="step"
			:class="inputStyle"
			:disabled="disabled"
			:value="currentValue"
			@input="handleInput($event.target.value)"
		/>
		<div
			v-if="max && showMaxNumber"
			class="kt-input-number__max"
			v-text="max"
		/>
		<div :class="increaseButtonStyle" @click="incrementValue">
			<i :class="yocoClassIncrement">plus</i>
		</div>
	</div>
</template>

<script>
export default {
	name: 'KtInputNumber',
	props: {
		max: {
			type: Number,
			default: null,
		},
		min: {
			type: Number,
			default: null,
		},
		value: {
			type: [Number, null],
			default: 0,
		},
		step: {
			type: Number,
			default: 1,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		showMaxNumber: {
			type: Boolean,
			default: false,
		},
		fullWidth: {
			type: Boolean,
			default: false,
		},
		pattern: {
			type: String,
			required: false,
		},
	},
	data() {
		return {
			currentValue: this.value ?? 0,
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
			if (!this.isValidNumber(this.currentValue)) return true

			if (this.isValidNumber(this.max) && this.currentValue > this.max)
				return true

			if (this.isValidNumber(this.min) && this.currentValue < this.min)
				return true

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
				'kt-input-number__button--disabled': this.incrementDisabled,
			}
		},
		decreaseButtonStyle() {
			return {
				'kt-input-number__button': true,
				'kt-input-number__button--disabled': this.decrementDisabled,
			}
		},
		yocoClassIncrement() {
			return {
				yoco: true,
				'yoco--disabled': this.incrementDisabled || this.disabled,
			}
		},
		yocoClassDecrement() {
			return {
				yoco: true,
				'yoco--disabled': this.decrementDisabled || this.disabled,
			}
		},
		decrementDisabled() {
			debugger
			return (
				this.disabled ||
				(this.isValidNumber(this.min) &&
					this.currentValue - this.step < this.min)
			)
		},
		incrementDisabled() {
			debugger
			return (
				this.disabled ||
				(this.isValidNumber(this.max) &&
					this.currentValue + this.step > this.max)
			)
		},
	},
	watch: {
		currentValue: {
			immediate: true,
			handler(newVal, oldVal) {
				debugger
				if (newVal === oldVal) return
				if (this.isValidNumber(newVal)) {
					let roundedVal = newVal
					if (this.hasFractionalValue(newVal)) {
						const THREE_DECIMAL_PLACES = 3
						roundedVal = newVal.toFixed(THREE_DECIMAL_PLACES)
					}
					this.currentValue = parseFloat(roundedVal, 10)
				}
				if (!this.formError) {
					this.$emit('input', this.currentValue)
				} else {
					this.$emit('invalid', this.currentValue)
					//force to oldVal if user inputs wrong currentValue
					this.currentValue = this.isValidNumber(oldVal) ? oldVal : 0
				}
			},
		},
	},
	methods: {
		incrementValue() {
			if (this.incrementDisabled) return
			this.currentValue += this.step
		},
		decrementValue() {
			if (this.decrementDisabled) return
			this.currentValue -= this.step
		},
		handleInput(value) {
			if (value === this.currentValue) return
			this.currentValue = this.isValidNumber(value)
				? value
				: this.isValidNumber(parseFloat(value, 10))
				? parseFloat(value, 10)
				: 0
		},
		hasFractionalValue(num) {
			return num % 1 !== 0
		},
		isValidNumber(num) {
			return typeof num === 'number' && !Number.isNaN(num)
		},
	},
}
</script>
<style lang="scss" scoped>
@import '../../kotti-style/_variables.scss';
.kt-input-number__input {
	width: auto;
	max-width: 100%;
	padding-right: 0.1rem;
	color: $darkgray-500;
	text-align: center;
	border: 0;
	-moz-appearance: textfield;
	&--100 {
		width: 100%;
	}
	&--max {
		width: 50%;
		text-align: right;
	}
	&--disabled {
		&:hover {
			cursor: not-allowed;
		}
	}
	&:focus {
		outline: 0;
		box-shadow: none;
	}
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		margin: 0;
		-webkit-appearance: none;
	}
}

.kt-input-number {
	&.form-group {
		display: inline-flex;
		width: auto;
		max-width: 100%;
		border: 1px solid $lightgray-400;
		border-radius: $border-radius;
		&--100 {
			width: 100%;
		}
		&--error {
			border-color: $red-500;
		}
	}
}

.kt-input-number__max {
	line-height: 1.6rem;
	&::before {
		padding-right: 0.2rem;
		content: '/';
	}
}

.kt-input-number__button {
	flex: 0 0 1.6rem;
	width: 1.6rem;
	height: 1.6rem;
	line-height: 1.6rem;
	text-align: center;
	user-select: none;
	background: $lightgray-300;
	border-radius: $border-radius;
	&:hover {
		cursor: pointer;
		background: $lightgray-400;
	}
	&--disabled {
		color: $lightgray-400;
	}
	&--disabled:hover {
		cursor: not-allowed;
		background: $lightgray-300;
	}
	.yoco--disabled {
		color: $lightgray-400;
	}
}
</style>
