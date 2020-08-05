<template>
	<div :class="formGroupStyle">
		<div :class="decrementButtonClasses" @click="decrementValue">
			<i :class="yocoClassDecrement">minus</i>
		</div>
		<div :class="middleClasses" @click="$refs.input.focus()">
			<input
				ref="input"
				:class="inputClasses"
				:disabled="disabled"
				:max="max"
				:min="min"
				:step="step"
				type="text"
				:value="internalStringValue"
				@blur="handleBlur"
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
const DECIMAL_PLACES = 3
const DECIMAL_SEPARATOR = (1.1).toLocaleString().replace(/\d/g, '')
const STRINGS_THAT_ARE_TREATED_AS_NULL = [DECIMAL_SEPARATOR, '-', '+', '']
const LEADING_ZEROES_REGEX = new RegExp(`^0+([1-9]|0\\${DECIMAL_SEPARATOR}?)`)
const TRAILING_ZEROES_REGEX = new RegExp(
	`\\${DECIMAL_SEPARATOR}0*$|(\\${DECIMAL_SEPARATOR}\\d*[1-9])0+$`,
)
const VALID_REGEX = new RegExp(
	`^[+-]?(0?|([1-9]\\d*))?(\\${DECIMAL_SEPARATOR}[0-9]{0,${DECIMAL_PLACES}})?$`,
)

const isStepMultiple = ({ min, step, value }) => {
	if (min === null || value === null) return true
	const k = (value - min) / step
	const epsilon = 10e-10
	return Math.abs(k - Math.round(k)) < epsilon
}

const isInRange = ({ max, min, offset, value }) => {
	if (value === null) return true

	const fitsMinimum = min === null || value + offset >= min
	const fitsMaximum = max === null || value + offset <= max

	return fitsMinimum && fitsMaximum
}

const toNumber = (string) =>
	STRINGS_THAT_ARE_TREATED_AS_NULL.includes(string)
		? null
		: parseFloat(string.replace(DECIMAL_SEPARATOR, '.'))

const toString = (number) =>
	number === null
		? ''
		: number
				.toFixed(DECIMAL_PLACES)
				.replace('.', DECIMAL_SEPARATOR)
				.replace(TRAILING_ZEROES_REGEX, '$1')

export default {
	name: 'KtInputNumber',
	props: {
		disabled: { default: false, type: Boolean },
		max: { default: null, type: Number },
		min: { default: null, type: Number },
		showMaxNumber: { default: false, type: Boolean },
		step: { default: 1, type: Number },
		value: { default: 0, type: [Number, null] },
	},
	data() {
		return { internalStringValue: '', hasFormError: false }
	},
	computed: {
		decrementButtonClasses() {
			return {
				'kt-input-number__button': true,
				'kt-input-number__button--disabled': !this.isDecrementEnabled,
			}
		},
		formGroupStyle() {
			return {
				'kt-input-number form-group': true,
				'form-group--error': this.hasFormError,
			}
		},
		incrementButtonClasses() {
			return {
				'kt-input-number__button': true,
				'kt-input-number__button--disabled': !this.isIncrementEnabled,
			}
		},
		inputClasses() {
			return {
				'kt-input-number__input': true,
				'kt-input-number__input--max': this.showMaxNumber,
			}
		},
		isDecrementEnabled() {
			return (
				!this.disabled &&
				isInRange({
					max: null,
					min: this.min,
					offset: -this.step,
					value: this.value,
				})
			)
		},
		isIncrementEnabled() {
			return (
				!this.disabled &&
				isInRange({
					max: this.max,
					min: null,
					offset: this.step,
					value: this.value,
				})
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
				'yoco--disabled': !this.isIncrementEnabled,
			}
		},
		yocoClassDecrement() {
			return {
				yoco: true,
				'yoco--disabled': !this.isDecrementEnabled,
			}
		},
	},
	watch: {
		value: {
			handler(newNumber, oldNumber) {
				const newString = toString(newNumber)
				const truncatedNumber = toNumber(newString)
				const { min, max, step } = this

				if (!isInRange({ max, min, offset: 0, value: truncatedNumber }))
					throw new RangeError(
						`KtInputNumber: encounted an out-of-range number "${newNumber}"`,
					)

				if (!isStepMultiple({ min, step, value: truncatedNumber }))
					throw new Error(
						`KtInputNumber: encounted a value "${newNumber}" that doesn't fit ((min + k * step): where k is an integer)`,
					)

				const shouldUpdate = oldNumber !== truncatedNumber
				if (shouldUpdate) this.setInternalStringValue(newString)
			},
			immediate: true,
		},
	},
	methods: {
		decrementValue() {
			if (!this.isDecrementEnabled) return
			if (this.value === null) {
				const defaultNumber = this.min || 0
				this.emitInput(defaultNumber)
				return
			}
			this.emitInput(this.value - this.step)
		},
		emitInput(value) {
			this.$emit('input', value)
		},
		handleBlur() {
			this.setInternalStringValue(toString(this.value))
		},
		handleInput(value) {
			const { max, min, step } = this

			const valueWithoutLeadingZeroes = value.replace(
				LEADING_ZEROES_REGEX,
				'$1',
			)
			const nextNumber = toNumber(valueWithoutLeadingZeroes)

			const isTypedNumberValid =
				VALID_REGEX.test(valueWithoutLeadingZeroes) &&
				isStepMultiple({
					min,
					step,
					value: nextNumber,
				}) &&
				isInRange({
					max,
					min,
					offset: 0,
					value: nextNumber,
				})

			if (isTypedNumberValid) {
				const shouldEmit = nextNumber !== this.value
				if (shouldEmit) this.emitInput(nextNumber)
				else this.setInternalStringValue(valueWithoutLeadingZeroes)
			} else {
				this.hasFormError = true
				this.$emit('error', valueWithoutLeadingZeroes)
			}
			// vue doesn't support controlled input fields without re-rendering
			// therefore, in case nothing changed, we need to re-render here
			this.$forceUpdate()
		},
		incrementValue() {
			if (!this.isIncrementEnabled) return
			if (this.value === null) {
				const defaultNumber = this.min || 0
				this.emitInput(defaultNumber)
				return
			}

			this.emitInput(this.value + this.step)
		},
		setInternalStringValue(value) {
			this.hasFormError = false
			this.internalStringValue = value
		},
	},
}
</script>

<style lang="scss" scoped>
@import '../kotti-style/_variables.scss';

$size: 1.6rem;

.kt-input-number {
	display: flex;
	align-items: center;
	width: 100%;
	height: $size;

	overflow: hidden;

	&.form-group {
		border: 1px solid $lightgray-400;
		border-radius: $border-radius;

		&--error {
			border-color: var(--support-error);
		}
	}

	&__button {
		display: flex;
		align-items: center;
		justify-content: center;

		width: $size;
		height: $size;

		cursor: pointer;
		user-select: none;
		background: $lightgray-300;

		&:hover {
			background: $lightgray-400;
		}
		&--disabled {
			color: $lightgray-400;
			cursor: not-allowed;

			&:hover {
				background: $lightgray-300;
			}
		}

		.yoco--disabled {
			color: $lightgray-400;
		}
	}

	&__input {
		color: $darkgray-500;
		text-align: center;
		border: 0;
		-moz-appearance: textfield;

		&:disabled {
			color: unset;
			background-color: unset;
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

		&--max {
			text-align: right;
		}
	}

	&__middle {
		display: flex;
		flex: 1;
		align-items: center;
		height: 100%;

		&--disabled {
			color: $lightgray-600;
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
}
</style>
