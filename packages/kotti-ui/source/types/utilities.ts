/**
 * @deprecated use `makeProps` and `z.input`/`z.output` if possible
 */
export type SpecifyRequiredProps<
	PROPS extends Record<string, unknown>,
	REQUIRED_PROPS extends keyof PROPS,
> = Pick<PROPS, REQUIRED_PROPS> & Partial<Omit<PROPS, REQUIRED_PROPS>>

/**
 * Returns the type of a Map’s values
 */
export type MapValueType<MAP> = MAP extends Map<unknown, infer V> ? V : never
