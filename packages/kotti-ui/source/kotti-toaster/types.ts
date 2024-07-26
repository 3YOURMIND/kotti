import { z } from 'zod'

export const schema = z.object({
	toaster: z.object({
		_internal_pls_dont_touch: z.object({}).passthrough(),
		abort: z.function(),
		show: z.function(),
		withOptions: z.function(),
	}),
})
