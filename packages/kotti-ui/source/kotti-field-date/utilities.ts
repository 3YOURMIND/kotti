import dayjs from 'dayjs'

import { Shared } from './types'

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
