/* eslint-disable @typescript-eslint/no-unnecessary-condition -- disable as only intentionally-set DEBUG flags are being marked */
import cloneDeep from 'lodash/cloneDeep'
import uniq from 'lodash/uniq'
import type { PropOptions, PropType } from 'vue'
import type { Prop } from 'vue/types/options'
import { z } from 'zod'

const DEBUG_MAKE_PROPS = false as const // enable to print debug log
const DEBUG_WALK_SCHEMA_TYPES = false as const // enable to print debug log

const NEVER = Symbol('NEVER')

const setUnion = <T>(...sets: Set<T>[]): Set<T> => {
	const result = new Set<T>()
	for (const set of sets) {
		for (const item of set) {
			result.add(item)
		}
	}
	return result
}

const propValidator = <SCHEMA extends z.ZodTypeAny>({
	isNever,
	propName,
	propSchema,
}: {
	isNever: boolean
	propName: string
	propSchema: SCHEMA
}) => {
	const validator = (value: unknown) => {
		if (isNever && value === NEVER) return true

		try {
			const result = propSchema.safeParse(value)

			if (result.success) return true

			/* eslint-disable no-console */
			console.group(`propValidator found issues with prop “${propName}”`)

			console.error(result.error)

			const clonedValue = cloneDeep(value)
			if (Array.isArray(value)) console.table(clonedValue)
			else console.log(clonedValue)

			console.trace()

			console.groupEnd()
			/* eslint-enable no-console */

			return false
		} catch (error) {
			/* eslint-disable no-console */
			console.group(`propValidator crashed while parsing prop “${propName}”`)

			console.error(error)

			const clonedValue = cloneDeep(value)
			if (Array.isArray(value)) console.table(clonedValue)
			else console.log(clonedValue)

			console.trace()

			console.info('used zod schema (window.lastZodSchema)', propSchema)

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			;(window as any).lastZodSchema = propSchema

			console.groupEnd()
			/* eslint-enable no-console */

			return false
		}
	}

	// assign name for better debugging and to improve props rendering in the documentation
	Object.defineProperty(validator, 'name', {
		value: `propValidator('${propName}')`,
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
		case z.ZodFirstPartyTypeKind.ZodEnum:
		case z.ZodFirstPartyTypeKind.ZodFunction:
		case z.ZodFirstPartyTypeKind.ZodLiteral:
		case z.ZodFirstPartyTypeKind.ZodNativeEnum:
		case z.ZodFirstPartyTypeKind.ZodNever: // special case for abstract props
		case z.ZodFirstPartyTypeKind.ZodNumber:
		case z.ZodFirstPartyTypeKind.ZodObject:
		case z.ZodFirstPartyTypeKind.ZodRecord:
		case z.ZodFirstPartyTypeKind.ZodString:
		case z.ZodFirstPartyTypeKind.ZodTuple: {
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
const zodToVueType = new Map<z.ZodFirstPartyTypeKind, Prop<unknown>>([
	[z.ZodFirstPartyTypeKind.ZodArray, Array],
	[z.ZodFirstPartyTypeKind.ZodBoolean, Boolean],
	[z.ZodFirstPartyTypeKind.ZodDate, Date],
	[z.ZodFirstPartyTypeKind.ZodEnum, String], // educated guess, can be fixed if the need for non-string enums arises
	[z.ZodFirstPartyTypeKind.ZodFunction, Function],
	[z.ZodFirstPartyTypeKind.ZodLiteral, String], // educated guess, can be fixed if the need for non-string literals arises
	[z.ZodFirstPartyTypeKind.ZodNativeEnum, String], // educated guess, can be fixed if the need for non-string enums arises
	[z.ZodFirstPartyTypeKind.ZodNumber, Number],
	[z.ZodFirstPartyTypeKind.ZodObject, Object],
	[z.ZodFirstPartyTypeKind.ZodRecord, Object],
	[z.ZodFirstPartyTypeKind.ZodString, String],
	[z.ZodFirstPartyTypeKind.ZodTuple, Array],
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
 * 2. `z.safeParse()` fails for type: `z.function()` if we specify the default, without explicitly chaining
 *    `optional()` on the function type. (See {@link https://github.com/colinhacks/zod/issues/647})
 *    However, it is inconsequential for Vue prop validation, as Vue doesn’t execute the `validator` if the prop is not passed/undefined.
 *
 * @example
 * // KtUserMenu.vue
 * export default defineComponent({
 *   name: 'KtUserMenu',
 *   props: makeProps(KottiUserMenu.propsSchema)
 *   setup(props)
 * })
 *
 * // types.ts
 * export module KottiUserMenu {
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
		'default' | 'required' | 'type'
	> & {
		default: undefined extends z.input<PROPS_SCHEMA>[PROP_NAME]
			? () => z.output<PROPS_SCHEMA>[PROP_NAME]
			: undefined
		required: undefined extends z.input<PROPS_SCHEMA>[PROP_NAME] ? false : true
		type: PropType<z.output<PROPS_SCHEMA>[PROP_NAME]>
	}
} =>
	Object.fromEntries(
		Object.entries(propsSchema.shape).map(([propName, propSchema]) => {
			/* eslint-disable no-console */
			if (DEBUG_MAKE_PROPS) console.log(`makeProps: generating “${propName}”`)

			const zodTypeSet = walkSchemaTypes(propSchema)

			const isNever = zodTypeSet.has(z.ZodFirstPartyTypeKind.ZodNever)

			if (isNever && zodTypeSet.size > 1)
				throw new Error('makeProps: Unexpected Mixed Usage of Never')

			const propDefinition: PropOptions<unknown> = {
				validator: propValidator({
					isNever,
					propName,
					propSchema,
				}),
			}

			if (isNever) {
				// HACK: for the KtFields because we are constrained by VueTypes
				propDefinition.default = NEVER
				propDefinition.type = Symbol
			} else {
				const vuePropTypes = uniq(
					Array.from(zodTypeSet)
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

							return zodToVueType.get(zodTypeName) as Prop<unknown>
						}),
				)

				if (vuePropTypes.length === 0)
					throw new Error(
						`makeProps: Could not determine vue prop.type for prop ${propName}`,
					)

				propDefinition.type =
					vuePropTypes.length === 1 ? vuePropTypes[0] : vuePropTypes

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
			}

			return [propName, propDefinition]
			/* eslint-enable no-console */
		}),
	) as {
		[KEY in keyof PROPS_SCHEMA['shape']]: Omit<
			PropOptions,
			'default' | 'required' | 'type'
		> & {
			default: undefined extends z.input<PROPS_SCHEMA>[KEY]
				? () => z.output<PROPS_SCHEMA>[KEY]
				: undefined
			required: undefined extends z.input<PROPS_SCHEMA>[KEY] ? false : true
			type: PropType<z.output<PROPS_SCHEMA>[KEY]>
		}
	}
