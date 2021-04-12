export type SpecifyRequiredProps<
	PROPS extends Record<string, unknown>,
	REQUIRED_PROPS extends keyof PROPS
> = Pick<PROPS, REQUIRED_PROPS> & Partial<Omit<PROPS, REQUIRED_PROPS>>
