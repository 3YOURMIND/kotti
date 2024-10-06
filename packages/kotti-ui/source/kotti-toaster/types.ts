import { z } from 'zod'
import { toasterReturnSchema } from './create-toaster'

export const schema = z.object({
	shownToasts: z.number().int().positive().finite().min(1).default(3),
	toaster: toasterReturnSchema,
})
