import { z } from 'zod'

import { refinementNonEmpty } from './zod-refinements'

describe('refinementNonEmpty', () => {
	const schema = z.array(z.number()).refine(...refinementNonEmpty)

	it('works for arrays with length > 0', () => {
		expect(schema.safeParse([1])).toEqual({ data: [1], success: true })
	})

	it('rejects arrays without items', () => {
		const result = schema.safeParse([])

		expect(result.success).toBe(false)

		// type hint
		if ('error' in result)
			expect(result.error.errors).toEqual([
				{ code: 'custom', message: 'array may not be empty', path: [] },
			])
		else throw new Error('result.error doesn’t exist')
	})
})
