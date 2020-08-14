import { makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtActionbar from './KtActionbar.vue'

makeInstallable(KtActionbar)
export { KtActionbar }
