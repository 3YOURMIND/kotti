import { PropOptions, PropType } from '@vue/composition-api'
import { cloneDeep } from 'lodash'
import { z } from 'zod'

const DEBUG_MAKE_PROPS = false as const // enable to print debug log
const DEBUG_WALK_SHAPE = false as const // enable to print debug log

const propValidator = <SCHEMA extends z.ZodTypeAny>(
	schema: SCHEMA,
	key: string,
) => {
	const validator = (value: unknown) => {
		const result = schema.safeParse(value)

		if (result.success) return true

		/* eslint-disable no-console */
		console.group(`propValidator found issues with prop “${key}”`)

		// HACK: 'error' in result is necessary as `ts-jest` doesn’t see that result.success was already properly checked to be falsy and that error now exists
		if ('error' in result) console.error(result.error)

		if (Array.isArray(value)) console.table(cloneDeep(value))
		else console.log(cloneDeep(value))

		console.trace()

		console.groupEnd()
		/* eslint-enable no-console */

		return false
	}

	// assign name for better debugging and to improve props rendering in the documentation
	Object.defineProperty(validator, 'name', {
		value: `propValidator('${key}')`,
		writable: false,
	})

	return validator
}

// eslint-disable-next-line sonarjs/cognitive-complexity
const walkShape = <SHAPE extends z.ZodTypeAny>(shape: SHAPE): Set<string> => {
	/* eslint-disable no-console */
	const types = new Set<string>()

	let shapePointer = shape

	while (shapePointer) {
		const { typeName } = shapePointer._def

		if (DEBUG_WALK_SHAPE)
			console.log(
				`walkTypes: found typeName “${typeName}” (${typeof typeName})`,
			)

		if (typeName === 'ZodUnion') {
			if (DEBUG_WALK_SHAPE) console.group('walkTypes: walking union')

			const options = shapePointer._def.options as Array<z.ZodTypeAny>

			// walk every option in the enum and merge result sets into types
			for (const typeSet of options.map((x) => walkShape(x)))
				for (const type of typeSet) types.add(type)

			if (DEBUG_WALK_SHAPE) console.groupEnd()
		} else {
			if (DEBUG_WALK_SHAPE) console.log(`walkTypes: pushing “${typeName}”`)
			types.add(typeName)
		}

		shapePointer = shapePointer._def.innerType
	}

	return types
	/* eslint-enable no-console */
}

type MapValueType<T> = T extends Map<unknown, infer V> ? V : never

const ignoredZodTypes = new Set(['ZodDefault', 'ZodNullable', 'ZodOptional'])
const zodToVueTypes = new Map<
	string,
	Exclude<PropType<unknown>, Array<unknown>>
>([
	['ZodArray', Array],
	['ZodBoolean', Boolean],
	['ZodFunction', Function],
	['ZodNativeEnum', String], // educated guess
	['ZodNumber', Number],
	['ZodObject', Object],
	['ZodString', String],
])

/* eslint-disable no-console */
/**
 * Easily validate vue props, improve error messages drastically
 *
 * This augments/replaces Vue’s props entirely, including the need to add prop.validator
 * by using zod and therefore actually prints errors to the console that can help developers
 * rather than just say "hey you failed the validator, good luck!" as vue would do by default.
 *
 * @example
 * props: makeProps(KottiUserMenu.propsSchema)
 */
export const makeProps = <SCHEMA extends z.ZodObject<z.ZodRawShape>>(
	schema: SCHEMA,
) =>
	Object.fromEntries(
		Object.entries(schema.shape).map(([key, shape]) => {
			if (DEBUG_MAKE_PROPS) console.log(`makeProp: generating “${key}”`)

			const zodTypeSet = walkShape(shape)

			/**
			 * WORKAROUND: Usually, one should probably call shape.isOptional()
			 *
			 * However, this currently doesn’t seem to work with z.function().default()
			 * and this also internally just calls safeParse on the object — evaluating
			 * the default function, which wastes performance AND could cause
			 * unintended side-effects
			 */
			const isOptional =
				zodTypeSet.has('ZodDefault') || zodTypeSet.has('ZodOptional')

			const prop: PropOptions<unknown, boolean> = {
				validator: propValidator(shape, key),
			}

			if (isOptional) prop.default = shape._def.defaultValue
			else prop.required = true

			const propType = [...zodTypeSet]
				.filter((x) => !ignoredZodTypes.has(x))
				.map((zodTypeName) => {
					if (DEBUG_MAKE_PROPS)
						console.log(
							`makeProps: found type ${zodTypeName} (${typeof zodTypeName})`,
						)

					if (!zodToVueTypes.has(zodTypeName))
						throw new Error(`makeProps: unknown zod type “${zodTypeName}”`)

					return zodToVueTypes.get(zodTypeName) as MapValueType<
						typeof zodToVueTypes
					>
				})

			prop.type = propType.length === 1 ? propType[0] : propType

			return [key, prop]
		}),
	)
/* eslint-enable no-console */
