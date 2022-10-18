import { KottiField } from '../kotti-field/types'

export const KOTTI_FIELD_INLINE_EDIT_SUPPORTS: KottiField.Supports = {
	clear: false,
	// only internally support `rightIcon`
	decoration: true,
	placeholder: true,
	tabIndex: true,
}
