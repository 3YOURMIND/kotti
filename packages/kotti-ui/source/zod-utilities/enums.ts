import { z } from 'zod'

type EnumLike = {
	[k: string]: string
}

type OneOrMore<T> = [T, ...T[]]

/**
 * returns enum and the union of enum members
 * https://stackoverflow.com/a/77528920
 */
export type EnumToPrimitiveUnion<T extends EnumLike> =
	T extends Record<string, infer V extends string> ? `${V}` : never

/**
 * Function that takes in an enum,
 * and creates a union of zod.enum and zod.nativeEnum
 *
 * To allow usage of string props rather than enum members on component props.
 * e.g. to allow `'danger'` instead of `SomeEnum.DANGER`, if needed.
 */
export function createLooseZodEnumSchema<E extends EnumLike>(
	someEnum: E,
): z.ZodUnion<
	[z.ZodEnum<OneOrMore<EnumToPrimitiveUnion<E>>>, z.ZodNativeEnum<E>]
> {
	const enumValues = Object.values(someEnum) as OneOrMore<
		EnumToPrimitiveUnion<E>
	>

	return z.union([z.enum(enumValues), z.nativeEnum(someEnum)])
}
