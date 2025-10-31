import { createToaster } from '@3yourmind/kotti-ui'

export const toaster = createToaster<{
	default: Record<string, never>
	error: Record<string, never>
	info: Record<string, never>
	success: Record<string, never>
	warning: Record<string, never>
}>()

// /**
//  * HACK: Types don't get correctly inferred in vue2/nuxt2 version of the documentation
//  * This should be removed in vue3
//  */
// type ToasterAPIHack = (params: {
// 	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 	custom?: any
// 	duration?: number
// 	header?: string
// 	text: string
// }) => Record<string, unknown>

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
