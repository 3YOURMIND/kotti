import { makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtDrawer from './KtDrawer.vue'

makeInstallable(KtDrawer)
export { KtDrawer }
