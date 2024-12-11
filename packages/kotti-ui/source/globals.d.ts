import type { z } from 'zod'

import '@tanstack/table-core'

declare global {
	interface Window {
		/**
		 * Can be passed from [`makeProps`](./make-props.ts) in case of an error, so that developers can
		 * inspect the failing schema in the brower console
		 */
		lastZodSchema?: z.ZodTypeAny
	}
}

declare module '@tanstack/table-core' {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface ColumnMeta<T_DATA extends RowData, T_VALUE> {
		cellClasses: Record<string, boolean> | string
		disableCellClick: boolean
		headerClasses: Record<string, boolean> | string
		style?: Record<string, string>
	}
}
