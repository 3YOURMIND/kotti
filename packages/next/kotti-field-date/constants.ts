import { Dashes } from '@metatypes/typography'

import { KottiField } from '../kotti-field/types'

import {
	KottiFieldDate,
	KottiFieldDateRange,
	KottiFieldDateTime,
	KottiFieldDateTimeRange,
} from './types'
import {
	dateLimitValidator,
	dateRangeShortcutValidator,
	dateShortcutValidator,
	dateTimeShortcutValidator,
	dateTimeRangeShortcutValidator,
	rangePlaceholderValidator,
} from './utils'

const EL_SHARED_INTERNAL_PROPS = {
	clearable: true,
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

export const KOTTI_FIELD_DATE_PROPS = {
	...KOTTI_FIELD_DATE_SHARED_PROPS,
	placeholder: { default: null, type: String },
	shortcuts: {
		default: () => [],
		type: Array,
		validator: (value: unknown): value is KottiFieldDate.Props['shortcuts'] =>
			Array.isArray(value) && value.every(dateShortcutValidator),
	},
}

export const KOTTI_FIELD_DATE_RANGE_PROPS = {
	...KOTTI_FIELD_DATE_SHARED_PROPS,
	placeholder: {
		default: null,
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
}

export const KOTTI_FIELD_DATE_TIME_PROPS = {
	...KOTTI_FIELD_DATE_SHARED_PROPS,
	placeholder: { default: null, type: String },
	//TODO should / will need more limits for the time
	shortcuts: {
		default: () => [],
		type: Array,
		validator: (
			value: unknown,
		): value is KottiFieldDateTime.Props['shortcuts'] =>
			Array.isArray(value) && value.every(dateTimeShortcutValidator),
	},
}

export const KOTTI_FIELD_DATE_TIME_RANGE_PROPS = {
	...KOTTI_FIELD_DATE_SHARED_PROPS,
	placeholder: {
		default: null,
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
}
