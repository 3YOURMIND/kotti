import { VALID_REGEX } from './constants'
import { toFixedPrecisionString } from './utilities'

/**
 * Note: function assumes that the decimal separator for
 * `value` & `oldValue` is `.`
 *
 * The function assumes a value that passes VALID_REGEX
 * It may work for some strings, and return a valid number
 * (e.g. value: 'a', decimalPlaces: 2, returned value: '0.00')
 * as a side-effect of using `toFixedPrecisionString`,
 * but this is undefined behavior.
 */
export const formatCurrencyUserInput = ({
	decimalPlaces,
	value,
}: {
	decimalPlaces: number
	value: string
}): string => {
	if (!VALID_REGEX.test(value))
		throw new Error(
			`KtFieldCurrency: formatCurrencyUserInput recieved invalid value "${value}".`,
		)

	const isNegativeValue = value.startsWith('-')
	const strippedSign = value.replace(/-/, '')
	// enforces at least as many digits as (decimal places + 1) (aka `0.00`)
	const paddedString = `${'0'.repeat(decimalPlaces + 1)}${strippedSign}`

	const withoutDecimalPoint = paddedString.replace('.', '')

	const relocatedDecimalPoint = [
		...(isNegativeValue ? ['-'] : []),
		withoutDecimalPoint.slice(0, -decimalPlaces),
		'.',
		withoutDecimalPoint.slice(-decimalPlaces),
	].join('')

	// to remove leading zeroes (from padding or from user)
	return toFixedPrecisionString(relocatedDecimalPoint, decimalPlaces) ?? ''
}
