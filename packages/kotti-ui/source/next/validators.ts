import { Yoco } from '@3yourmind/yoco'

export const isYocoIcon = (value: unknown): value is Yoco.Icon =>
	typeof value === 'string' &&
	Object.values(Yoco.Icon).includes(value as Yoco.Icon)
