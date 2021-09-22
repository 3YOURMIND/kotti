import { yocoIconSchema } from './schema'
import { Icon } from './types'

export const isYocoIcon = (value: unknown): value is Icon =>
	yocoIconSchema.safeParse(value).success
