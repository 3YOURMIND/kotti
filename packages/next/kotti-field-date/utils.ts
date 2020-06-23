import dayjs from 'dayjs'

import { DATE_FORMAT_REGEX, DATE_TIME_FORMAT_REGEX } from './constants'
import {
	KottiFieldDate,
	KottiFieldDateRange,
	KottiFieldDateTime,
	KottiFieldDateTimeRange,
	Shared,
} from './types'

export const isInvalidDate = (
	props: Pick<Shared.Props<unknown>, 'maximumDate' | 'minimumDate'>,
	date: Date,
) => {
	const { maximumDate, minimumDate } = props

	if (maximumDate !== null && dayjs(date).isAfter(maximumDate, 'day'))
		return true

	if (minimumDate !== null && dayjs(date).isBefore(minimumDate, 'day'))
		return true

	return false
}

export const dateLimitValidator = (
	value: unknown,
): value is
	| Shared.Props<unknown>['maximumDate']
	| Shared.Props<unknown>['minimumDate'] =>
	value === null ||
	(typeof value === 'string' && dayjs(value).format('YYYY-MM-DD') === value)

export const dateRangeShortcutValidator = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	option: any,
): option is Shared.Props<KottiFieldDateRange.Value>['shortcuts'][0] =>
	typeof option === 'object' &&
	option !== null &&
	typeof option.label === 'string' &&
	Array.isArray(option.value) &&
	option.value.length === 2 &&
	option.value.every(
		(date: KottiFieldDateRange.Value) =>
			date === null ||
			(typeof date === 'string' && DATE_FORMAT_REGEX.test(date)),
	) &&
	['boolean', 'undefined'].includes(typeof option.keepOpen)

export const dateShortcutValidator = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	option: any,
): option is Shared.Props<KottiFieldDate.Value>['shortcuts'][0] =>
	typeof option === 'object' &&
	option !== null &&
	typeof option.label === 'string' &&
	typeof option.value === 'string' &&
	DATE_FORMAT_REGEX.test(option.value) &&
	['boolean', 'undefined'].includes(typeof option.keepOpen)

export const dateTimeShortcutValidator = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	option: any,
): option is Shared.Props<KottiFieldDateTime.Value>['shortcuts'][0] =>
	typeof option === 'object' &&
	option !== null &&
	typeof option.label === 'string' &&
	typeof option.value === 'string' &&
	DATE_TIME_FORMAT_REGEX.test(option.value) &&
	['boolean', 'undefined'].includes(typeof option.keepOpen)

export const dateTimeRangeShortcutValidator = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	option: any,
): option is Shared.Props<KottiFieldDateTimeRange.Value>['shortcuts'][0] =>
	typeof option === 'object' &&
	option !== null &&
	typeof option.label === 'string' &&
	Array.isArray(option.value) &&
	option.value.length === 2 &&
	option.value.every(
		(datetime: KottiFieldDateTimeRange.Value) =>
			datetime === null ||
			(typeof datetime === 'string' && DATE_TIME_FORMAT_REGEX.test(datetime)),
	) &&
	['boolean', 'undefined'].includes(typeof option.keepOpen)
