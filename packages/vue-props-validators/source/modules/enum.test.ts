import { vuePropsValidators } from '..'
import { REQUIRED } from '../constants'

import { TypeEnum } from './enum'

import { Type } from '.'

const BASE_ENUM: TypeEnum = {
	default: () => null,
	nullable: true,
	type: Type.ENUM,
	options: [],
}

test('enum has correct type', () =>
	expect(vuePropsValidators.create({ example: BASE_ENUM }).props).toMatchObject(
		{
			example: { type: String },
		},
	))

test('enum validator works', () => {
	const { example } = vuePropsValidators.create({
		example: { ...BASE_ENUM, options: ['test', 'example'] },
	}).props

	expect(example.validator('test')).toBeTruthy()
	expect(example.validator('example')).toBeTruthy()
	expect(example.validator('anything')).toBeFalsy()
})

test('enum (nullable: false)', () =>
	expect(
		vuePropsValidators
			.create({
				example: { ...BASE_ENUM, nullable: false },
			})
			.props.example.validator(null),
	).toBeFalsy())

test('enum (nullable: true)', () =>
	expect(
		vuePropsValidators
			.create({
				example: { ...BASE_ENUM, nullable: true },
			})
			.props.example.validator(null),
	).toBeTruthy())

test('enum (default)', () =>
	expect(
		vuePropsValidators
			.create({
				example: { ...BASE_ENUM, default: () => null },
			})
			.props.example.default(),
	).toBe(null))

test('enum (required)', () =>
	expect(
		vuePropsValidators.create({
			example: { ...BASE_ENUM, default: REQUIRED },
		}).props,
	).toMatchObject({
		example: {
			required: true,
		},
	}))
