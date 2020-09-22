import { vuePropsValidators } from '..'
import { REQUIRED } from '../constants'

import { TypeString } from './string'

import { Type } from '.'

const BASE_STRING: TypeString = {
	default: () => null,
	nullable: true,
	type: Type.STRING,
}

test('string has correct type', () =>
	expect(
		vuePropsValidators.create({ example: BASE_STRING }).props,
	).toMatchObject({
		example: { type: String },
	}))

test('string validator works', () => {
	const { example } = vuePropsValidators.create({
		example: BASE_STRING,
	}).props

	expect(example.validator('test')).toBeTruthy()
	expect(example.validator(false)).toBeFalsy()
	expect(example.validator(undefined)).toBeFalsy()
	expect(example.validator(NaN)).toBeFalsy()
	/* eslint-disable no-magic-numbers */
	expect(example.validator(42)).toBeFalsy()
	expect(example.validator(2.3)).toBeFalsy()
	/* eslint-enable no-magic-numbers */
})

test('string (nullable: false)', () =>
	expect(
		vuePropsValidators
			.create({
				example: { ...BASE_STRING, nullable: false },
			})
			.props.example.validator(null),
	).toBeFalsy())

test('string (nullable: true)', () =>
	expect(
		vuePropsValidators
			.create({
				example: { ...BASE_STRING, nullable: true },
			})
			.props.example.validator(null),
	).toBeTruthy())

test('string (default)', () =>
	expect(
		vuePropsValidators
			.create({
				example: { ...BASE_STRING, default: () => null },
			})
			.props.example.default(),
	).toBe(null))

test('string (required)', () =>
	expect(
		vuePropsValidators.create({
			example: { ...BASE_STRING, default: REQUIRED },
		}).props,
	).toMatchObject({
		example: {
			required: true,
		},
	}))
