import { z } from 'zod'

/**
 * Similar to z.array().nonempty(), but doesn’t alter type definitions
 *
 * We previously had issues with `.nonempty()` causing arrays generated from
 * `Array.prototype.map` to be detected as possibly empty.
 *
 * @example
 *
 * z.array(z.number()).refine(...refinementNonEmpty)
 */
export const refinementNonEmpty: Parameters<
	z.ZodArray<z.ZodAny, 'many'>['refine']
> = [
	(array: unknown[]) => array.length > 0,
	{ message: 'array may not be empty' },
]
