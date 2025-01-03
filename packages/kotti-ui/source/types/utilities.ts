/**
 * @deprecated use `makeProps` and `z.input`/`z.output` if possible
 */
export type SpecifyRequiredProps<
	PROPS extends Record<string, unknown>,
	REQUIRED_PROPS extends keyof PROPS,
> = Partial<Omit<PROPS, REQUIRED_PROPS>> & Pick<PROPS, REQUIRED_PROPS>

/**
 * Replaces any value of a Record that has `OLD_TYPE` with `NEW_TYPE`
 */
export type Nullable<T> = T | null

export type ReplaceRecordType<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	OBJECT extends Record<string, any>,
	OLD_TYPE = never,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	NEW_TYPE = any,
> = {
	[KEY in keyof OBJECT]: OBJECT[KEY] extends OLD_TYPE ? NEW_TYPE : OBJECT[KEY]
}
