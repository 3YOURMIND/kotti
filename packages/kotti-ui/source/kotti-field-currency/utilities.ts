import Big from 'big.js'

import { DecimalSeparator } from '../types/kotti'
import { DECIMAL_SEPARATORS_CHARACTER_SET } from '../utilities'

export const toNumber = <T extends string | null>(
	value: T,
): T extends null ? null : number =>
	(value === null
		? null
		: Number.parseFloat(
				// `.` is the only accepted decimal place by parseFloat
				value.replace(new RegExp(DECIMAL_SEPARATORS_CHARACTER_SET), '.'),
		  )) as T extends null ? null : number

export const truncate = (value: number, decimalPlaces: number) =>
	Big(value).round(decimalPlaces, Big.roundDown)

export const replaceDecimalSeparator = <T extends string | null>(
	string: T,
	decimalSeparator: DecimalSeparator,
): T extends null ? null : string =>
	(string?.replace(
		new RegExp(DECIMAL_SEPARATORS_CHARACTER_SET),
		decimalSeparator,
	) ?? null) as T extends null ? null : string

export const toFixedPrecisionString = (
	string: string | null,
	decimalPlaces: number,
): string | null => {
	const number = toNumber(string)
	if (number === null) return null

	if (Number.isNaN(number)) return null

	return truncate(number, decimalPlaces).toFixed(decimalPlaces)
}
