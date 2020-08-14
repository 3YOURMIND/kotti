import { makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtNavbar from './KtNavbar.vue'

makeInstallable(KtNavbar)
export { KtNavbar }
