import { KottiField } from '../kotti-field/types'

export const KOTTI_FIELD_REMOTE_SELECT_SUPPORTS: KottiField.Supports = {
	clear: true,
	decoration: true,
	tabIndex: true,
}

export const KOTTI_FIELD_SELECT_SUPPORTS: KottiField.Supports = {
	clear: true,
	decoration: true,
	tabIndex: false,
}
