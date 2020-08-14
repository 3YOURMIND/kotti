import { makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtTheme from './KtTheme.vue'

makeInstallable(KtTheme)
export { KtTheme }
