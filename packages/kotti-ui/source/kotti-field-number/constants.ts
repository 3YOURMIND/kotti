import type { KottiField } from '../kotti-field/types'
import { DecimalSeparator } from '../types/decimal-separator'
import { DECIMAL_SEPARATORS_CHARACTER_SET } from '../utilities'

export const KOTTI_FIELD_NUMBER_SUPPORTS: KottiField.Supports = {
	autoComplete: true,
	borderless: true,
	clear: false,
	decoration: true,
	placeholder: true,
	tabIndex: true,
}

export const STRINGS_THAT_ARE_TREATED_AS_NULL = [
	...Object.values(DecimalSeparator),
	'-',
	'',
]

export const LEADING_ZEROES_REGEX = new RegExp(
	`^0+([1-9]|0${DECIMAL_SEPARATORS_CHARACTER_SET}?)`,
)

export const TRAILING_ZEROES_REGEX = new RegExp(
	`${DECIMAL_SEPARATORS_CHARACTER_SET}0*$|(${DECIMAL_SEPARATORS_CHARACTER_SET}[0-9]*[1-9])0+$`,
)

export const VALID_REGEX = (decimalPlaces: number): RegExp =>
	new RegExp(
		`^[-]?(0?|([1-9][0-9]*))?(${DECIMAL_SEPARATORS_CHARACTER_SET}[0-9]{0,${decimalPlaces.toString()}})?$`,
	)
