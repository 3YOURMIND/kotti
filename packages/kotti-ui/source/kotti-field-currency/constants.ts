import type { KottiField } from '../kotti-field/types'
import { DECIMAL_SEPARATORS_CHARACTER_SET } from '../utilities'

export const KOTTI_FIELD_CURRENCY_SUPPORTS: KottiField.Supports = {
	autoComplete: true,
	borderless: true,
	clear: false,
	decoration: false,
	placeholder: true,
	tabIndex: true,
}

export const VALID_REGEX = new RegExp(
	`^[-]?[0-9]*${DECIMAL_SEPARATORS_CHARACTER_SET}?[0-9]*$`,
)
