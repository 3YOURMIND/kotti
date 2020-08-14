import { makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtLine from './KtLine.vue'

makeInstallable(KtLine)
export { KtLine }
