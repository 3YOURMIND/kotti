<template>
	<div :class="formGroupStyle">
		<div
			:class="decreaseButtonStyle"
			@click="setCurrentValue(currentValue - step)"
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
<style lang="scss">
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
		background: $lightgray-300;
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
}
</style>
