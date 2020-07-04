import data from './data.json'
import { Yoco } from './types'

export const isYocoIcon = (value: unknown): value is Yoco.Icon =>
	typeof value === 'string' && data.yocoIcons.includes(value)
