import { describe, expect, it } from 'bun:test'

import { createToaster } from './create-toaster'

describe('createToaster', () => {
	it('returns things', () => {
		const toaster = createToaster()

		expect(toaster).toEqual({
			abort: expect.anything(),
			createPusher: expect.anything(),
			push: expect.anything(),
		} as any)
	})

	it('can create a pusher', () => {
		const toaster = createToaster()
		const pusher = toaster.createPusher({ type: 'success' })
		expect(pusher).toBeFunction()
	})

	it('can push to a pusher', () => {
		const toaster = createToaster()
		const pusher = toaster.createPusher({ type: 'success' })
		expect(() => pusher({} as any)).not.toThrowError()
	})
})
