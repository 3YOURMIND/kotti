<template>
	<div :class="formGroupStyle">
		<div :class="decrementButtonClasses" @click="decrementValue">
			<i :class="yocoClassDecrement">minus</i>
		</div>
		<div :class="middleClasses" @click="$refs.input.focus()">
			<input
				ref="input"
				type="number"
				:class="inputClasses"
				:disabled="disabled"
				:max="max"
				:min="min"
				:step="step"
				:value="currentValue"
				@input="handleInput($event.target.value)"
			/>
			<div v-if="showMaxNumber">/</div>
			<div v-if="showMaxNumber" class="kt-input-number__max" v-text="max" />
		</div>
		<div :class="incrementButtonClasses" @click="incrementValue">
			<i :class="yocoClassIncrement">plus</i>
		</div>
	</div>
</template>

<script>
const isFraction = (n) => n % 1 !== 0
const isInvalidValue = ({ value, max, min }) => {
	if (!isValidNumber(value)) return true

	if (isValidNumber(max) && value > max) return true

	if (isValidNumber(min) && value < min) return true

	return false
}
const isValidNumber = (n) => typeof n === 'number' && !Number.isNaN(n)

export default {
	name: 'KtInputNumber',
	props: {
		disabled: { default: false, type: Boolean },
		max: { default: null, type: Number },
		min: { default: null, type: Number },
		pattern: { required: false, type: String },
		showMaxNumber: { type: Boolean, default: false },
		step: { default: 1, type: Number },
		value: { default: 0, type: [Number, null] },
	},
	data() {
		return { currentValue: this.value, hasFormError: false }
	},
	computed: {
		decrementButtonClasses() {
			return {
				'kt-input-number__button': true,
				'kt-input-number__button--disabled': this.isDecrementDisabled,
			}
		},
		formGroupStyle() {
			return {
				'form-group--error': this.hasFormError,
				'kt-input-number form-group': true,
			}
		},
		incrementButtonClasses() {
			return {
				'kt-input-number__button': true,
				'kt-input-number__button--disabled': this.isIncrementDisabled,
			}
		},
		inputClasses() {
			return {
				'kt-input-number__input': true,
				'kt-input-number__input--max': this.showMaxNumber,
			}
		},
		isDecrementDisabled() {
			return (
				this.disabled ||
				(isValidNumber(this.min) && this.currentValue - this.step < this.min)
			)
		},
		isIncrementDisabled() {
			return (
				this.disabled ||
				(isValidNumber(this.max) && this.currentValue + this.step > this.max)
			)
		},
		middleClasses() {
			return {
				'kt-input-number__middle': true,
				'kt-input-number__middle--disabled': this.disabled,
			}
		},
		yocoClassIncrement() {
			return {
				yoco: true,
				'yoco--disabled': this.isIncrementDisabled,
			}
		},
		yocoClassDecrement() {
			return {
				yoco: true,
				'yoco--disabled': this.isDecrementDisabled,
			}
		},
	},
	watch: {
		value: {
			handler(newValue) {
				this.setValue(newValue)
			},
			immediate: true,
		},
	},
	methods: {
		decrementValue() {
			if (this.isDecrementDisabled) return
			this.setValue(this.currentValue - this.step)
		},
		handleInput(value) {
			this.hasFormError = Number.isNaN(Number(value))
			this.setValue(parseFloat(value))

			if (value !== `${parseFloat(value)}.`) this.$forceUpdate()
		},
		incrementValue() {
			if (this.isIncrementDisabled) return
			this.setValue(this.currentValue + this.step)
		},
		setValue(newValue) {
			if (newValue === this.currentValue) return

			if (isInvalidValue({ min: this.min, max: this.max, value: newValue })) {
				this.hasFormError = true
				return this.$emit('invalid', newValue)
			}

			this.hasFormError = false

			const THREE_DECIMAL_PLACES = 3
			this.currentValue = isFraction(newValue)
				? parseFloat(newValue.toFixed(THREE_DECIMAL_PLACES))
				: newValue

			this.$emit('input', this.currentValue)
		},
	},
}
</script>
<style lang="scss" scoped>
@import '../../kotti-style/_variables.scss';

.kt-input-number__input {
	color: $darkgray-500;
	text-align: center;
	border: 0;
	-moz-appearance: textfield;

	&:disabled {
		color: unset;
		background-color: unset;
	}

	&--max {
		text-align: right;
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
	display: flex;
	align-items: center;
	height: 1.6rem;

	overflow: hidden;

	&__middle {
		display: flex;
		flex: 1;
		align-items: center;
		height: 100%;

		&--disabled {
			color: $lightgray-400;
			background-color: $lightgray-300;

			&:hover {
				cursor: not-allowed;
			}
		}

		input,
		.kt-input-number__max {
			display: flex;
			flex: 1 1 100%;
			align-items: center;
			min-width: 0px;
			height: 100%;
			padding: 0;
		}
	}

	&.form-group {
		border: 1px solid $lightgray-400;
		border-radius: $border-radius;

		&--error {
			border-color: $red-500;
		}
	}
}

.kt-input-number__button {
	display: flex;
	align-items: center;
	justify-content: center;

	width: 1.6rem;
	height: 1.6rem;

	user-select: none;
	background: $lightgray-300;

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
