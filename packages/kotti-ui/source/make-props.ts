import { PropOptions, PropType } from '@vue/composition-api'
import { cloneDeep } from 'lodash'
import { z } from 'zod'

const DEBUG_MAKE_PROPS = false as const // enable to print debug log
const DEBUG_WALK_SCHEMA_TYPES = false as const // enable to print debug log

/**
 * This type is not exported directly by @vue/composition-api
 */
type VuePropConstructor = Exclude<PropType<unknown>, Array<unknown>>

const setUnion = <T extends unknown>(...sets: Set<T>[]): Set<T> => {
	const result = new Set<T>()
	for (const set of sets) for (const item of set) result.add(item)
	return result
}

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

/**
 * Collects all unique types used in the top level of a Zod schema
 */
const walkSchemaTypes = <SCHEMA extends z.ZodTypeAny>(
	schema: SCHEMA,
): Set<z.ZodFirstPartyTypeKind> => {
	/* eslint-disable no-console */
	const typeName = schema._def.typeName as z.ZodFirstPartyTypeKind

	if (DEBUG_WALK_SCHEMA_TYPES)
		console.log(`walkSchemaTypes: found “ZodFirstPartyTypeKind.${typeName}”`)

	switch (typeName) {
		case z.ZodFirstPartyTypeKind.ZodUnion: {
			const { options } = schema._def as z.ZodUnionDef

			if (DEBUG_WALK_SCHEMA_TYPES)
				console.group('walkSchemaTypes: walking union')

			// walk every option in the union and merge results
			const result = setUnion(...options.map((x) => walkSchemaTypes(x)))

			if (DEBUG_WALK_SCHEMA_TYPES) console.groupEnd()

			return result
		}

		// e.g. z.refine()
		case z.ZodFirstPartyTypeKind.ZodEffects: {
			const def = schema._def as z.ZodEffectsDef

			if (DEBUG_WALK_SCHEMA_TYPES)
				console.log(
					`walkSchemaTypes: walking schema of “ZodFirstPartyTypeKind.ZodEffects”`,
				)

			return walkSchemaTypes(def.schema)
		}

		case z.ZodFirstPartyTypeKind.ZodDefault:
		case z.ZodFirstPartyTypeKind.ZodNullable:
		case z.ZodFirstPartyTypeKind.ZodOptional: {
			const { innerType } = schema._def as
				| z.ZodDefaultDef
				| z.ZodNullableDef
				| z.ZodOptionalDef

			if (DEBUG_WALK_SCHEMA_TYPES)
				console.log(
					`walkSchemaTypes: walking innerType of “ZodFirstPartyTypeKind.${typeName}”`,
				)

			return setUnion(
				new Set<z.ZodFirstPartyTypeKind>([typeName]),
				walkSchemaTypes(innerType),
			)
		}

		case z.ZodFirstPartyTypeKind.ZodArray:
		case z.ZodFirstPartyTypeKind.ZodBoolean:
		case z.ZodFirstPartyTypeKind.ZodDate:
		case z.ZodFirstPartyTypeKind.ZodFunction:
		case z.ZodFirstPartyTypeKind.ZodLiteral:
		case z.ZodFirstPartyTypeKind.ZodNativeEnum:
		case z.ZodFirstPartyTypeKind.ZodNumber:
		case z.ZodFirstPartyTypeKind.ZodObject:
		case z.ZodFirstPartyTypeKind.ZodString: {
			if (DEBUG_WALK_SCHEMA_TYPES)
				console.log(
					`walkSchemaTypes: adding “ZodFirstPartyTypeKind.${typeName}”`,
				)

			return new Set([typeName])
		}

		default: {
			throw new Error(
				`walkSchemaTypes: encountered unknown “ZodFirstPartyTypeKind.${typeName}”`,
			)
		}
	}
	/* eslint-enable no-console */
}

/**
 * These types do not influence the generation of Vue’s `propName.type` Arrays and are therefore discarded
 */
const ignoredZodTypes = new Set([
	z.ZodFirstPartyTypeKind.ZodDefault,
	z.ZodFirstPartyTypeKind.ZodNullable,
	z.ZodFirstPartyTypeKind.ZodOptional,
])

/**
 * This maps the internal zod name of a type to the the constructor that Vue expects in `propName.type`
 */
const zodToVueType = new Map<z.ZodFirstPartyTypeKind, VuePropConstructor>([
	[z.ZodFirstPartyTypeKind.ZodArray, Array],
	[z.ZodFirstPartyTypeKind.ZodBoolean, Boolean],
	[z.ZodFirstPartyTypeKind.ZodDate, Date],
	[z.ZodFirstPartyTypeKind.ZodFunction, Function],
	[z.ZodFirstPartyTypeKind.ZodLiteral, String], // educated guess, can be fixed if the need for non-string literals arises
	[z.ZodFirstPartyTypeKind.ZodNativeEnum, String], // educated guess, can be fixed if the need for non-string enums arises
	[z.ZodFirstPartyTypeKind.ZodNumber, Number],
	[z.ZodFirstPartyTypeKind.ZodObject, Object],
	[z.ZodFirstPartyTypeKind.ZodString, String],
])

/**
 * @summary Easily define & validate vue props, improve error messages drastically
 *
 * @description
 * This augments/replaces Vue’s props entirely, including the need to add prop.validator
 * by using zod and therefore actually prints errors to the console that can help developers
 * rather than the non-distinct vue-warn message about a validator failing for a component.
 *
 * ## Known limitations:
 *
 * 1. Deeply defined defaults are only applied when manually `schema.safeParse`-ing the data (only top-level defaults are possible to transform to Vue)
 * 2. This function automatically types the return types of props using `as PropType<>`
 *    (which, in turn, should make annotating of Vue props unnecessary). However, `PropType<>` appears
 *    to be bugged, as tested in `@vue-composition/api@(0.6.1|1.1.5)`
 *    For example, `KtBreadcrumb`’s props get inferred to be `any`.
 *    So, unfortunately, this may only help in the future, once the Vue team fixes this
 * 3. `z.safeParse()` fails for type: `z.function()` if we specify the default, without explicitly chaining
 *    `optional()` on the function type. (See {@link https://github.com/colinhacks/zod/issues/647})
 *    However, it is inconsequential for Vue prop validation, as Vue doesn’t execute the `validator` if the prop is not passed/undefined.
 *
 * @example
 * // KtUserMenu.vue
 * export default defineComponent<KottiUserMenu.PropsInternal>({
 *   name: 'KtUserMenu',
 *   props: makeProps(KottiUserMenu.propsSchema)
 * })
 *
 * // types.ts
 * export namespace KottiUserMenu {
 *   export const propsSchema = z.object({
 *     // ...
 *   })
 *   type Props = z.input<typeof propsSchema>
 *   type PropsInternal = z.output<typeof propsSchema>
 * }
 */
export const makeProps = <PROPS_SCHEMA extends z.ZodObject<z.ZodRawShape>>(
	propsSchema: PROPS_SCHEMA,
): {
	[PROP_NAME in keyof PROPS_SCHEMA['shape']]: Omit<
		PropOptions,
		'required' | 'type'
	> & {
		required: z.input<PROPS_SCHEMA>[PROP_NAME] extends undefined ? false : true
		type: PropType<z.output<PROPS_SCHEMA>[PROP_NAME]>
	}
} =>
	Object.fromEntries(
		Object.entries(propsSchema.shape).map(([propName, propSchema]) => {
			/* eslint-disable no-console */
			if (DEBUG_MAKE_PROPS) console.log(`makeProp: generating “${propName}”`)

			const propDefinition: PropOptions<unknown, boolean> = {
				validator: propValidator(propSchema, propName),
			}

			const zodTypeSet = walkSchemaTypes(propSchema)

			/**
			 * WORKAROUND: Usually, one should probably call shape.isOptional()
			 *
			 * However, this currently doesn’t seem to work with z.function().default()
			 * and this also internally just calls safeParse on the object — evaluating
			 * the default function, which wastes performance AND could cause
			 * unintended side-effects
			 */
			const isOptional =
				zodTypeSet.has(z.ZodFirstPartyTypeKind.ZodDefault) ||
				zodTypeSet.has(z.ZodFirstPartyTypeKind.ZodOptional)

			if (isOptional) propDefinition.default = propSchema._def.defaultValue
			else propDefinition.required = true

			const vuePropTypes = [...zodTypeSet]
				.filter((x) => !ignoredZodTypes.has(x))
				.map((zodTypeName) => {
					if (DEBUG_MAKE_PROPS)
						console.log(
							`makeProps: found “ZodFirstPartyTypeKind.${zodTypeName}”`,
						)

					if (!zodToVueType.has(zodTypeName))
						throw new Error(
							`makeProps: unknown “ZodFirstPartyTypeKind.${zodTypeName}”`,
						)

					return zodToVueType.get(zodTypeName) as VuePropConstructor
				})

			if (vuePropTypes.length === 0)
				throw new Error(
					`makeProps: Could not determine vue prop.type for prop ${propName}`,
				)

			propDefinition.type =
				vuePropTypes.length === 1 ? vuePropTypes[0] : vuePropTypes

			return [propName, propDefinition]
			/* eslint-enable no-console */
		}),
	) as {
		[KEY in keyof PROPS_SCHEMA['shape']]: Omit<
			PropOptions,
			'required' | 'type'
		> & {
			required: z.input<PROPS_SCHEMA>[KEY] extends undefined ? false : true
			type: PropType<z.output<PROPS_SCHEMA>[KEY]>
		}
	}
