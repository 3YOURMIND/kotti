import { Dashes } from '@metatypes/typography'
import ElementLocale from 'element-ui/lib/locale'
// import german from 'element-ui/lib/locale/lang/de'
import english from 'element-ui/lib/locale/lang/en'

import { KottiFieldDate, KottiFieldDateRange } from './types'
import {
	dateLimitValidator,
	dateShortcutValidator,
	dateRangeShortcutValidator,
} from './utils'
// import french from 'element-ui/lib/locale/lang/fr'
// import japanese from 'element-ui/lib/locale/lang/ja'

//TODO inject context, and fetch locale key
ElementLocale.use(english)

const SHARED_INTERNAL_PROPS = {
	clearable: true,
	editable: true,
}

export const EL_DATE_RANGE_PROPS = {
	rangeSeparator: Dashes.EnDash,
}

export const EL_DATE_PROPS = {
	...SHARED_INTERNAL_PROPS,
	format: 'yyyy-MM-dd',
	valueFormat: 'yyyy-MM-dd',
}

export const EL_DATETIME_PROPS = {
	...SHARED_INTERNAL_PROPS,
	format: 'yyyy-MM-dd HH:mm',
	valueFormat: 'yyyy-MM-dd[T]HH:mm:ss',
}

export const DATE_FORMAT_REGEX = /^\d{4}-\d{2}-\d{2}/
export const DATE_TIME_FORMAT_REGEX = /\d{4}-\d{2}-\d{2}(\[T\]| )\d{2}:\d{2}(:\d{2})?/

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

export const KOTTI_FIELD_DATE_PROPS = {
	...KOTTI_FIELD_DATE_SHARED_PROPS,
	shortcuts: {
		default: () => [],
		type: Array,
		validator: (value: unknown): value is KottiFieldDate.Props['shortcuts'] =>
			Array.isArray(value) && value.every(dateShortcutValidator),
	},
}

export const KOTTI_FIELD_DATE_RANGE_PROPS = {
	...KOTTI_FIELD_DATE_SHARED_PROPS,
	shortcuts: {
		default: () => [],
		type: Array,
		validator: (
			value: unknown,
		): value is KottiFieldDateRange.Props['shortcuts'] =>
			Array.isArray(value) && value.every(dateRangeShortcutValidator),
	},
}
