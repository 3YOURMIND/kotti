import Big from 'big.js'

import { DecimalSeparator } from '../types/kotti'
import { DECIMAL_SEPARATORS_CHARACTER_SET } from '../utilities'

import {
	STRINGS_THAT_ARE_TREATED_AS_NULL,
	TRAILING_ZEROES_REGEX,
} from './constants'

/**
 * We don't need the full package, as we don’t consider strings to be valid numbers
 * @see {@link https://github.com/jonschlinkert/is-number/blob/98e8ff1da1a89f93d1397a24d7413ed15421c139/index.js#L11-L13}
 */
export const isNumber = (value: unknown): boolean =>
	// eslint-disable-next-line sonarjs/no-identical-expressions
	typeof value === 'number' ? value - value === 0 : false

export const isStepMultiple = ({
	minimum,
	step,
	value,
}: {
	minimum: number | null
	step: number
	value: number | null
}) => {
	if (minimum === null || value === null) return true

	// (value - minimum) / step
	const stepFactor = Big(value).minus(minimum).div(step)

	// is integer?
	return stepFactor.eq(stepFactor.round())
}

export const toNumber = (string: string) =>
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
) =>
	number === null
		? ''
		: number
				.toFixed(decimalPlaces)
				.replace('.', decimalSeparator)
				.replace(TRAILING_ZEROES_REGEX, '$1')
