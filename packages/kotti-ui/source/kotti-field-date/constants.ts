import { Dashes } from '@metatypes/typography'

import { KottiField } from '../kotti-field/types'

const EL_SHARED_INTERNAL_PROPS = {
	editable: true,
}

export const EL_DATE_RANGE_PROPS = {
	rangeSeparator: Dashes.EnDash,
}

export const EL_DATE_PROPS = {
	...EL_SHARED_INTERNAL_PROPS,
	format: 'yyyy-MM-dd',
	valueFormat: 'yyyy-MM-dd',
}

export const EL_DATE_TIME_PROPS = {
	...EL_SHARED_INTERNAL_PROPS,
	format: 'yyyy-MM-dd HH:mm',
	valueFormat: 'yyyy-MM-dd HH:mm:ss',
}

export const DATE_FORMAT_REGEX = /^\d{4}-\d{2}-\d{2}$/
export const DATE_TIME_FORMAT_REGEX = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}(:\d{2})?$/

export const KOTTI_FIELD_DATE_SUPPORTS: KottiField.Supports = {
	clear: true,
	decoration: false,
	tabIndex: false,
}
