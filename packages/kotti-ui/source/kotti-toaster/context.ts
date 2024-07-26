import { ComputedRef } from 'vue'

export type ContextData = ComputedRef<{
	delete: () => void
	progress: number | null
	text: string
}>

export const TOAST_CONTEXT = Symbol('TOAST_CONTEXT')
