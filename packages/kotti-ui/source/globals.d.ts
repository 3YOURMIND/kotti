import type { z } from 'zod'

declare global {
	interface Window {
		/**
		 * Can be passed from [`makeProps`](./make-props.ts) in case of an error, so that developers can
		 * inspect the failing schema in the brower console
		 */
		lastZodSchema?: z.ZodTypeAny
	}
}
