import castArray from 'lodash/castArray'
import isEqual from 'lodash/isEqual'
import { expect, describe, it, beforeAll } from 'vitest'
import { PropOptions, PropType } from 'vue'
import { z } from 'zod'

import { makeProps } from './make-props'
import { silenceConsole } from './test-utils/silence-console'
import { refinementNonEmpty } from './zod-utilities/refinements'

interface CustomMatchers<R = unknown> {
	toBeRequired(): R
	toBeType(expectedPropType: PropType<unknown>): R
	toDefaultTo(defaultValue: unknown): R
	toValidate(...cases: unknown[]): R
}

declare module 'vitest' {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	interface Assertion<T = any> extends CustomMatchers<T> {}
	interface AsymmetricMatchersContaining extends CustomMatchers {}
}

expect.extend({
	toBeRequired(prop: PropOptions<unknown>) {
		const passNoDefault = prop.default === undefined
		const passRequired = prop.required === true

		return {
			message: () => {
				if (!passNoDefault)
					return `Expected “prop.default” to be “undefined”. Was “${prop.default}”`
				if (!passRequired)
					return `Expected “prop.required” to be “true”. Was “${prop.required}”`
				return 'valid'
			},
			pass: passNoDefault && passRequired,
		}
	},
	toBeType(prop: PropOptions<unknown>, expected: PropType<unknown>) {
		const actualPropTypes = new Set(castArray(prop.type as PropType<unknown>))
		const expectedPropTypes = new Set(castArray(expected))

		const pass = isEqual(actualPropTypes, expectedPropTypes)

		return {
			message: () =>
				pass
					? 'valid'
					: (this.utils.diff(expectedPropTypes, actualPropTypes, {
							aAnnotation: 'Expected prop.type',
							bAnnotation: 'Received prop.type',
							expand: this.expand,
						}) as string),
			pass,
		}
	},
	toDefaultTo(prop: PropOptions<unknown>, expectedDefault: unknown) {
		if (typeof prop.default !== 'function')
			return {
				message: () => 'Expected “prop.default” to be a function',
				pass: false,
			}

		const actualDefault = prop.default()
		const passDefault = isEqual(actualDefault, expectedDefault)
		const passNoRequired = prop.required === undefined

		return {
			message: () => {
				if (!passDefault)
					return this.utils.diff(expectedDefault, actualDefault, {
						aAnnotation: 'Expected prop.default',
						bAnnotation: 'Received prop.default',
						expand: this.expand,
					}) as string

				if (!passNoRequired)
					return this.utils.diff(undefined, prop.required, {
						aAnnotation: 'Expected prop.required',
						bAnnotation: 'Received prop.required',
						expand: this.expand,
					}) as string

				return 'valid'
			},
			pass: passDefault && passNoRequired,
		}
	},
	toValidate(prop: PropOptions<unknown>, ...cases: unknown[]) {
		const { validator } = prop

		if (validator === undefined)
			return {
				message: () => 'Expected prop.validator to exist',
				pass: false,
			}

		const successfulCases = cases.filter((c) => validator(c))
		const failedCases = cases.filter((c) => !validator(c))

		const wrongCases = this.isNot ? successfulCases : failedCases

		const pass = wrongCases.length === 0

		return {
			message: () => {
				if (pass) return 'valid'

				const list = wrongCases
					.map((x) => `“${JSON.stringify(x)}” (${typeof x})`)
					.join(', ')

				return `Expected ${list} to be ${
					this.isNot ? 'invalid' : 'valid'
				} values for the validator`
			},
			pass: this.isNot ? !pass : pass, // negate as jest expects pass: false for isNot
		}
	},
})

describe('array', () => {
	beforeAll(silenceConsole)

	const ARRAY_SUCCESS = [[], [0], [1], [13, 8, 5, 3, 2, 1]]
	const ARRAY_FAILURE = [{}, true, false, 'string', [true], [{}], ['string']]

	it('generates vue prop for schema “z.array(z.number())”', () => {
		const schema = z.object({
			prop: z.array(z.number()),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(Array)
		expect(prop).toValidate(...ARRAY_SUCCESS)
		expect(prop).not.toValidate(...ARRAY_FAILURE, null, undefined)
	})

	it('generates vue prop for schema “z.array(z.number()).nullable()”', () => {
		const schema = z.object({
			prop: z.array(z.number()).nullable(),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(Array)
		expect(prop).toValidate(...ARRAY_SUCCESS, null)
		expect(prop).not.toValidate(...ARRAY_FAILURE, undefined)
	})

	it('generates vue prop for schema “z.array(z.number()).default()”', () => {
		const schema = z.object({
			prop: z.array(z.number()).default(() => []),
		})

		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo([])
		expect(prop).toBeType(Array)
		expect(prop).toValidate(...ARRAY_SUCCESS, undefined)
		expect(prop).not.toValidate(...ARRAY_FAILURE, null)
	})

	it('generates vue prop for schema “z.array(z.number()).nullable().default()”', () => {
		const schema = z.object({
			prop: z.array(z.number()).nullable().default(null),
		})
		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo(null)
		expect(prop).toBeType(Array)
		expect(prop).toValidate(...ARRAY_SUCCESS, null, undefined)
		expect(prop).not.toValidate(...ARRAY_FAILURE)
	})

	it('generates vue prop for schema “z.array(z.number()).nullable().default().refine(...refinementNonEmpty)”', () => {
		const schema = z.object({
			prop: z
				.array(z.number())
				.refine(...refinementNonEmpty)
				.nullable()
				.default(null),
		})
		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo(null)
		expect(prop).toBeType(Array)
		expect(prop).toValidate(
			...ARRAY_SUCCESS.filter((x) => x.length !== 0),
			null,
			undefined,
		)
		expect(prop).not.toValidate(...ARRAY_FAILURE, [])
	})
})

describe('boolean', () => {
	beforeAll(silenceConsole)

	const BOOLEAN_SUCCESS = [true, false]
	const BOOLEAN_FAILURE = ['true', 'false', 1, [], {}]

	it('generates vue prop for schema “z.boolean()”', () => {
		const schema = z.object({
			prop: z.boolean(),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(Boolean)
		expect(prop).toValidate(...BOOLEAN_SUCCESS)
		expect(prop).not.toValidate(...BOOLEAN_FAILURE, null, undefined)
	})

	it('generates vue prop for schema “z.boolean().nullable()”', () => {
		const schema = z.object({
			prop: z.boolean().nullable(),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(Boolean)
		expect(prop).toValidate(...BOOLEAN_SUCCESS, null)
		expect(prop).not.toValidate(...BOOLEAN_FAILURE, undefined)
	})

	it('generates vue prop for schema “z.boolean().default()”', () => {
		const schema = z.object({
			prop: z.boolean().default(true),
		})
		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo(true)
		expect(prop).toBeType(Boolean)
		expect(prop).toValidate(...BOOLEAN_SUCCESS, undefined)
		expect(prop).not.toValidate(...BOOLEAN_FAILURE, null)
	})

	it('generates vue prop for schema “z.boolean().nullable().default()”', () => {
		const schema = z.object({
			prop: z.boolean().nullable().default(null),
		})
		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo(null)
		expect(prop).toBeType(Boolean)
		expect(prop).toValidate(...BOOLEAN_SUCCESS, null, undefined)
		expect(prop).not.toValidate(...BOOLEAN_FAILURE)
	})
})

describe('date', () => {
	beforeAll(silenceConsole)

	const getRandomDate = () => new Date(1549312452000)

	const DATE_SUCCESS = [new Date(), getRandomDate()]
	const DATE_FAILURE = ['true', 'false', 1, [], {}, false]

	it('generates vue prop for schema “z.date()”', () => {
		const schema = z.object({
			prop: z.date(),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(Date)
		expect(prop).toValidate(...DATE_SUCCESS)
		expect(prop).not.toValidate(...DATE_FAILURE, null, undefined)
	})

	it('generates vue prop for schema “z.date().nullable()”', () => {
		const schema = z.object({
			prop: z.date().nullable(),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(Date)
		expect(prop).toValidate(...DATE_SUCCESS, null)
		expect(prop).not.toValidate(...DATE_FAILURE, undefined)
	})

	it('generates vue prop for schema “z.date().default()”', () => {
		const schema = z.object({
			prop: z.date().default(getRandomDate()),
		})
		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo(getRandomDate())
		expect(prop).toBeType(Date)
		expect(prop).toValidate(...DATE_SUCCESS, undefined)
		expect(prop).not.toValidate(...DATE_FAILURE, null)
	})

	it('generates vue prop for schema “z.date().nullable().default()”', () => {
		const schema = z.object({
			prop: z.date().nullable().default(null),
		})
		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo(null)
		expect(prop).toBeType(Date)
		expect(prop).toValidate(...DATE_SUCCESS, null, undefined)
		expect(prop).not.toValidate(...DATE_FAILURE)
	})
})

describe('enum', () => {
	beforeAll(silenceConsole)

	const enumSchema = z.enum(['VALUE_A', 'VALUE_B', 'VALUE_C'])

	const ENUM_SUCCESS = ['VALUE_A', 'VALUE_B', 'VALUE_C']
	const ENUM_FAILURE = ['VALUE_D', 'string', [], {}, false]

	it('generates vue prop for schema “z.enum()”', () => {
		const schema = z.object({
			prop: enumSchema,
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(String)
		expect(prop).toValidate(...ENUM_SUCCESS)
		expect(prop).not.toValidate(...ENUM_FAILURE, null, undefined)
	})

	it('generates vue prop for schema “z.enum().nullable()”', () => {
		const schema = z.object({
			prop: enumSchema.nullable(),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(String)
		expect(prop).toValidate(...ENUM_SUCCESS, null)
		expect(prop).not.toValidate(...ENUM_FAILURE, undefined)
	})

	it('generates vue prop for schema “z.enum().default()”', () => {
		const schema = z.object({
			prop: enumSchema.default(() => 'VALUE_A' as const),
		})

		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo('VALUE_A')
		expect(prop).toBeType(String)
		expect(prop).toValidate(...ENUM_SUCCESS, undefined)
		expect(prop).not.toValidate(...ENUM_FAILURE, null)
	})

	it('generates vue prop for schema “z.enum().nullable().default()”', () => {
		const schema = z.object({
			prop: enumSchema.nullable().default(null),
		})
		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo(null)
		expect(prop).toBeType(String)
		expect(prop).toValidate(...ENUM_SUCCESS, null, undefined)
		expect(prop).not.toValidate(...ENUM_FAILURE)
	})
})

describe('function', () => {
	beforeAll(silenceConsole)

	const FUNCTION_SUCCESS = [() => null, () => undefined, () => 'test']
	const FUNCTION_FAILURE = ['string', true]

	it('generates vue prop for schema “z.function()”', () => {
		const schema = z.object({
			prop: z.function(),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(Function)
		expect(prop).toValidate(...FUNCTION_SUCCESS)
		expect(prop).not.toValidate(...FUNCTION_FAILURE, null, undefined)
	})

	it('generates vue prop for schema “z.function().nullable()”', () => {
		const schema = z.object({
			prop: z.function().nullable(),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(Function)
		expect(prop).toValidate(...FUNCTION_SUCCESS, null)
		expect(prop).not.toValidate(...FUNCTION_FAILURE, undefined)
	})

	it('generates vue prop for schema “z.function().default()”', () => {
		const schema = z.object({
			prop: z.function().default(() => undefined),
		})

		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo(undefined)
		expect(prop).toBeType(Function)
		expect(prop).toValidate(...FUNCTION_SUCCESS) // see below
		expect(prop).not.toValidate(...FUNCTION_FAILURE, null)

		/**
		 * HACK: This is actually a minor bug in zod, theoretically this
		 * should be true, however `.function().default()` doesn’t set
		 * this to optional correctly. This can be safely ignored
		 * since vue doesn’t even run the validator when passing `undefined`
		 *
		 * @see {@link https://github.com/colinhacks/zod/issues/647}
		 */
		expect(prop).not.toValidate(undefined)
	})

	it('generates vue prop for schema “z.function().nullable().default()”', () => {
		const schema = z.object({
			prop: z.function().nullable().default(null),
		})
		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo(null)
		expect(prop).toBeType(Function)
		expect(prop).toValidate(...FUNCTION_SUCCESS, null, undefined)
		expect(prop).not.toValidate(...FUNCTION_FAILURE)
	})
})

describe('literal', () => {
	beforeAll(silenceConsole)

	const LITERAL_FAILURE = ['string', [], {}, 0, 1]
	const LITERAL_SUCCESS = ['LITERAL']

	it('generates vue prop for schema “z.literal()”', () => {
		const schema = z.object({
			prop: z.literal('LITERAL'),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(String)
		expect(prop).toValidate(...LITERAL_SUCCESS)
		expect(prop).not.toValidate(...LITERAL_FAILURE, null, undefined)
	})

	it('generates vue prop for schema “z.literal().nullable()”', () => {
		const schema = z.object({
			prop: z.literal('LITERAL').nullable(),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(String)
		expect(prop).toValidate(...LITERAL_SUCCESS, null)
		expect(prop).not.toValidate(...LITERAL_FAILURE, undefined)
	})

	it('generates vue prop for schema “z.literal().default()”', () => {
		const schema = z.object({
			prop: z.literal('LITERAL').default('LITERAL'),
		})
		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo('LITERAL')
		expect(prop).toBeType(String)
		expect(prop).toValidate(...LITERAL_SUCCESS, undefined)
		expect(prop).not.toValidate(...LITERAL_FAILURE, null)
	})

	it('generates vue prop for schema “z.literal().nullable().default()”', () => {
		const schema = z.object({
			prop: z.literal('LITERAL').nullable().default(null),
		})
		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo(null)
		expect(prop).toBeType(String)
		expect(prop).toValidate(...LITERAL_SUCCESS, null, undefined)
		expect(prop).not.toValidate(...LITERAL_FAILURE)
	})
})

describe('nativeEnum', () => {
	beforeAll(silenceConsole)

	enum TestEnum {
		KEY_A = 'VALUE_A',
		KEY_B = 'VALUE_B',
		KEY_C = 'VALUE_C',
	}

	const ENUM_SUCCESS = [TestEnum.KEY_A, TestEnum.KEY_B, TestEnum.KEY_C]
	const ENUM_FAILURE = ['VALUE_D', 'string', [], {}, false]

	it('generates vue prop for schema “z.nativeEnum()”', () => {
		const schema = z.object({
			prop: z.nativeEnum(TestEnum),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(String)
		expect(prop).toValidate(...ENUM_SUCCESS)
		expect(prop).not.toValidate(...ENUM_FAILURE, null, undefined)
	})

	it('generates vue prop for schema “z.nativeEnum().nullable()”', () => {
		const schema = z.object({
			prop: z.nativeEnum(TestEnum).nullable(),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(String)
		expect(prop).toValidate(...ENUM_SUCCESS, null)
		expect(prop).not.toValidate(...ENUM_FAILURE, undefined)
	})

	it('generates vue prop for schema “z.nativeEnum().default()”', () => {
		const schema = z.object({
			prop: z.nativeEnum(TestEnum).default(() => TestEnum.KEY_A),
		})

		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo(TestEnum.KEY_A)
		expect(prop).toBeType(String)
		expect(prop).toValidate(...ENUM_SUCCESS, undefined)
		expect(prop).not.toValidate(...ENUM_FAILURE, null)
	})

	it('generates vue prop for schema “z.nativeEnum().nullable().default()”', () => {
		const schema = z.object({
			prop: z.nativeEnum(TestEnum).nullable().default(null),
		})
		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo(null)
		expect(prop).toBeType(String)
		expect(prop).toValidate(...ENUM_SUCCESS, null, undefined)
		expect(prop).not.toValidate(...ENUM_FAILURE)
	})
})

describe('never', () => {
	beforeAll(silenceConsole)

	it('generates vue prop for schema “z.never()”', () => {
		const schema = z.object({
			prop: z.never(),
		})
		const { prop } = makeProps(schema)

		// Without specifying `default`, under the hood,
		// a default Symbol('NEVER') is generated
		expect(prop).not.toBeRequired()
		expect(prop).toBeType(Symbol)
		expect(prop).toValidate(prop.default)
		expect(prop).not.toValidate(
			Symbol('NEVER'),
			'NEVER',
			'true',
			'false',
			1,
			[],
			{},
			null,
			undefined,
		)
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect((prop.default as any)?.description).toBe('NEVER')
	})

	it('can’t specify “z.never().nullable()”', () => {
		const schema = z.object({
			prop: z.never().nullable(),
		})

		expect(() => makeProps(schema)).toThrow()
	})
})

const NUMBER_SUCCESS = [
	-1,
	0,
	1,
	1.5,
	42,
	Number.EPSILON,
	Number.MAX_SAFE_INTEGER,
	Number.MIN_SAFE_INTEGER,
	Number.MAX_VALUE,
	Number.MIN_VALUE,
	Number.POSITIVE_INFINITY, // See https://github.com/colinhacks/zod/issues/512
	Number.NEGATIVE_INFINITY, // See https://github.com/colinhacks/zod/issues/512
]

describe('number', () => {
	beforeAll(silenceConsole)

	const NUMBER_FAILURE = [{}, [], 'string', false, Number.NaN]

	it('generates vue prop for schema “z.number()”', () => {
		const schema = z.object({
			prop: z.number(),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(Number)
		expect(prop).toValidate(...NUMBER_SUCCESS)
		expect(prop).not.toValidate(...NUMBER_FAILURE, null, undefined)
	})

	it('generates vue prop for schema “z.number().nullable()”', () => {
		const schema = z.object({
			prop: z.number().nullable(),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(Number)
		expect(prop).toValidate(...NUMBER_SUCCESS, null)
		expect(prop).not.toValidate(...NUMBER_FAILURE, undefined)
	})

	it('generates vue prop for schema “z.number().default()”', () => {
		const schema = z.object({
			prop: z.number().default(1),
		})
		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo(1)
		expect(prop).toBeType(Number)
		expect(prop).toValidate(...NUMBER_SUCCESS, undefined)
		expect(prop).not.toValidate(...NUMBER_FAILURE, null)
	})

	it('generates vue prop for schema “z.number().nullable().default()”', () => {
		const schema = z.object({
			prop: z.number().nullable().default(null),
		})
		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo(null)
		expect(prop).toBeType(Number)
		expect(prop).toValidate(...NUMBER_SUCCESS, null, undefined)
		expect(prop).not.toValidate(...NUMBER_FAILURE)
	})
})

describe('number.int', () => {
	beforeAll(silenceConsole)

	const NUMBER_INT_SUCCESS = [
		-1,
		0,
		1,
		42,
		Number.MAX_SAFE_INTEGER,
		Number.MIN_SAFE_INTEGER,
	]
	const NUMBER_INT_FAILURE = [
		'string',
		[],
		{},
		1.5,
		false,
		Number.EPSILON,
		Number.NaN,
		Number.NEGATIVE_INFINITY,
		Number.POSITIVE_INFINITY,
	]

	it('generates vue prop for schema “z.number().int()”', () => {
		const schema = z.object({
			prop: z.number().int(),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(Number)
		expect(prop).toValidate(...NUMBER_INT_SUCCESS)
		expect(prop).not.toValidate(...NUMBER_INT_FAILURE, null, undefined)
	})

	it('generates vue prop for schema “z.number().int().nullable()”', () => {
		const schema = z.object({
			prop: z.number().int().nullable(),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(Number)
		expect(prop).toValidate(...NUMBER_INT_SUCCESS, null)
		expect(prop).not.toValidate(...NUMBER_INT_FAILURE, undefined)
	})

	it('generates vue prop for schema “z.number().int().default()”', () => {
		const schema = z.object({
			prop: z.number().int().default(1),
		})
		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo(1)
		expect(prop).toBeType(Number)
		expect(prop).toValidate(...NUMBER_INT_SUCCESS, undefined)
		expect(prop).not.toValidate(...NUMBER_INT_FAILURE, null)
	})

	it('generates vue prop for schema “z.number().int().nullable().default()”', () => {
		const schema = z.object({
			prop: z.number().int().nullable().default(null),
		})
		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo(null)
		expect(prop).toBeType(Number)
		expect(prop).toValidate(...NUMBER_INT_SUCCESS, null, undefined)
		expect(prop).not.toValidate(...NUMBER_INT_FAILURE)
	})
})

describe('object', () => {
	beforeAll(silenceConsole)

	const OBJECT_SUCCESS = [
		{ key: true },
		{ key: false },
		{ key: true, otherKey: 'no' },
	]

	const OBJECT_FAILURE = [{ key: null }, {}, [], 'string']

	it('generates vue prop for schema “z.object()”', () => {
		const schema = z.object({
			prop: z.object({ key: z.boolean() }),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(Object)
		expect(prop).toValidate(...OBJECT_SUCCESS)
		expect(prop).not.toValidate(...OBJECT_FAILURE, null, undefined)
	})

	it('generates vue prop for schema “z.object().nullable()”', () => {
		const schema = z.object({
			prop: z.object({ key: z.boolean() }).nullable(),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(Object)
		expect(prop).toValidate(...OBJECT_SUCCESS, null)
		expect(prop).not.toValidate(...OBJECT_FAILURE, undefined)
	})

	it('generates vue prop for schema “z.object().default()”', () => {
		const schema = z.object({
			prop: z.object({ key: z.boolean() }).default(() => ({ key: true })),
		})

		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo({ key: true })
		expect(prop).toBeType(Object)
		expect(prop).toValidate(...OBJECT_SUCCESS, undefined)
		expect(prop).not.toValidate(...OBJECT_FAILURE, null)
	})

	it('generates vue prop for schema “z.object().nullable().default()”', () => {
		const schema = z.object({
			prop: z.object({ key: z.boolean() }).nullable().default(null),
		})
		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo(null)
		expect(prop).toBeType(Object)
		expect(prop).toValidate(...OBJECT_SUCCESS, null, undefined)
		expect(prop).not.toValidate(...OBJECT_FAILURE)
	})
})

describe('record', () => {
	beforeAll(silenceConsole)

	const RECORD_SUCCESS = [
		{ key: true },
		{ key: false },
		{ key: true, otherKey: false },
	]

	const RECORD_FAILURE = [
		{ key: null },
		{ key: true, otherKey: 'string' },
		[],
		'string',
	]

	it('generates vue prop for schema “z.record()”', () => {
		const schema = z.object({
			prop: z.record(z.boolean()),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(Object)
		expect(prop).toValidate(...RECORD_SUCCESS)
		expect(prop).not.toValidate(...RECORD_FAILURE, null, undefined)
	})

	it('generates vue prop for schema “z.record().nullable()”', () => {
		const schema = z.object({
			prop: z.record(z.boolean()).nullable(),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(Object)
		expect(prop).toValidate(...RECORD_SUCCESS, null)
		expect(prop).not.toValidate(...RECORD_FAILURE, undefined)
	})

	it('generates vue prop for schema “z.record().default()”', () => {
		const schema = z.object({
			prop: z.record(z.boolean()).default(() => ({ key: true })),
		})

		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo({ key: true })
		expect(prop).toBeType(Object)
		expect(prop).toValidate(...RECORD_SUCCESS, undefined)
		expect(prop).not.toValidate(...RECORD_FAILURE, null)
	})

	it('generates vue prop for schema “z.record().nullable().default()”', () => {
		const schema = z.object({
			prop: z.record(z.boolean()).nullable().default(null),
		})
		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo(null)
		expect(prop).toBeType(Object)
		expect(prop).toValidate(...RECORD_SUCCESS, null, undefined)
		expect(prop).not.toValidate(...RECORD_FAILURE)
	})
})

const STRING_SUCCESS = ['string', '']

describe('string', () => {
	beforeAll(silenceConsole)

	const STRING_FAILURE = [[], {}, 0, 1]

	it('generates vue prop for schema “z.string()”', () => {
		const schema = z.object({
			prop: z.string(),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(String)
		expect(prop).toValidate(...STRING_SUCCESS)
		expect(prop).not.toValidate(...STRING_FAILURE, null, undefined)
	})

	it('generates vue prop for schema “z.string().nullable()”', () => {
		const schema = z.object({
			prop: z.string().nullable(),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(String)
		expect(prop).toValidate(...STRING_SUCCESS, null)
		expect(prop).not.toValidate(...STRING_FAILURE, undefined)
	})

	it('generates vue prop for schema “z.string().default()”', () => {
		const schema = z.object({
			prop: z.string().default('test'),
		})
		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo('test')
		expect(prop).toBeType(String)
		expect(prop).toValidate(...STRING_SUCCESS, undefined)
		expect(prop).not.toValidate(...STRING_FAILURE, null)
	})

	it('generates vue prop for schema “z.string().nullable().default()”', () => {
		const schema = z.object({
			prop: z.string().nullable().default(null),
		})
		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo(null)
		expect(prop).toBeType(String)
		expect(prop).toValidate(...STRING_SUCCESS, null, undefined)
		expect(prop).not.toValidate(...STRING_FAILURE)
	})
})

describe('tuple', () => {
	beforeAll(silenceConsole)

	const TUPLE_SUCCESS = [
		['a', 'b'],
		['string', 'other string'],
	]
	const TUPLE_FAILURE = [
		'string',
		[],
		['a'],
		[{}],
		[1],
		[true],
		['a', 8],
		['a', 'b', 'c'],
		{},
		false,
	]

	it('generates vue prop for schema “z.tuple()”', () => {
		const schema = z.object({
			prop: z.tuple([z.string(), z.string()]),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(Array)
		expect(prop).toValidate(...TUPLE_SUCCESS)
		expect(prop).not.toValidate(...TUPLE_FAILURE, null, undefined)
	})

	it('generates vue prop for schema “z.tuple().nullable()”', () => {
		const schema = z.object({
			prop: z.tuple([z.string(), z.string()]).nullable(),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(Array)
		expect(prop).toValidate(...TUPLE_SUCCESS, null)
		expect(prop).not.toValidate(...TUPLE_FAILURE, undefined)
	})

	it('generates vue prop for schema “z.tuple().default()”', () => {
		const schema = z.object({
			prop: z
				.tuple([z.string(), z.string()])
				.default((): [string, string] => ['a', 'b']),
		})

		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo(['a', 'b'])
		expect(prop).toBeType(Array)
		expect(prop).toValidate(...TUPLE_SUCCESS, undefined)
		expect(prop).not.toValidate(...TUPLE_FAILURE, null)
	})

	it('generates vue prop for schema “z.tuple().nullable().default()”', () => {
		const schema = z.object({
			prop: z.tuple([z.string(), z.string()]).nullable().default(null),
		})
		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo(null)
		expect(prop).toBeType(Array)
		expect(prop).toValidate(...TUPLE_SUCCESS, null, undefined)
		expect(prop).not.toValidate(...TUPLE_FAILURE)
	})
})

describe('union', () => {
	beforeAll(silenceConsole)

	const UNION_SUCCESS = [...NUMBER_SUCCESS, ...STRING_SUCCESS]
	const UNION_FAILURE = [[], {}, true, false]

	it('generates vue prop for schema “z.union()”', () => {
		const schema = z.object({
			prop: z.union([z.number(), z.string()]),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType([Number, String])
		expect(prop).toValidate(...UNION_SUCCESS)
		expect(prop).not.toValidate(...UNION_FAILURE, null, undefined)
	})

	it('generates vue prop for schema “z.union().nullable()”', () => {
		const schema = z.object({
			prop: z.union([z.number(), z.string()]).nullable(),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType([Number, String])
		expect(prop).toValidate(...UNION_SUCCESS, null)
		expect(prop).not.toValidate(...UNION_FAILURE, undefined)
	})

	it('generates vue prop for schema “z.union().default()”', () => {
		const schema = z.object({
			prop: z.union([z.number(), z.string()]).default('test'),
		})
		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo('test')
		expect(prop).toBeType([Number, String])
		expect(prop).toValidate(...UNION_SUCCESS, undefined)
		expect(prop).not.toValidate(...UNION_FAILURE, null)
	})

	it('generates vue prop for schema “z.union().nullable().default()”', () => {
		const schema = z.object({
			prop: z.union([z.number(), z.string()]).nullable().default(null),
		})
		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo(null)
		expect(prop).toBeType([Number, String])
		expect(prop).toValidate(...UNION_SUCCESS, null, undefined)
		expect(prop).not.toValidate(...UNION_FAILURE)
	})
})
