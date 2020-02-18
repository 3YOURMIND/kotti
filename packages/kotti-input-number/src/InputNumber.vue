<template>
	<div :class="formGroupStyle">
		<div :class="decreaseButtonStyle" @click="decrementValue">
			<i :class="yocoClassDecrement">minus</i>
		</div>
		<input
			type="number"
			:min="min"
			:max="max"
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
	},
	data() {
		return {
			currentValue: this.value ?? 0,
			incrementDisabled: false,
			decrementDisabled: false,
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
			if (
				Number.isNaN(this.currentValue) ||
				typeof this.currentValue !== 'number'
			) {
				return true
			}
			if (typeof this.max === 'number' && this.currentValue > this.max) {
				return true
			}
			if (typeof this.min === 'number' && this.currentValue < this.min) {
				return true
			}

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
	},
	watch: {
		currentValue(newVal) {
			if (!this.formError) {
				this.$emit('input', newVal)
			}
			if (typeof this.min === 'number') {
				if (newVal - this.step < this.min) {
					this.decrementDisabled = true
				} else if (!this.disabled) {
					this.decrementDisabled = false
				}
			}
			if (typeof this.max === 'number') {
				if (newVal + this.step > this.max) {
					this.incrementDisabled = true
				} else if (!this.disabled) {
					this.incrementDisabled = false
				}
			}
		},
		disabled(newVal, oldVal) {
			if (newVal) {
				this.incrementDisabled = newVal
				this.decrementDisabled = newVal
			} else if (!newVal && oldVal) {
				if (typeof this.min === 'number') {
					this.decrementDisabled = this.currentValue - this.step < this.min
				}
				if (typeof this.max === 'number') {
					this.incrementDisabled = this.currentValue + this.step > this.max
				}
			}
		},
	},
	created() {
		if (this.disabled) {
			this.incrementDisabled = true
			this.decrementDisabled = true
		}
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
		/* Do not use input.stepUp - this method does not work in internet explorer and is not transpiled by Babel  */

		handleInput(value) {
			if (value === this.currentValue) return
			this.currentValue =
				typeof value === 'number' && !Number.isNaN(value)
					? value
					: !Number.isNaN(Number(value))
					? Number(value)
					: 0
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
	width: 50%;
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
