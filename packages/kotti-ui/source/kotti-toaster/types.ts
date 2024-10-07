import { z } from 'zod'
import { toasterReturnSchema } from './create-toaster'

export const schema = z.object({
	toaster: toasterReturnSchema,
})
