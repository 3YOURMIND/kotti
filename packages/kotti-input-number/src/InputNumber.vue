<template>
	<div :class="formGroupStyle">
		<div :class="decrementButtonClasses" @click="decrementValue">
			<i :class="yocoClassDecrement">minus</i>
		</div>
		<div :class="middleClasses" @click="$refs.input.focus()">
			<input
				ref="input"
				type="text"
				:class="inputClasses"
				:disabled="disabled"
				:max="max"
				:min="min"
				:step="step"
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
const SIGN_STRINGS = ['-', '+']
const STRINGS_THAT_ARE_TREATED_AS_NULL = [...SIGN_STRINGS, '']
const LEADING_ZEROES_REGEX = new RegExp(`^0+([1-9]|0\\${DECIMAL_SEPARATOR}?)`)
const TRAILING_ZEROES_REGEX = new RegExp(
	`\\${DECIMAL_SEPARATOR}0*$|(\\${DECIMAL_SEPARATOR}\\d*[1-9])0+$`,
)
const VALID_REGEX = new RegExp(
	`^[+-]?(0?|([1-9]\\d*))?(\\${DECIMAL_SEPARATOR}[0-9]{0,${DECIMAL_PLACES}})?$`,
)

const isInRange = ({ max, min, value }) =>
	value === null ||
	((max === null || value <= max) && (min === null || value >= min))

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
		currentValueNumber() {
			return toNumber(this.internalStringValue)
		},
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
				(this.currentValueNumber === null ||
					isInRange({
						max: null,
						min: this.min,
						value: this.currentValueNumber - this.step,
					}))
			)
		},
		isIncrementEnabled() {
			return (
				!this.disabled &&
				(this.currentValueNumber === null ||
					isInRange({
						max: this.max,
						min: null,
						value: this.currentValueNumber + this.step,
					}))
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

				if (
					!isInRange({ max: this.max, min: this.min, value: truncatedNumber })
				)
					throw new RangeError(
						`KtInputNumber: encounted an out-of-range number "${newNumber}"`,
					)

				const shouldUpdate = oldNumber !== truncatedNumber
				if (shouldUpdate) {
					this.hasFormError = false
					this.internalStringValue = newString
				}
			},
			immediate: true,
		},
	},
	methods: {
		decrementValue() {
			if (!this.isDecrementEnabled) return
			if (this.currentValueNumber === null) {
				const defaultNumber = this.min || 0
				this.emitInput(defaultNumber)
				return
			}
			this.emitInput(this.currentValueNumber - this.step)
		},
		handleBlur() {
			this.internalStringValue = toString(this.value)
		},
		handleInput(value) {
			const { max, min } = this

			const valueWithoutLeadingZeroes = value.replace(
				LEADING_ZEROES_REGEX,
				'$1',
			)

			const isTypedNumberValid =
				VALID_REGEX.test(valueWithoutLeadingZeroes) &&
				(STRINGS_THAT_ARE_TREATED_AS_NULL.includes(valueWithoutLeadingZeroes) ||
					isInRange({ max, min, value: toNumber(valueWithoutLeadingZeroes) }))

			if (isTypedNumberValid) {
				const shouldEmit = toNumber(valueWithoutLeadingZeroes) !== this.value
				if (shouldEmit) {
					this.emitInput(toNumber(valueWithoutLeadingZeroes))
				} else {
					this.internalStringValue = valueWithoutLeadingZeroes
				}
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
			if (this.currentValueNumber === null) {
				const defaultNumber = this.min || 0
				this.emitInput(defaultNumber)
				return
			}

			this.emitInput(this.currentValueNumber + this.step)
		},
		emitInput(value) {
			this.$emit('input', value)
		},
	},
}
</script>
<style lang="scss" scoped>
@import '../../kotti-style/_variables.scss';

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
			border-color: $red-500;
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
