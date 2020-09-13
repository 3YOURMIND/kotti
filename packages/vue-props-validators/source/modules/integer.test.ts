import { vuePropsValidators } from '..'
import { REQUIRED } from '../constants'

import { TypeInteger } from './integer'

import { Type } from '.'

const BASE_INTEGER: TypeInteger = {
	default: () => null,
	nullable: true,
	type: Type.INTEGER,
}

test('integer has correct type', () =>
	expect(vuePropsValidators.create({ example: BASE_INTEGER })).toMatchObject({
		example: { type: Number },
	}))

test('integer validator works', () => {
	const { example } = vuePropsValidators.create({
		example: BASE_INTEGER,
	})

	expect(example.validator('test')).toBeFalsy()
	expect(example.validator(undefined)).toBeFalsy()
	/* eslint-disable no-magic-numbers */
	expect(example.validator(42)).toBeTruthy()
	expect(example.validator(420)).toBeTruthy()
	expect(example.validator(2.3)).toBeFalsy()
	expect(example.validator(NaN)).toBeFalsy()
	/* eslint-enable no-magic-numbers */
})

test('integer (nullable: false)', () =>
	expect(
		vuePropsValidators
			.create({
				example: { ...BASE_INTEGER, nullable: false },
			})
			.example.validator(null),
	).toBeFalsy())

test('integer (nullable: true)', () =>
	expect(
		vuePropsValidators
			.create({
				example: { ...BASE_INTEGER, nullable: true },
			})
			.example.validator(null),
	).toBeTruthy())

test('integer (default)', () =>
	expect(
		vuePropsValidators
			.create({
				example: { ...BASE_INTEGER, default: () => null },
			})
			.example.default(),
	).toBe(null))

test('integer (required)', () =>
	expect(
		vuePropsValidators.create({
			example: { ...BASE_INTEGER, default: REQUIRED },
		}),
	).toMatchObject({
		example: {
			required: true,
		},
	}))
