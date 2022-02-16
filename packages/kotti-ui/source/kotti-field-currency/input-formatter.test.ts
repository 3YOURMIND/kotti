import { formatCurrencyUserInput } from './input-formatter'

describe('formatCurrencyUserInput', () => {
	it('correctly formats user input into a string that has the accepted number of decimal places', () => {
		const TEST_CASES: Array<
			[
				Parameters<typeof formatCurrencyUserInput>[0],
				ReturnType<typeof formatCurrencyUserInput>,
			]
		> = [
			[{ value: '.', decimalPlaces: 2 }, '0.00'],
			[{ value: '', decimalPlaces: 2 }, '0.00'],
			[{ value: '0', decimalPlaces: 2 }, '0.00'],
			[{ value: '00.0', decimalPlaces: 2 }, '0.00'],
			[{ value: '0.00', decimalPlaces: 2 }, '0.00'],
			[{ value: '0.000', decimalPlaces: 2 }, '0.00'],

			[{ value: '-1', decimalPlaces: 2 }, '-0.01'],
			[{ value: '-12', decimalPlaces: 2 }, '-0.12'],
			[{ value: '-12.3', decimalPlaces: 2 }, '-1.23'],
			[{ value: '-123', decimalPlaces: 2 }, '-1.23'],
			[{ value: '-1234', decimalPlaces: 2 }, '-12.34'],
			[{ value: '-12345', decimalPlaces: 2 }, '-123.45'],

			[{ value: '1', decimalPlaces: 2 }, '0.01'],
			[{ value: '12', decimalPlaces: 2 }, '0.12'],
			[{ value: '12.3', decimalPlaces: 2 }, '1.23'],
			[{ value: '123', decimalPlaces: 2 }, '1.23'],
			[{ value: '1234', decimalPlaces: 2 }, '12.34'],
			[{ value: '12345', decimalPlaces: 2 }, '123.45'],
		]

		for (const [input, output] of TEST_CASES)
			expect(formatCurrencyUserInput(input)).toEqual(output)
	})

	it('throws for invalid values', () => {
		const TEST_CASES: Array<Parameters<typeof formatCurrencyUserInput>[0]> = [
			{ value: 'a', decimalPlaces: 2 },
			{ value: '5a', decimalPlaces: 2 },
		]

		for (const input of TEST_CASES)
			expect(() => formatCurrencyUserInput(input)).toThrow()
	})
})
