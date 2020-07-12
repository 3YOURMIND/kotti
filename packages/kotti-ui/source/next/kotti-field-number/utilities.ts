import {
	STRINGS_THAT_ARE_TREATED_AS_NULL,
	DECIMAL_SEPARATOR,
	DECIMAL_PLACES,
	TRAILING_ZEROES_REGEX,
} from './constants'

/**
 * We don't need the full package, as we don’t consider strings to be valid numbers
 * @see {@link https://github.com/jonschlinkert/is-number/blob/98e8ff1da1a89f93d1397a24d7413ed15421c139/index.js#L11-L13}
 */
export const isNumber = (value: unknown): boolean =>
	// eslint-disable-next-line sonarjs/no-identical-expressions
	typeof value === 'number' ? value - value === 0 : false

export const isInRange = ({
	maximum,
	minimum,
	offset,
	value,
}: {
	maximum: number | null
	minimum: number | null
	offset: number
	value: number | null
}) => {
	if (value === null) return true

	const fitsMinimum = minimum === null || value + offset >= minimum
	const fitsMaximum = maximum === null || value + offset <= maximum

	return fitsMinimum && fitsMaximum
}

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
	const k = (value - minimum) / step
	const epsilon = 10e-10
	return Math.abs(k - Math.round(k)) < epsilon
}

export const toNumber = (string: string) =>
	STRINGS_THAT_ARE_TREATED_AS_NULL.includes(string)
		? null
		: parseFloat(string.replace(DECIMAL_SEPARATOR, '.'))

export const toString = (number: number | null) =>
	number === null
		? ''
		: number
				.toFixed(DECIMAL_PLACES)
				.replace('.', DECIMAL_SEPARATOR)
				.replace(TRAILING_ZEROES_REGEX, '$1')
