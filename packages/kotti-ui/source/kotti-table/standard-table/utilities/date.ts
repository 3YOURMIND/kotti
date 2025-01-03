import dayjs from 'dayjs'
import type { ManipulateType } from 'dayjs'

import { ISO8601 } from '../../../constants'

/**
 * Returns formatted today's date. Default template is ISO8601.
 * @param templateFormat dayjs compatible datetime format string
 * @returns formatted date
 */
export const getToday = (templateFormat: string = ISO8601): string =>
	dayjs().format(templateFormat)

/**
 * Returns formatted today's date with the specified amount of time subtracted. Default template is ISO8601.
 * @param unit dayjs time unit
 * @param templateFormat dayjs compatible datetime format string
 * @returns formatted date
 */
export const getLast = (
	unit: ManipulateType,
	templateFormat: string = ISO8601,
): string => dayjs().subtract(1, unit).format(templateFormat)
