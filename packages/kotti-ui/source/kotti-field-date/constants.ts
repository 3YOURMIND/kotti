import type { KottiField } from '../kotti-field/types'

/**
 * ISO8601
 */
export const DATE_FORMAT_REGEX = /^\d{4}-\d{2}-\d{2}$/
/**
 * ISO8601 time without `T`
 */
export const DATE_TIME_FORMAT_REGEX = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}(:\d{2})?$/

export const KOTTI_FIELD_DATE_SUPPORTS: KottiField.Supports = {
	autoComplete: false,
	borderless: true,
	clear: true,
	decoration: false,
	placeholder: true,
	tabIndex: false,
}
