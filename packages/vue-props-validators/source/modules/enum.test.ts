import { vuePropsValidators } from '..'
import { REQUIRED } from '../constants'

const BASE_ENUM = {
	default: REQUIRED as typeof REQUIRED,
	nullable: false,
	type: 'enum' as const,
	options: [],
}

test('enum has correct type', () =>
	expect(
		vuePropsValidators({
			example: BASE_ENUM,
		}),
	).toMatchObject({ example: { type: String } }))

test('enum validator works', () => {
	const { validator } = vuePropsValidators({
		example: { ...BASE_ENUM, options: ['test', 'example'] },
	}).example

	expect(validator('test')).toBeTruthy()
	expect(validator('example')).toBeTruthy()
	expect(validator('anything')).toBeFalsy()
})

test('enum (nullable: false)', () =>
	expect(
		vuePropsValidators({
			example: { ...BASE_ENUM, nullable: false },
		}).example.validator(null),
	).toBeFalsy())

test('enum (nullable: true)', () =>
	expect(
		vuePropsValidators({
			example: { ...BASE_ENUM, nullable: true },
		}).example.validator(null),
	).toBeTruthy())

test('enum (default)', () =>
	expect(
		vuePropsValidators({
			example: { ...BASE_ENUM, default: () => null },
		}).example.default(),
	).toBe(null))

test('enum (required)', () =>
	expect(
		vuePropsValidators({
			example: { ...BASE_ENUM, default: REQUIRED },
		}),
	).toMatchObject({
		example: {
			required: true,
		},
	}))
