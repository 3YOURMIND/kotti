/* eslint-disable no-magic-numbers */
import { vuePropsValidators } from '..'
import { REQUIRED } from '../constants'

import { TypeFloat } from './float'

import { Type } from '.'

const BASE_FLOAT: TypeFloat = {
	default: () => null,
	nullable: true,
	type: Type.FLOAT,
}

test('float has correct type', () =>
	expect(vuePropsValidators.create({ example: BASE_FLOAT })).toMatchObject({
		example: { type: Number },
	}))

test('float validator works', () => {
	const { example } = vuePropsValidators.create({
		example: BASE_FLOAT,
	})

	expect(example.validator('test')).toBeFalsy()
	expect(example.validator(undefined)).toBeFalsy()
	expect(example.validator(42)).toBeTruthy()
	expect(example.validator(420)).toBeTruthy()
	expect(example.validator(2.3)).toBeTruthy()
	expect(example.validator(NaN)).toBeFalsy()
})

test('float (maximum)', () => {
	const { example } = vuePropsValidators.create({
		example: { ...BASE_FLOAT, maximum: 5.2 },
	})

	expect(example.validator(1)).toBeTruthy()
	expect(example.validator(5)).toBeTruthy()
	expect(example.validator(5.2)).toBeTruthy()
	expect(example.validator(5.21)).toBeFalsy()
	expect(example.validator(420)).toBeFalsy()
})

test('float (minimum)', () => {
	const { example } = vuePropsValidators.create({
		example: { ...BASE_FLOAT, minimum: 5.2 },
	})

	expect(example.validator(1)).toBeFalsy()
	expect(example.validator(4)).toBeFalsy()
	expect(example.validator(5)).toBeFalsy()
	expect(example.validator(5.19)).toBeFalsy()
	expect(example.validator(5.2)).toBeTruthy()
	expect(example.validator(420)).toBeTruthy()
})

test('float (nullable: false)', () =>
	expect(
		vuePropsValidators
			.create({
				example: { ...BASE_FLOAT, nullable: false },
			})
			.example.validator(null),
	).toBeFalsy())

test('float (nullable: true)', () =>
	expect(
		vuePropsValidators
			.create({
				example: { ...BASE_FLOAT, nullable: true },
			})
			.example.validator(null),
	).toBeTruthy())

test('float (default)', () =>
	expect(
		vuePropsValidators
			.create({
				example: { ...BASE_FLOAT, default: () => null },
			})
			.example.default(),
	).toBe(null))

test('float (required)', () =>
	expect(
		vuePropsValidators.create({
			example: { ...BASE_FLOAT, default: REQUIRED },
		}),
	).toMatchObject({
		example: {
			required: true,
		},
	}))
