import { PropOptions } from '@vue/composition-api'
import { castArray, isEqual } from 'lodash'
import { PropType } from 'vue'
import { z } from 'zod'

import { makeProps } from './make-props'
import { silenceConsole } from './test-utils/silence-console'

declare global {
	namespace jest {
		interface Matchers<R> {
			toBeRequired(): R
			toBeType(expectedPropType: PropType<unknown>): R
			toDefaultTo(defaultValue: unknown): R
			toValidate(...cases: unknown[]): R
		}
	}
}

expect.extend({
	toBeRequired(prop: PropOptions<unknown, boolean>) {
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
	toBeType(prop: PropOptions<unknown, boolean>, expected: PropType<unknown>) {
		const actualPropTypes = new Set(castArray(prop.type as PropType<unknown>))
		const expectedPropTypes = new Set(castArray(expected))

		const pass = isEqual(actualPropTypes, expectedPropTypes)

		return {
			message: () =>
				pass
					? 'valid'
					: this.utils.printDiffOrStringify(
							expectedPropTypes,
							actualPropTypes,
							'Expected prop.type',
							'Received prop.type',
							this.expand,
					  ),
			pass,
		}
	},
	toDefaultTo(prop: PropOptions<unknown, boolean>, expectedDefault: unknown) {
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
					return this.utils.printDiffOrStringify(
						expectedDefault,
						actualDefault,
						'Expected prop.default',
						'Received prop.default',
						this.expand,
					)

				if (!passNoRequired)
					return this.utils.printDiffOrStringify(
						undefined,
						prop.required,
						'Expected prop.required',
						'Received prop.required',
						this.expand,
					)

				return 'valid'
			},
			pass: passDefault && passNoRequired,
		}
	},
	toValidate(prop: PropOptions<unknown, boolean>, ...cases: unknown[]) {
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

	it('z.array(z.number())', () => {
		const schema = z.object({
			prop: z.array(z.number()),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(Array)
		expect(prop).toValidate(...ARRAY_SUCCESS)
		expect(prop).not.toValidate(...ARRAY_FAILURE, null, undefined)
	})

	it('z.array(z.number()).nullable()', () => {
		const schema = z.object({
			prop: z.array(z.number()).nullable(),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(Array)
		expect(prop).toValidate(...ARRAY_SUCCESS, null)
		expect(prop).not.toValidate(...ARRAY_FAILURE, undefined)
	})

	it('z.array(z.number()).default()', () => {
		const schema = z.object({
			prop: z.array(z.number()).default(() => []),
		})

		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo([])
		expect(prop).toBeType(Array)
		expect(prop).toValidate(...ARRAY_SUCCESS, undefined)
		expect(prop).not.toValidate(...ARRAY_FAILURE, null)
	})

	it('z.array(z.number()).nullable().default()', () => {
		const schema = z.object({
			prop: z.array(z.number()).nullable().default(null),
		})
		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo(null)
		expect(prop).toBeType(Array)
		expect(prop).toValidate(...ARRAY_SUCCESS, null, undefined)
		expect(prop).not.toValidate(...ARRAY_FAILURE)
	})
})

describe('boolean', () => {
	beforeAll(silenceConsole)

	const BOOLEAN_SUCCESS = [true, false]
	const BOOLEAN_FAILURE = ['true', 'false', 1, [], {}]

	it('z.boolean()', () => {
		const schema = z.object({
			prop: z.boolean(),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(Boolean)
		expect(prop).toValidate(...BOOLEAN_SUCCESS)
		expect(prop).not.toValidate(...BOOLEAN_FAILURE, null, undefined)
	})

	it('z.boolean().nullable()', () => {
		const schema = z.object({
			prop: z.boolean().nullable(),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(Boolean)
		expect(prop).toValidate(...BOOLEAN_SUCCESS, null)
		expect(prop).not.toValidate(...BOOLEAN_FAILURE, undefined)
	})

	it('z.boolean().default()', () => {
		const schema = z.object({
			prop: z.boolean().default(true),
		})
		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo(true)
		expect(prop).toBeType(Boolean)
		expect(prop).toValidate(...BOOLEAN_SUCCESS, undefined)
		expect(prop).not.toValidate(...BOOLEAN_FAILURE, null)
	})

	it('z.boolean().nullable().default()', () => {
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

describe('function', () => {
	beforeAll(silenceConsole)

	const FUNCTION_SUCCESS = [() => null, () => undefined, () => 'test']
	const FUNCTION_FAILURE = ['string', true]

	it('z.function()', () => {
		const schema = z.object({
			prop: z.function(),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(Function)
		expect(prop).toValidate(...FUNCTION_SUCCESS)
		expect(prop).not.toValidate(...FUNCTION_FAILURE, null, undefined)
	})

	it('z.function().nullable()', () => {
		const schema = z.object({
			prop: z.function().nullable(),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(Function)
		expect(prop).toValidate(...FUNCTION_SUCCESS, null)
		expect(prop).not.toValidate(...FUNCTION_FAILURE, undefined)
	})

	it('z.function().default()', () => {
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

	it('z.function().nullable().default()', () => {
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

describe('nativeEnum', () => {
	beforeAll(silenceConsole)

	enum TestEnum {
		KEY_A = 'VALUE_A',
		KEY_B = 'VALUE_B',
		KEY_C = 'VALUE_C',
	}

	const ENUM_SUCCESS = [TestEnum.KEY_A, TestEnum.KEY_B, TestEnum.KEY_C]
	const ENUM_FAILURE = ['VALUE_D', 'string', [], {}, false]

	it('z.nativeEnum()', () => {
		const schema = z.object({
			prop: z.nativeEnum(TestEnum),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(String)
		expect(prop).toValidate(...ENUM_SUCCESS)
		expect(prop).not.toValidate(...ENUM_FAILURE, null, undefined)
	})

	it('z.nativeEnum().nullable()', () => {
		const schema = z.object({
			prop: z.nativeEnum(TestEnum).nullable(),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(String)
		expect(prop).toValidate(...ENUM_SUCCESS, null)
		expect(prop).not.toValidate(...ENUM_FAILURE, undefined)
	})

	it('z.nativeEnum().default()', () => {
		const schema = z.object({
			prop: z.nativeEnum(TestEnum).default(() => TestEnum.KEY_A),
		})

		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo(TestEnum.KEY_A)
		expect(prop).toBeType(String)
		expect(prop).toValidate(...ENUM_SUCCESS, undefined)
		expect(prop).not.toValidate(...ENUM_FAILURE, null)
	})

	it('z.nativeEnum().nullable().default()', () => {
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

	it('z.number()', () => {
		const schema = z.object({
			prop: z.number(),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(Number)
		expect(prop).toValidate(...NUMBER_SUCCESS)
		expect(prop).not.toValidate(...NUMBER_FAILURE, null, undefined)
	})

	it('z.number().nullable()', () => {
		const schema = z.object({
			prop: z.number().nullable(),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(Number)
		expect(prop).toValidate(...NUMBER_SUCCESS, null)
		expect(prop).not.toValidate(...NUMBER_FAILURE, undefined)
	})

	it('z.number().default()', () => {
		const schema = z.object({
			prop: z.number().default(1),
		})
		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo(1)
		expect(prop).toBeType(Number)
		expect(prop).toValidate(...NUMBER_SUCCESS, undefined)
		expect(prop).not.toValidate(...NUMBER_FAILURE, null)
	})

	it('z.number().nullable().default()', () => {
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

describe('object', () => {
	beforeAll(silenceConsole)

	const OBJECT_SUCCESS = [
		{ key: true },
		{ key: false },
		{ key: true, otherKey: 'no' },
	]

	const OBJECT_FAILURE = [{ key: null }, {}, [], 'string']

	it('z.object()', () => {
		const schema = z.object({
			prop: z.object({ key: z.boolean() }),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(Object)
		expect(prop).toValidate(...OBJECT_SUCCESS)
		expect(prop).not.toValidate(...OBJECT_FAILURE, null, undefined)
	})

	it('z.object().nullable()', () => {
		const schema = z.object({
			prop: z.object({ key: z.boolean() }).nullable(),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(Object)
		expect(prop).toValidate(...OBJECT_SUCCESS, null)
		expect(prop).not.toValidate(...OBJECT_FAILURE, undefined)
	})

	it('z.object().default()', () => {
		const schema = z.object({
			prop: z.object({ key: z.boolean() }).default(() => ({ key: true })),
		})

		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo({ key: true })
		expect(prop).toBeType(Object)
		expect(prop).toValidate(...OBJECT_SUCCESS, undefined)
		expect(prop).not.toValidate(...OBJECT_FAILURE, null)
	})

	it('z.object().nullable().default()', () => {
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

const STRING_SUCCESS = ['string', '']

describe('string', () => {
	beforeAll(silenceConsole)

	const STRING_FAILURE = [[], {}, 0, 1]

	it('z.string()', () => {
		const schema = z.object({
			prop: z.string(),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(String)
		expect(prop).toValidate(...STRING_SUCCESS)
		expect(prop).not.toValidate(...STRING_FAILURE, null, undefined)
	})

	it('z.string().nullable()', () => {
		const schema = z.object({
			prop: z.string().nullable(),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType(String)
		expect(prop).toValidate(...STRING_SUCCESS, null)
		expect(prop).not.toValidate(...STRING_FAILURE, undefined)
	})

	it('z.string().default()', () => {
		const schema = z.object({
			prop: z.string().default('test'),
		})
		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo('test')
		expect(prop).toBeType(String)
		expect(prop).toValidate(...STRING_SUCCESS, undefined)
		expect(prop).not.toValidate(...STRING_FAILURE, null)
	})

	it('z.string().nullable().default()', () => {
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

describe('union', () => {
	beforeAll(silenceConsole)

	const UNION_SUCCESS = [...NUMBER_SUCCESS, ...STRING_SUCCESS]
	const UNION_FAILURE = [[], {}, true, false]

	it('z.union()', () => {
		const schema = z.object({
			prop: z.union([z.number(), z.string()]),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType([Number, String])
		expect(prop).toValidate(...UNION_SUCCESS)
		expect(prop).not.toValidate(...UNION_FAILURE, null, undefined)
	})

	it('z.union().nullable()', () => {
		const schema = z.object({
			prop: z.union([z.number(), z.string()]).nullable(),
		})
		const { prop } = makeProps(schema)

		expect(prop).toBeRequired()
		expect(prop).toBeType([Number, String])
		expect(prop).toValidate(...UNION_SUCCESS, null)
		expect(prop).not.toValidate(...UNION_FAILURE, undefined)
	})

	it('z.union().default()', () => {
		const schema = z.object({
			prop: z.union([z.number(), z.string()]).default('test'),
		})
		const { prop } = makeProps(schema)

		expect(prop).toDefaultTo('test')
		expect(prop).toBeType([Number, String])
		expect(prop).toValidate(...UNION_SUCCESS, undefined)
		expect(prop).not.toValidate(...UNION_FAILURE, null)
	})

	it('z.union().nullable().default()', () => {
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
