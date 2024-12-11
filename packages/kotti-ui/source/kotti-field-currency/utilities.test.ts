import { describe, expect, it } from 'vitest'

import { DecimalSeparator } from '../types/decimal-separator'

import { VALID_REGEX } from './constants'
import { toFixedPrecisionString } from './utilities'

const DECIMAL_SEPARATORS = Object.values(DecimalSeparator)
const DECIMAL_PRECISION = 3

describe('toFixedPrecisionString', () => {
	it('returns null for empty strings', () => {
		expect(toFixedPrecisionString('', DECIMAL_PRECISION)).toBe(null)
	})

	it('returns null for Decimal Separators', () => {
		for (const testCase of DECIMAL_SEPARATORS)
			expect(toFixedPrecisionString(testCase, DECIMAL_PRECISION)).toBe(null)
	})

	it('returns null for +/-', () => {
		for (const testCase of ['-', '+'])
			expect(toFixedPrecisionString(testCase, DECIMAL_PRECISION)).toBe(null)
	})

	it('returns null for non-numerical values', () => {
		for (const testCase of ['-a', '+a', 'a.', 'a,', 'aaa'])
			expect(toFixedPrecisionString(testCase, DECIMAL_PRECISION)).toBe(null)
	})

	it('returns a `.` for all potential decimal separators', () => {
		for (const testCase of ['5.0', '5,0', '5٫0'])
			expect(toFixedPrecisionString(testCase, DECIMAL_PRECISION)).toBe(
				(5).toFixed(DECIMAL_PRECISION),
			)
	})

	it('returns same precision for all numericals', () => {
		for (const testCase of ['5', '5.', '5.0', '5.00', '5.000', '5.0000'])
			expect(toFixedPrecisionString(testCase, DECIMAL_PRECISION)).toBe(
				(5).toFixed(DECIMAL_PRECISION),
			)
	})

	it('removes leading zeroes', () => {
		for (const [testCase, expectedResult] of [
			['0.0', '0.000'],
			['00.0', '0.000'],
			['001.0', '1.000'],
		] as const)
			expect(toFixedPrecisionString(testCase, DECIMAL_PRECISION)).toBe(
				expectedResult,
			)
	})

	it('truncates beyond maximum allowed precision', () => {
		for (const [testCase, expectedResult] of [
			['0.0125', '0.012'],
			['0.0123', '0.012'],
			['0.9999', '0.999'],
		] as const)
			expect(toFixedPrecisionString(testCase, DECIMAL_PRECISION)).toBe(
				expectedResult,
			)
	})
})

describe('VALID_REGEX validates all allowed in-between user-typed inputs', () => {
	it('should validate in case of partially-invalid numerical strings', () => {
		const SUCCESS_CASES = ['', '0.1', '.', '0.01', '1.5', '42']

		for (const testCase of SUCCESS_CASES) {
			expect(VALID_REGEX.test(testCase)).toBe(true)
		}
	})

	it('should fail for invalid numbers', () => {
		const FAILURE_CASES = [
			'..',
			'1..',
			'1.1.1',
			'++',
			'--',
			' ',
			'1 1',
			' 11',
			'11 ',
			'5a',
			'a5',
			'abc',
			'hello world',
		]

		for (const testCase of FAILURE_CASES)
			expect(VALID_REGEX.test(testCase)).toBe(false)
	})

	it('should allow a decimal separator', () => {
		const SUCCESS_CASES = DECIMAL_SEPARATORS

		for (const testCase of SUCCESS_CASES)
			expect(VALID_REGEX.test(testCase)).toBe(true)
	})

	it('should allow negative signs', () => {
		const SUCCESS_CASES = ['-', '-1', '-1.1']

		for (const testCase of SUCCESS_CASES)
			expect(VALID_REGEX.test(testCase)).toBe(true)
	})
	it('should not allow positive signs', () => {
		const SUCCESS_CASES = ['+', '+1', '+1.1', '1+', '.+', '9+10', '0.+']

		for (const testCase of SUCCESS_CASES)
			expect(VALID_REGEX.test(testCase)).toBe(false)
	})

	it('should fail for misplaced signs', () => {
		const FAILURE_CASES = ['1-', '.-', '0.-']

		for (const testCase of FAILURE_CASES)
			expect(VALID_REGEX.test(testCase)).toBe(false)
	})

	it('should allow a leading zero when followed by a decimal point', () => {
		const SUCCESS_CASES = ['0.1', '0.2']

		for (const testCase of SUCCESS_CASES)
			expect(VALID_REGEX.test(testCase)).toBe(true)
	})

	it('should not fail for multiple leading zeroes', () => {
		const SUCCESS_CASES = ['00.0', '000.0', '01.0', '0010.0']

		for (const testCase of SUCCESS_CASES)
			expect(VALID_REGEX.test(testCase)).toBe(true)
	})

	it('should allow trailing zeroes', () => {
		const SUCCESS_CASES = ['0.0', '0.00', '0.000', '1.000', '0.100']

		for (const testCase of SUCCESS_CASES)
			expect(VALID_REGEX.test(testCase)).toBe(true)
	})

	it('should not enforce a maximum precision', () => {
		const SUCCESS_CASES = ['0.1', '0.01', '0.001', '1.00000', '1.0000']

		for (const testCase of SUCCESS_CASES)
			expect(VALID_REGEX.test(testCase)).toBe(true)
	})
})
