import { Yoco } from '../types'

import data from './data.json'

export const isYocoIcon = (value: unknown): value is Yoco.Icon =>
	typeof value === 'string' && data.yocoIcons.includes(value)
