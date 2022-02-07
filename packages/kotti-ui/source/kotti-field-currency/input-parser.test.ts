import { parseCurrencyUserInput } from './input-parser'

describe('parseCurrencyUserInput', () => {
	it('', () => {
		const UNINTENTIONAL_CASES: Array<
			[
				Parameters<typeof parseCurrencyUserInput>[0],
				ReturnType<typeof parseCurrencyUserInput>,
			]
		> = [
			[{ value: 'a', decimalPlaces: 2 }, ''],
			[{ value: '5a', decimalPlaces: 2 }, ''],
		]

		const TEST_CASES: Array<
			[
				Parameters<typeof parseCurrencyUserInput>[0],
				ReturnType<typeof parseCurrencyUserInput>,
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
			expect(parseCurrencyUserInput(input)).toEqual(output)

		for (const [input, output] of UNINTENTIONAL_CASES)
			expect(parseCurrencyUserInput(input)).not.toEqual(output)
	})
})
