import { createToaster } from '@3yourmind/kotti-ui'

export const toaster = createToaster()

export const success = toaster.withOptions({ duration: 5_000, type: 'success' })
export const error = toaster.withOptions({ duration: 5_000, type: 'error' })
