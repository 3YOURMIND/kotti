import deepmerge from 'deepmerge'

import { DeepPartial } from './types'

/**
 * deepmerge types do not support the DeepPartial type
 * although deepmerge supports the behavior
 * This helper function works-around that issue
 */
export const fixDeepMerge = <T extends object>(
	x: DeepPartial<T>,
	y: DeepPartial<T>,
): T => deepmerge<T>(x, y)
