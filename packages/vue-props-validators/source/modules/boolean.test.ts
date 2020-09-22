/* eslint-disable no-magic-numbers */
import { vuePropsValidators } from '..'
import { REQUIRED } from '../constants'

import { TypeBoolean } from './boolean'

import { Type } from '.'

const BASE_BOOLEAN: TypeBoolean = {
	default: () => null,
	nullable: true,
	type: Type.BOOLEAN,
}

test('boolean has correct type', () =>
	expect(
		vuePropsValidators.create({ example: BASE_BOOLEAN }).props,
	).toMatchObject({
		example: { type: Boolean },
	}))

test('boolean validator works', () => {
	const { example } = vuePropsValidators.create({
		example: BASE_BOOLEAN,
	}).props

	expect(example.validator('test')).toBeFalsy()
	expect(example.validator(false)).toBeTruthy()
	expect(example.validator(true)).toBeTruthy()
	expect(example.validator(undefined)).toBeFalsy()
	expect(example.validator(NaN)).toBeFalsy()
	expect(example.validator(42)).toBeFalsy()
	expect(example.validator(2.3)).toBeFalsy()
})

test('boolean (nullable: false)', () =>
	expect(
		vuePropsValidators
			.create({
				example: { ...BASE_BOOLEAN, nullable: false },
			})
			.props.example.validator(null),
	).toBeFalsy())

test('boolean (nullable: true)', () =>
	expect(
		vuePropsValidators
			.create({
				example: { ...BASE_BOOLEAN, nullable: true },
			})
			.props.example.validator(null),
	).toBeTruthy())

test('boolean (default)', () =>
	expect(
		vuePropsValidators
			.create({
				example: { ...BASE_BOOLEAN, default: () => null },
			})
			.props.example.default(),
	).toBe(null))

test('boolean (required)', () =>
	expect(
		vuePropsValidators.create({
			example: { ...BASE_BOOLEAN, default: REQUIRED },
		}).props,
	).toMatchObject({
		example: {
			required: true,
		},
	}))
