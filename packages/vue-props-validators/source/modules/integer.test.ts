/* eslint-disable no-magic-numbers */
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
	expect(
		vuePropsValidators.create({ example: BASE_INTEGER }).props,
	).toMatchObject({
		example: { type: Number },
	}))

test('integer validator works', () => {
	const { example } = vuePropsValidators.create({
		example: BASE_INTEGER,
	}).props

	expect(example.validator('test')).toBeFalsy()
	expect(example.validator(undefined)).toBeFalsy()
	expect(example.validator(42)).toBeTruthy()
	expect(example.validator(420)).toBeTruthy()
	expect(example.validator(2.3)).toBeFalsy()
	expect(example.validator(NaN)).toBeFalsy()
})

test('integer (maximum)', () => {
	const { example } = vuePropsValidators.create({
		example: { ...BASE_INTEGER, maximum: 5 },
	}).props

	expect(example.validator(1)).toBeTruthy()
	expect(example.validator(5)).toBeTruthy()
	expect(example.validator(6)).toBeFalsy()
	expect(example.validator(420)).toBeFalsy()
})

test('integer (minimum)', () => {
	const { example } = vuePropsValidators.create({
		example: { ...BASE_INTEGER, minimum: 5 },
	}).props

	expect(example.validator(1)).toBeFalsy()
	expect(example.validator(4)).toBeFalsy()
	expect(example.validator(5)).toBeTruthy()
	expect(example.validator(420)).toBeTruthy()
})

test('integer (nullable: false)', () =>
	expect(
		vuePropsValidators
			.create({
				example: { ...BASE_INTEGER, nullable: false },
			})
			.props.example.validator(null),
	).toBeFalsy())

test('integer (nullable: true)', () =>
	expect(
		vuePropsValidators
			.create({
				example: { ...BASE_INTEGER, nullable: true },
			})
			.props.example.validator(null),
	).toBeTruthy())

test('integer (default)', () =>
	expect(
		vuePropsValidators
			.create({
				example: { ...BASE_INTEGER, default: () => null },
			})
			.props.example.default(),
	).toBe(null))

test('integer (required)', () =>
	expect(
		vuePropsValidators.create({
			example: { ...BASE_INTEGER, default: REQUIRED },
		}).props,
	).toMatchObject({
		example: {
			required: true,
		},
	}))
