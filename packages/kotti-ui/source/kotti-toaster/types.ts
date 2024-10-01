import { z } from 'zod'

export const schema = z.object({
	toaster: z
		.object({
			tbd: z.boolean(),
		})
		.strict(),
})
