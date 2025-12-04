import { createToaster } from '@3yourmind/kotti-ui'

export const toaster = createToaster<{
	default: Record<string, never>
	error: Record<string, never>
	info: Record<string, never>
	success: Record<string, never>
	warning: Record<string, never>
}>()

export const error = toaster.withOptions({
	duration: 5_000,
	type: 'error',
})

export const info = toaster.withOptions({
	duration: 5_000,
	type: 'info',
})

export const success = toaster.withOptions({
	duration: 5_000,
	type: 'success',
})

/**
 * @knipignore
 */
export const warning = toaster.withOptions({
	duration: 5_000,
	type: 'warning',
})
