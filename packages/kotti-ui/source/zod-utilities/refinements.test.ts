import { describe, expect, it } from 'vitest'
import { z } from 'zod'

import { refinementNonEmpty } from './refinements'

describe('refinementNonEmpty', () => {
	const schema = z.array(z.number()).refine(...refinementNonEmpty)

	it('works for arrays with length > 0', () => {
		expect(schema.safeParse([1])).toEqual({ data: [1], success: true })
	})

	it('rejects arrays without items', () => {
		const result = schema.safeParse([]) as z.SafeParseError<number[]>

		expect(result.success).toEqual(false)
		expect(result.error.issues).toEqual([
			{ code: 'custom', message: 'array may not be empty', path: [] },
		])
	})
})
