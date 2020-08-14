import { makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtBreadcrumb from './KtBreadcrumb.vue'

makeInstallable(KtBreadcrumb)
export { KtBreadcrumb }
