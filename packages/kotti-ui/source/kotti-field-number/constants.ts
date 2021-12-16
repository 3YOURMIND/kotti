import { KottiField } from '../kotti-field/types'
import { DecimalSeparator } from '../types/kotti'

import { isNumber } from './utilities'

export const KOTTI_FIELD_NUMBER_SUPPORTS: KottiField.Supports = {
	clear: false,
	decoration: true,
	placeholder: true,
	tabIndex: true,
}

export const KOTTI_FIELD_NUMBER_PROPS = {
	decimalPlaces: { default: 3, type: Number },
	hideChangeButtons: { default: false, type: Boolean },
	hideMaximum: { default: false, type: Boolean },
	maximum: { default: null, type: Number },
	minimum: { default: null, type: Number },
	step: {
		default: 1,
		type: Number,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		validator: (value: any): value is number => isNumber(value) && value > 0,
	},
	value: { default: null, type: Number },
}

/**
 * RegExp character set for use within other regular expressions
 */
export const DECIMAL_SEPARATORS_CHARACTER_SET = [
	'[',
	...Object.values(DecimalSeparator).map((x) => `\\${x}`),
	']',
].join('')

export const STRINGS_THAT_ARE_TREATED_AS_NULL = [
	...Object.values(DecimalSeparator),
	'-',
	'+',
	'',
]
export const LEADING_ZEROES_REGEX = new RegExp(
	`^0+([1-9]|0${DECIMAL_SEPARATORS_CHARACTER_SET}?)`,
)
export const TRAILING_ZEROES_REGEX = new RegExp(
	`${DECIMAL_SEPARATORS_CHARACTER_SET}0*$|(${DECIMAL_SEPARATORS_CHARACTER_SET}[0-9]*[1-9])0+$`,
)
export const VALID_REGEX = (decimalPlaces: number) =>
	new RegExp(
		`^[+-]?(0?|([1-9][0-9]*))?(${DECIMAL_SEPARATORS_CHARACTER_SET}[0-9]{0,${decimalPlaces}})?$`,
	)
