import dayjs from 'dayjs'

import { Shared } from './types'

export const isInvalidDate = (
	props: Pick<Shared.PropsInternal, 'maximumDate' | 'minimumDate'>,
	date: Date,
) => {
	const { maximumDate, minimumDate } = props

	return (
		(maximumDate !== null && dayjs(date).isAfter(maximumDate, 'day')) ||
		(minimumDate !== null && dayjs(date).isBefore(minimumDate, 'day'))
	)
}
