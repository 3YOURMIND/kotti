import type { ComputedRef } from 'vue'

export type ToastContext = ComputedRef<{
	delete: () => void
	header: string | null
	progress: number | null
	text: string
}>

export const TOAST_CONTEXT = Symbol('TOAST_CONTEXT')
