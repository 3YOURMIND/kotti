import { KottiField } from '../kotti-field/types'

export const KOTTI_FIELD_REMOTE_SELECT_SUPPORTS: KottiField.Supports = {
	clear: true,
	decoration: true,
	placeholder: true,
	tabIndex: true,
}

export const KOTTI_FIELD_SELECT_SUPPORTS: KottiField.Supports = {
	clear: true,
	decoration: true,
	placeholder: true,
	tabIndex: false,
}
