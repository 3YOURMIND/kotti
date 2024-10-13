import { describe, expect, it } from 'vitest'

import { formatCurrencyUserInput } from './input-formatter'

describe('formatCurrencyUserInput', () => {
	it('correctly formats user input into a string that has the accepted number of decimal places', () => {
		const TEST_CASES: Array<
			[
				Parameters<typeof formatCurrencyUserInput>[0],
				ReturnType<typeof formatCurrencyUserInput>,
			]
		> = [
			[{ decimalPlaces: 2, value: '.' }, '0.00'],
			[{ decimalPlaces: 2, value: '' }, '0.00'],
			[{ decimalPlaces: 2, value: '0' }, '0.00'],
			[{ decimalPlaces: 2, value: '00.0' }, '0.00'],
			[{ decimalPlaces: 2, value: '0.00' }, '0.00'],
			[{ decimalPlaces: 2, value: '0.000' }, '0.00'],

			[{ decimalPlaces: 2, value: '-1' }, '-0.01'],
			[{ decimalPlaces: 2, value: '-12' }, '-0.12'],
			[{ decimalPlaces: 2, value: '-12.3' }, '-1.23'],
			[{ decimalPlaces: 2, value: '-123' }, '-1.23'],
			[{ decimalPlaces: 2, value: '-1234' }, '-12.34'],
			[{ decimalPlaces: 2, value: '-12345' }, '-123.45'],

			[{ decimalPlaces: 2, value: '1' }, '0.01'],
			[{ decimalPlaces: 2, value: '12' }, '0.12'],
			[{ decimalPlaces: 2, value: '12.3' }, '1.23'],
			[{ decimalPlaces: 2, value: '123' }, '1.23'],
			[{ decimalPlaces: 2, value: '1234' }, '12.34'],
			[{ decimalPlaces: 2, value: '12345' }, '123.45'],
		]

		for (const [input, output] of TEST_CASES)
			expect(formatCurrencyUserInput(input)).toEqual(output)
	})

	it('throws for invalid values', () => {
		const TEST_CASES: Array<Parameters<typeof formatCurrencyUserInput>[0]> = [
			{ decimalPlaces: 2, value: 'a' },
			{ decimalPlaces: 2, value: '5a' },
		]

		for (const input of TEST_CASES)
			expect(() => formatCurrencyUserInput(input)).toThrow()
	})
})
