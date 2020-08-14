import { makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtBanner from './KtBanner.vue'

makeInstallable(KtBanner)
export { KtBanner }
