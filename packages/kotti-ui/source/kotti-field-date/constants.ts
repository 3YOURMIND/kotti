import { Dashes } from '@metatypes/typography'

import { KottiField } from '../kotti-field/types'

import { KottiFieldDateRange, KottiFieldDateTimeRange } from './types'
import {
	dateLimitValidator,
	dateRangeShortcutValidator,
	dateTimeRangeShortcutValidator,
	rangePlaceholderValidator,
} from './utilities'

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

const KOTTI_FIELD_DATE_SHARED_PROPS = {
	maximumDate: {
		default: null,
		type: String,
		validator: dateLimitValidator,
	},
	minimumDate: {
		default: null,
		type: String,
		validator: dateLimitValidator,
	},
}

export const KOTTI_FIELD_DATE_SUPPORTS: KottiField.Supports = {
	clear: true,
	decoration: false,
	tabIndex: false,
}

export const KOTTI_FIELD_DATE_RANGE_PROPS = {
	...KOTTI_FIELD_DATE_SHARED_PROPS,
	placeholder: {
		default: () => [null, null],
		type: Array,
		validator: rangePlaceholderValidator,
	},
	shortcuts: {
		default: () => [],
		type: Array,
		validator: (
			value: unknown,
		): value is KottiFieldDateRange.Props['shortcuts'] =>
			Array.isArray(value) && value.every(dateRangeShortcutValidator),
	},
	value: { default: null, type: Array },
}

export const KOTTI_FIELD_DATE_TIME_RANGE_PROPS = {
	...KOTTI_FIELD_DATE_SHARED_PROPS,
	placeholder: {
		default: () => [null, null],
		type: Array,
		validator: rangePlaceholderValidator,
	},
	//TODO should / will need more limits for the time
	shortcuts: {
		default: () => [],
		type: Array,
		validator: (
			value: unknown,
		): value is KottiFieldDateTimeRange.Props['shortcuts'] =>
			Array.isArray(value) && value.every(dateTimeRangeShortcutValidator),
	},
	value: { default: null, type: Array },
}
