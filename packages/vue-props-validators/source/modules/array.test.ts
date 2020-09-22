/* eslint-disable no-magic-numbers */
import { vuePropsValidators } from '..'
import { REQUIRED } from '../constants'

import { TypeArray } from './array'

import { Type } from '.'

const BASE_ARRAY: TypeArray = {
	default: () => null,
	nullable: true,
	type: Type.ARRAY,
}

test('array has correct type', () =>
	expect(vuePropsValidators.create({ example: BASE_ARRAY })).toMatchObject({
		example: { type: Array },
	}))

test('array validator works', () => {
	const { example } = vuePropsValidators.create({
		example: BASE_ARRAY,
	})

	expect(example.validator('test')).toBeFalsy()
	expect(example.validator(false)).toBeFalsy()
	expect(example.validator(true)).toBeFalsy()
	expect(example.validator(undefined)).toBeFalsy()
	expect(example.validator(NaN)).toBeFalsy()
	expect(example.validator(42)).toBeFalsy()
	expect(example.validator(2.3)).toBeFalsy()

	expect(example.validator([])).toBeTruthy()
	expect(example.validator([1, '2'])).toBeTruthy()
})

test('array (nullable: false)', () =>
	expect(
		vuePropsValidators
			.create({
				example: { ...BASE_ARRAY, nullable: false },
			})
			.example.validator(null),
	).toBeFalsy())

test('array (nullable: true)', () =>
	expect(
		vuePropsValidators
			.create({
				example: { ...BASE_ARRAY, nullable: true },
			})
			.example.validator(null),
	).toBeTruthy())

test('array (default)', () =>
	expect(
		vuePropsValidators
			.create({
				example: { ...BASE_ARRAY, default: () => null },
			})
			.example.default(),
	).toBe(null))

test('array (default with an actual value)', () =>
	expect(
		vuePropsValidators
			.create({
				example: { ...BASE_ARRAY, default: () => [-1] },
			})
			.example.default(),
	).toEqual([-1]))

test('array (required)', () =>
	expect(
		vuePropsValidators.create({
			example: { ...BASE_ARRAY, default: REQUIRED },
		}),
	).toMatchObject({
		example: {
			required: true,
		},
	}))
