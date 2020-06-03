import { Dashes } from '@metatypes/typography'

export const COMMON_INTERNAL_PROPS = {
	clearable: true,
	editable: true,
}

export const DATE_FORMAT_REGEX = /^\d{4}-\d{2}-\d{2}/

export const DATE_INTERNAL_PROPS = {
	format: 'yyyy-MM-dd',
	valueFormat: 'yyyy-MM-dd',
}

export const DATE_TIME_INTERNAL_PROPS = {
	format: 'yyyy-MM-dd HH:mm',
	valueFormat: 'yyyy-MM-dd[T]HH:mm:ss',
}

export const DATE_TIME_FORMAT_REGEX = /\d{4}-\d{2}-\d{2}(\[T\]| )\d{2}:\d{2}(:\d{2})?/

export const RANGE_INTERNAL_PROPS = {
	rangeSeparator: Dashes.EnDash,
}
