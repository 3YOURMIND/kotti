import Big from 'big.js'

import type { DecimalSeparator } from '../types/decimal-separator'
import { DECIMAL_SEPARATORS_CHARACTER_SET } from '../utilities'

import {
	STRINGS_THAT_ARE_TREATED_AS_NULL,
	TRAILING_ZEROES_REGEX,
} from './constants'

export const isStepMultiple = ({
	minimum,
	step,
	value,
}: {
	minimum: number | null
	step: number
	value: number | null
}): boolean => {
	if (minimum === null || value === null) return true

	// (value - minimum) / step
	const stepFactor = Big(value).minus(minimum).div(step)

	// is integer?
	return stepFactor.eq(stepFactor.round())
}

export const toNumber = (string: string): number | null =>
	STRINGS_THAT_ARE_TREATED_AS_NULL.includes(string)
		? null
		: Number.parseFloat(
				// `.` is the only accepted decimal place by parseFloat
				string.replace(new RegExp(DECIMAL_SEPARATORS_CHARACTER_SET), '.'),
			)

export const toString = (
	number: number | null,
	decimalPlaces: number,
	decimalSeparator: DecimalSeparator,
): string =>
	number === null
		? ''
		: number
				.toFixed(decimalPlaces)
				.replace('.', decimalSeparator)
				.replace(TRAILING_ZEROES_REGEX, '$1')
