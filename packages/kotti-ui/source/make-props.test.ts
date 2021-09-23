import { PropOptions } from '@vue/composition-api'
import { z } from 'zod'

import { makeProps } from './make-props'
import { silenceConsole } from './test-utils/silence-console'

const expectDefault = (
	prop: PropOptions<unknown, boolean>,
	defaultValue: unknown,
) => {
	// @ts-expect-error
	expect(prop.default()).toEqual(defaultValue)
	expect(prop.required).toBe(undefined)
}

const expectRequired = (prop: PropOptions<unknown, boolean>) => {
	expect(prop.default).toEqual(undefined)
	expect(prop.required).toBe(true)
}

const expectValidator = (
	prop: PropOptions<unknown, boolean>,
	successCases: unknown[],
	failCases: unknown[],
) => {
	const { validator } = prop

	if (validator === undefined) {
		expect(validator).not.toBe(undefined)
		throw new Error('unexpected undefined validator')
	}

	successCases.forEach((c) => expect(validator(c)).toBe(true))
	failCases.forEach((c) => expect(validator(c)).toBe(false))
}

describe('array', () => {
	beforeAll(silenceConsole)

	it('z.array(z.number())', () => {
		const schema = z.object({
			prop: z.array(z.number()),
		})
		const { prop } = makeProps(schema)

		expectRequired(prop)
		expect(prop.type).toEqual(Array)
		expectValidator(prop, [[], [1], [-1]], [1, null, 'test', undefined])
	})

	it('z.array(z.number()).nullable()', () => {
		const schema = z.object({
			prop: z.array(z.number()).nullable(),
		})
		const { prop } = makeProps(schema)

		expectRequired(prop)
		expect(prop.type).toEqual(Array)
		expectValidator(
			prop,
			[[], [1], [-1], null],
			[[null], ['string'], 1, 'test', undefined],
		)
	})

	it('z.array(z.number()).default()', () => {
		const schema = z.object({
			prop: z.array(z.number()).default(() => []),
		})

		const { prop } = makeProps(schema)

		expectDefault(prop, [])
		expect(prop.type).toEqual(Array)
		expectValidator(
			prop,
			[[], [1], [-1], undefined],
			[[null], ['string'], 1, null, 'test'],
		)
	})

	it('z.array(z.number()).nullable().default()', () => {
		const schema = z.object({
			prop: z.array(z.number()).nullable().default(null),
		})
		const { prop } = makeProps(schema)

		expectDefault(prop, null)
		expect(prop.type).toEqual(Array)
		expectValidator(
			prop,
			[[], [1], [-1], null, undefined],
			[[null], ['string'], 1, 'test'],
		)
	})
})

describe('boolean', () => {
	beforeAll(silenceConsole)

	it('z.boolean()', () => {
		const schema = z.object({
			prop: z.boolean(),
		})
		const { prop } = makeProps(schema)

		expectRequired(prop)
		expect(prop.type).toEqual(Boolean)
		expectValidator(prop, [true, false], [null, undefined])
	})

	it('z.boolean().nullable()', () => {
		const schema = z.object({
			prop: z.boolean().nullable(),
		})
		const { prop } = makeProps(schema)

		expectRequired(prop)
		expect(prop.type).toEqual(Boolean)
		expectValidator(prop, [true, false, null], ['true', undefined])
	})

	it('z.boolean().default()', () => {
		const schema = z.object({
			prop: z.boolean().default(true),
		})
		const { prop } = makeProps(schema)

		expectDefault(prop, true)
		expect(prop.type).toEqual(Boolean)
		expectValidator(prop, [true, false, undefined], [null])
	})

	it('z.boolean().nullable().default()', () => {
		const schema = z.object({
			prop: z.boolean().nullable().default(null),
		})
		const { prop } = makeProps(schema)

		expectDefault(prop, null)
		expect(prop.type).toEqual(Boolean)
		expectValidator(prop, [true, false, null, undefined], ['true'])
	})
})

describe('function', () => {
	beforeAll(silenceConsole)

	it('z.function()', () => {
		const schema = z.object({
			prop: z.function(),
		})
		const { prop } = makeProps(schema)

		expectRequired(prop)
		expect(prop.type).toEqual(Function)
		expectValidator(prop, [() => null, () => 'test'], [null, 'test'])
	})

	it('z.function().nullable()', () => {
		const schema = z.object({
			prop: z.function().nullable(),
		})
		const { prop } = makeProps(schema)

		expectRequired(prop)
		expect(prop.type).toEqual(Function)
		expectValidator(prop, [() => null, null, () => 'test'], ['string', false])
	})

	it('z.function().default()', () => {
		const schema = z.object({
			prop: z.function().default(() => undefined),
		})

		const { prop } = makeProps(schema)

		expectDefault(prop, undefined)
		expect(prop.type).toEqual(Function)
		expectValidator(prop, [() => undefined], ['string', null])

		/**
		 * HACK: This is actually a minor bug in zod, theoretically this
		 * should be true, however `.function().default()` doesn’t set
		 * this to optional correctly. This can be safely ignored
		 * since vue doesn’t even run the validator when passing `undefined`
		 *
		 * @see {@link https://github.com/colinhacks/zod/issues/647}
		 */
		expectValidator(prop, [], [undefined])
	})

	it('z.function().nullable().default()', () => {
		const schema = z.object({
			prop: z.function().nullable().default(null),
		})
		const { prop } = makeProps(schema)

		expectDefault(prop, null)
		expect(prop.type).toEqual(Function)
		expectValidator(prop, [() => undefined, null, undefined], ['string', true])
	})
})

describe('nativeEnum', () => {
	enum TestEnum {
		KEY_A = 'VALUE_A',
		KEY_B = 'VALUE_B',
		KEY_C = 'VALUE_C',
	}

	beforeAll(silenceConsole)

	it('z.nativeEnum()', () => {
		const schema = z.object({
			prop: z.nativeEnum(TestEnum),
		})
		const { prop } = makeProps(schema)

		expectRequired(prop)
		expect(prop.type).toEqual(String)
		expectValidator(
			prop,
			[TestEnum.KEY_A, TestEnum.KEY_B, TestEnum.KEY_C],
			['VALUE_D', 'string', false, [], null, undefined],
		)
	})

	it('z.nativeEnum().nullable()', () => {
		const schema = z.object({
			prop: z.nativeEnum(TestEnum).nullable(),
		})
		const { prop } = makeProps(schema)

		expectRequired(prop)
		expect(prop.type).toEqual(String)
		expectValidator(
			prop,
			[TestEnum.KEY_A, TestEnum.KEY_B, TestEnum.KEY_C, null],
			['VALUE_D', 'string', false, [], undefined],
		)
	})

	it('z.nativeEnum().default()', () => {
		const schema = z.object({
			prop: z.nativeEnum(TestEnum).default(() => TestEnum.KEY_A),
		})

		const { prop } = makeProps(schema)

		expectDefault(prop, TestEnum.KEY_A)
		expect(prop.type).toEqual(String)
		expectValidator(
			prop,
			[TestEnum.KEY_A, TestEnum.KEY_B, TestEnum.KEY_C, undefined],
			['VALUE_D', 'string', false, [], null],
		)
	})

	it('z.nativeEnum().nullable().default()', () => {
		const schema = z.object({
			prop: z.nativeEnum(TestEnum).nullable().default(null),
		})
		const { prop } = makeProps(schema)

		expectDefault(prop, null)
		expect(prop.type).toEqual(String)
		expectValidator(
			prop,
			[TestEnum.KEY_A, TestEnum.KEY_B, TestEnum.KEY_C, null, undefined],
			['VALUE_D', 'string', false, []],
		)
	})
})

describe('number', () => {
	beforeAll(silenceConsole)

	it('z.number()', () => {
		const schema = z.object({
			prop: z.number(),
		})
		const { prop } = makeProps(schema)

		expectRequired(prop)
		expect(prop.type).toEqual(Number)
		expectValidator(
			prop,
			[1, 0],
			[false, [], 'string', Number.NaN, null, undefined],
		)
	})

	it('z.number().nullable()', () => {
		const schema = z.object({
			prop: z.number().nullable(),
		})
		const { prop } = makeProps(schema)

		expectRequired(prop)
		expect(prop.type).toEqual(Number)
		expectValidator(
			prop,
			[1, 0, null],
			[false, [], 'string', Number.NaN, undefined],
		)
	})

	it('z.number().default()', () => {
		const schema = z.object({
			prop: z.number().default(1),
		})
		const { prop } = makeProps(schema)

		expectDefault(prop, 1)
		expect(prop.type).toEqual(Number)
		expectValidator(
			prop,
			[1, 0, undefined],
			[false, [], 'string', Number.NaN, null],
		)
	})

	it('z.number().nullable().default()', () => {
		const schema = z.object({
			prop: z.number().nullable().default(null),
		})
		const { prop } = makeProps(schema)

		expectDefault(prop, null)
		expect(prop.type).toEqual(Number)
		expectValidator(
			prop,
			[1, 0, null, undefined],
			[false, [], 'string', Number.NaN],
		)
	})
})

describe('object', () => {
	beforeAll(silenceConsole)

	it('z.object()', () => {
		const schema = z.object({
			prop: z.object({ key: z.boolean() }),
		})
		const { prop } = makeProps(schema)

		expectRequired(prop)
		expect(prop.type).toEqual(Object)
		expectValidator(
			prop,
			[{ key: true }, { key: false }],
			[{ key: null }, null, undefined, 'test'],
		)
	})

	it('z.object().nullable()', () => {
		const schema = z.object({
			prop: z.object({ key: z.boolean() }).nullable(),
		})
		const { prop } = makeProps(schema)

		expectRequired(prop)
		expect(prop.type).toEqual(Object)
		expectValidator(
			prop,
			[{ key: true }, { key: false }, null],
			[{ key: null }, undefined, 'test'],
		)
	})

	it('z.object().default()', () => {
		const schema = z.object({
			prop: z.object({ key: z.boolean() }).default(() => ({ key: true })),
		})

		const { prop } = makeProps(schema)

		expectDefault(prop, { key: true })
		expect(prop.type).toEqual(Object)
		expectValidator(
			prop,
			[{ key: true }, { key: false }, undefined],
			[{ key: null }, null, 'test'],
		)
	})

	it('z.object().nullable().default()', () => {
		const schema = z.object({
			prop: z.object({ key: z.boolean() }).nullable().default(null),
		})
		const { prop } = makeProps(schema)

		expectDefault(prop, null)
		expect(prop.type).toEqual(Object)
		expectValidator(
			prop,
			[{ key: true }, { key: false }, undefined, null],
			[{ key: null }, 'test'],
		)
	})
})

describe('union', () => {
	beforeAll(silenceConsole)

	it('z.union()', () => {
		const schema = z.object({
			prop: z.union([z.number(), z.string()]),
		})
		const { prop } = makeProps(schema)

		expectRequired(prop)
		expect(prop.type).toEqual([Number, String])
		expectValidator(
			prop,
			['string', 1, '', 0, -1],
			[false, [], null, undefined],
		)
	})

	it('z.union().nullable()', () => {
		const schema = z.object({
			prop: z.union([z.number(), z.string()]).nullable(),
		})
		const { prop } = makeProps(schema)

		expectRequired(prop)
		expect(prop.type).toEqual([Number, String])
		expectValidator(
			prop,
			['string', '', 1, 0, -1, null],
			[false, [], undefined],
		)
	})

	it('z.union().default()', () => {
		const schema = z.object({
			prop: z.union([z.number(), z.string()]).default('test'),
		})
		const { prop } = makeProps(schema)

		expectDefault(prop, 'test')
		expect(prop.type).toEqual([Number, String])
		expectValidator(
			prop,
			['string', '', 1, 0, -1, undefined],
			[false, [], null],
		)
	})

	it('z.union().nullable().default()', () => {
		const schema = z.object({
			prop: z.union([z.number(), z.string()]).nullable().default(null),
		})
		const { prop } = makeProps(schema)

		expectDefault(prop, null)
		expect(prop.type).toEqual([Number, String])
		expectValidator(
			prop,
			['string', '', 1, 0, -1, null, undefined],
			[false, []],
		)
	})
})

describe('string', () => {
	beforeAll(silenceConsole)

	it('z.string()', () => {
		const schema = z.object({
			prop: z.string(),
		})
		const { prop } = makeProps(schema)

		expectRequired(prop)
		expect(prop.type).toEqual(String)
		expectValidator(prop, ['string', ''], [false, [], 1, null, undefined])
	})

	it('z.string().nullable()', () => {
		const schema = z.object({
			prop: z.string().nullable(),
		})
		const { prop } = makeProps(schema)

		expectRequired(prop)
		expect(prop.type).toEqual(String)
		expectValidator(prop, ['string', '', null], [false, [], 1, undefined])
	})

	it('z.string().default()', () => {
		const schema = z.object({
			prop: z.string().default('test'),
		})
		const { prop } = makeProps(schema)

		expectDefault(prop, 'test')
		expect(prop.type).toEqual(String)
		expectValidator(prop, ['string', '', undefined], [false, [], 1, null])
	})

	it('z.string().nullable().default()', () => {
		const schema = z.object({
			prop: z.string().nullable().default(null),
		})
		const { prop } = makeProps(schema)

		expectDefault(prop, null)
		expect(prop.type).toEqual(String)
		expectValidator(prop, ['string', '', null, undefined], [false, [], 1])
	})
})
