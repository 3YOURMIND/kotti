import { makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtButtonGroup from './KtButtonGroup.vue'

makeInstallable(KtButtonGroup)
export { KtButtonGroup }
