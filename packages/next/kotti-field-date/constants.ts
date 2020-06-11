import { Dashes } from '@metatypes/typography'
import dayjs from 'dayjs'
import ElementLocale from 'element-ui/lib/locale'
// import german from 'element-ui/lib/locale/lang/de'
import english from 'element-ui/lib/locale/lang/en'

import { Shared, KottiFieldDate } from './types'

// import french from 'element-ui/lib/locale/lang/fr'
// import japanese from 'element-ui/lib/locale/lang/ja'

//TODO inject context, and fetch locale key
ElementLocale.use(english)

const SHARED_INTERNAL_PROPS = {
	clearable: true,
	editable: true,
}

const RANGE_INTERNAL_PROPS = {
	rangeSeparator: Dashes.EnDash,
}

export const DATE_INTERNAL_PROPS = {
	...SHARED_INTERNAL_PROPS,
	format: 'yyyy-MM-dd',
	valueFormat: 'yyyy-MM-dd',
}

export const DATE_TIME_INTERNAL_PROPS = {
	...SHARED_INTERNAL_PROPS,
	...RANGE_INTERNAL_PROPS,
	format: 'yyyy-MM-dd HH:mm',
	valueFormat: 'yyyy-MM-dd[T]HH:mm:ss',
}

export const DATE_FORMAT_REGEX = /^\d{4}-\d{2}-\d{2}/
export const DATE_TIME_FORMAT_REGEX = /\d{4}-\d{2}-\d{2}(\[T\]| )\d{2}:\d{2}(:\d{2})?/

const dateLimitValidator = (
	value: unknown,
): value is
	| Shared.Props<unknown>['maximumDate']
	| Shared.Props<unknown>['minimumDate'] =>
	value === null ||
	(typeof value === 'string' && dayjs(value).format('YYYY-MM-DD') === value)

export const KOTTI_FIELD_DATE_SHARED_PROPS = {
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
	shortcuts: {
		default: () => [],
		type: Array,
		validator: (value: unknown): value is KottiFieldDate.Props['shortcuts'] =>
			Array.isArray(value) &&
			value.every(
				(
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					option: any,
				): option is Shared.Props<KottiFieldDate.Value>['shortcuts'][0] =>
					typeof option === 'object' &&
					option !== null &&
					typeof option.label === 'string' &&
					typeof option.value === 'string' &&
					DATE_FORMAT_REGEX.test(option.value) &&
					['boolean', 'undefined'].includes(typeof option.keepOpen),
			),
	},
}
