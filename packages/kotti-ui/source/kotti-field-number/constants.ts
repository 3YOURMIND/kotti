import { KottiField } from '../kotti-field/types'

import { isNumber } from './utilities'

export const KOTTI_FIELD_NUMBER_SUPPORTS: KottiField.Supports = {
	clear: false,
	decoration: true,
	placeholder: true,
	tabIndex: true,
}

export const KOTTI_FIELD_NUMBER_PROPS = {
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

export const DECIMAL_PLACES = 3
// FIXME: should we consider manually setting the decimal separator using the translation context
export const DECIMAL_SEPARATOR = (1.1).toLocaleString().replace(/\d/g, '')

export const STRINGS_THAT_ARE_TREATED_AS_NULL = [
	DECIMAL_SEPARATOR,
	'-',
	'+',
	'',
]
export const LEADING_ZEROES_REGEX = new RegExp(
	`^0+([1-9]|0\\${DECIMAL_SEPARATOR}?)`,
)
export const TRAILING_ZEROES_REGEX = new RegExp(
	`\\${DECIMAL_SEPARATOR}0*$|(\\${DECIMAL_SEPARATOR}\\d*[1-9])0+$`,
)
export const VALID_REGEX = new RegExp(
	`^[+-]?(0?|([1-9]\\d*))?(\\${DECIMAL_SEPARATOR}[0-9]{0,${DECIMAL_PLACES}})?$`,
)
