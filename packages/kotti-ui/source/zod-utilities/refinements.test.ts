import { describe, expect, it } from 'vitest'
import { z } from 'zod'

import { refinementNonEmpty } from './refinements'

describe('refinementNonEmpty', () => {
	const schema = z.array(z.number()).refine(...refinementNonEmpty)

	it('works for arrays with length > 0', () => {
		expect(schema.safeParse([1])).toEqual({ data: [1], success: true })
	})

	it('rejects arrays without items', () => {
		const result = schema.safeParse([])

		expect(result).toEqual({
			error: new z.ZodError([
				{ code: 'custom', message: 'array may not be empty', path: [] },
			]),
			success: false,
		})
	})
})
