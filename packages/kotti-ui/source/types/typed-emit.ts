export type TypedEmit<EVENTS extends Record<string, unknown>> = <
	KEY extends keyof EVENTS,
>(
	key: KEY,
	payload: EVENTS[KEY],
) => void
