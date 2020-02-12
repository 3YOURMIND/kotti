<template>
	<div :class="formGroupStyle">
		<div :class="decreaseButtonStyle" @click="decrementValue">
			<i class="yoco">minus</i>
		</div>
		<input
			ref="inputNumber"
			type="number"
			:min="min"
			:max="max"
			:class="inputStyle"
			:disabled="disabled"
			:value="currentValue"
			@input="setCurrentValue($event.target.value)"
		/>
		<div
			v-if="max && showMaxNumber"
			class="kt-input-number__max"
			v-text="max"
		/>
		<div :class="increaseButtonStyle" @click="incrementValue">
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
			currentValue: null,
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
			if (this.max !== null && this.currentValue > this.max) return true
			if (this.min !== null && this.currentValue < this.min) return true
			if (typeof this.currentValue === 'string' || isNaN(this.currentValue))
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
	},
	watch: {
		value(val) {
			this.currentValue = parseFloat(val)
		},
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
		disabled(newVal) {
			if (newVal) {
				this.incrementDisabled = newVal
				this.decrementDisabled = newVal
			}
		},
	},
	created() {
		this.currentValue = typeof this.value === 'number' ? this.value : 0
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

		setCurrentValue(value) {
			if (value === this.currentValue) return
			this.currentValue =
				typeof value === 'number' && !Number.isNaN(value)
					? value
					: parseFloat(value)
		},
	},
}
</script>
<style lang="scss">
@import '../../kotti-style/_variables.scss';

.kt-input-number__input {
	width: auto;
	border: 0;
	text-align: center;
	max-width: 100%;
	color: $darkgray-500;
	padding-right: 0.1rem;
	-moz-appearance: textfield;
	&--100 {
		width: 100%;
	}
	&--max {
		width: 50%;
		text-align: right;
	}
	&--disabled {
		background: $lightgray-300;
		&:hover {
			cursor: not-allowed;
		}
	}
	&:focus {
		box-shadow: 0;
		outline: 0;
	}
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
}

.kt-input-number {
	&.form-group {
		display: inline-flex;
		width: auto;
		max-width: 100%;
		border-radius: $border-radius;
		border: 1px solid $lightgray-400;
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
	width: 50%;
	&::before {
		content: '/';
		padding-right: 0.2rem;
	}
}

.kt-input-number__button {
	border-radius: $border-radius;
	flex: 0 0 1.6rem;
	width: 1.6rem;
	height: 1.6rem;
	text-align: center;
	line-height: 1.6rem;
	background: $lightgray-300;
	user-select: none;
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
}
</style>
