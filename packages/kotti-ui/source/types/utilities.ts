/**
 * @deprecated use `makeProps` and `z.input`/`z.output` if possible
 */
export type SpecifyRequiredProps<
	PROPS extends Record<string, unknown>,
	REQUIRED_PROPS extends keyof PROPS,
> = Pick<PROPS, REQUIRED_PROPS> & Partial<Omit<PROPS, REQUIRED_PROPS>>

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Replaces any value of a Record that has `OLD_TYPE` with `NEW_TYPE`
 */
export type ReplaceRecordType<
	OBJECT extends Record<string, any>,
	OLD_TYPE = never,
	NEW_TYPE = any,
> = {
	[KEY in keyof OBJECT]: OBJECT[KEY] extends OLD_TYPE ? NEW_TYPE : OBJECT[KEY]
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export type Nullable<T> = T | null
