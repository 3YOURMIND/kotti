import dayjs from 'dayjs'

import { DATE_FORMAT_REGEX, DATE_TIME_FORMAT_REGEX } from './constants'
import { KottiFieldDateRange, Shared } from './types'

export const isInvalidDate = (
	props: Pick<Shared.PropsInternal, 'maximumDate' | 'minimumDate'>,
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
	| Shared.PropsInternal['maximumDate']
	| Shared.PropsInternal['minimumDate'] =>
	value === null ||
	(typeof value === 'string' && dayjs(value).format('YYYY-MM-DD') === value)

export const rangePlaceholderValidator = (
	value: unknown,
): value is KottiFieldDateRange.Props['placeholder'] =>
	Array.isArray(value) &&
	value.length === 2 &&
	value.every((fromOrTo) => fromOrTo === null || typeof fromOrTo === 'string')
