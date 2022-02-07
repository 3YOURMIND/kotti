import { KottiField } from '../kotti-field/types'
import {
	DECIMAL_SEPARATORS,
	DECIMAL_SEPARATORS_CHARACTER_SET,
} from '../utilities'

export const KOTTI_FIELD_NUMBER_SUPPORTS: KottiField.Supports = {
	clear: false,
	decoration: true,
	placeholder: true,
	tabIndex: true,
}

export const STRINGS_THAT_ARE_TREATED_AS_NULL = [...DECIMAL_SEPARATORS, '-', '']

export const LEADING_ZEROES_REGEX = new RegExp(
	`^0+([1-9]|0${DECIMAL_SEPARATORS_CHARACTER_SET}?)`,
)

export const TRAILING_ZEROES_REGEX = new RegExp(
	`${DECIMAL_SEPARATORS_CHARACTER_SET}0*$|(${DECIMAL_SEPARATORS_CHARACTER_SET}[0-9]*[1-9])0+$`,
)

export const VALID_REGEX = (decimalPlaces: number) =>
	new RegExp(
		`^[-]?(0?|([1-9][0-9]*))?(${DECIMAL_SEPARATORS_CHARACTER_SET}[0-9]{0,${decimalPlaces}})?$`,
	)
