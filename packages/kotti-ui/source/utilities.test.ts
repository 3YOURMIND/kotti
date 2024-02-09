import { describe, expect, it } from 'vitest'

import { isNumberInRange } from './utilities'

describe('isNumberInRange', () => {
	it('returns true if value is in range', () => {
		expect(isNumberInRange({ maximum: 10, minimum: 0, value: 5 })).toBe(true)
	})

	it('returns false if value is out of range', () => {
		expect(isNumberInRange({ maximum: 10, minimum: 0, value: 10.01 })).toBe(
			false,
		)
		expect(isNumberInRange({ maximum: 10, minimum: 0, value: -0.01 })).toBe(
			false,
		)
	})

	it('returns true if value is null', () => {
		expect(isNumberInRange({ maximum: 10, minimum: 0, value: null })).toBe(true)
	})

	it('only checks one boundary if the other is null', () => {
		expect(isNumberInRange({ maximum: null, minimum: 0, value: 11 })).toBe(true)
		expect(isNumberInRange({ maximum: 10, minimum: null, value: -1 })).toBe(
			true,
		)
	})
})
