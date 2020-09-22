/* eslint-disable no-magic-numbers */
import { vuePropsValidators } from '..'
import { REQUIRED } from '../constants'

import { TypeObject } from './object'

import { Type } from '.'

const BASE_OBJECT: TypeObject = {
	default: () => null,
	nullable: true,
	type: Type.OBJECT,
}

test('object has correct type', () =>
	expect(
		vuePropsValidators.create({ example: BASE_OBJECT }).props,
	).toMatchObject({
		example: { type: Object },
	}))

test('object validator works', () => {
	const { example } = vuePropsValidators.create({
		example: BASE_OBJECT,
	}).props

	expect(example.validator('test')).toBeFalsy()
	expect(example.validator(false)).toBeFalsy()
	expect(example.validator(true)).toBeFalsy()
	expect(example.validator(undefined)).toBeFalsy()
	expect(example.validator(NaN)).toBeFalsy()
	expect(example.validator(42)).toBeFalsy()
	expect(example.validator(2.3)).toBeFalsy()
	expect(example.validator({ wow: 'spin' })).toBeTruthy()
	expect(example.validator({ wow: { spin: 'nested' } })).toBeTruthy()
	expect(example.validator({ a: true, wow: { spin: 'nested' } })).toBeTruthy()
})

test('object (nullable: false)', () =>
	expect(
		vuePropsValidators
			.create({
				example: { ...BASE_OBJECT, nullable: false },
			})
			.props.example.validator(null),
	).toBeFalsy())

test('object (nullable: true)', () =>
	expect(
		vuePropsValidators
			.create({
				example: { ...BASE_OBJECT, nullable: true },
			})
			.props.example.validator(null),
	).toBeTruthy())

test('object (default)', () =>
	expect(
		vuePropsValidators
			.create({
				example: { ...BASE_OBJECT, default: () => null },
			})
			.props.example.default(),
	).toBe(null))

test('object (required)', () =>
	expect(
		vuePropsValidators.create({
			example: { ...BASE_OBJECT, default: REQUIRED },
		}).props,
	).toMatchObject({
		example: {
			required: true,
		},
	}))
