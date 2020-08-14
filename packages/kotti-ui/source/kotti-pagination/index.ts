import { makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtPagination from './KtPagination.vue'

makeInstallable(KtPagination)
export { KtPagination }
