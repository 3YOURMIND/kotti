import { makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtUserMenu from './KtUserMenu.vue'

makeInstallable(KtUserMenu)
export { KtUserMenu }
