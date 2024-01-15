import deepmerge from 'deepmerge'

import { DeepPartial } from './types'

/**
 * deepmerge types do not support the DeepPartial type
 * although deepmerge supports the behavior
 * This helper function works-around that issue
 */
export const fixDeepMerge = <T extends Record<string, unknown>>(
	x: DeepPartial<T>,
	y: DeepPartial<T>,
	// @ts-expect-error deepmerge's parameters are typed with Partial<T>,
	// which is not compatible with DeepPartial<T>
): T => deepmerge<T>(x, y)
