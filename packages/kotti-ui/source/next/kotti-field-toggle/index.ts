import { makeInstallable } from '../utilities'

import KtFieldToggle from './KtFieldToggle.vue'
import KtFieldToggleGroup from './KtFieldToggleGroup.vue'

makeInstallable(KtFieldToggle)
makeInstallable(KtFieldToggleGroup)

export { KtFieldToggle, KtFieldToggleGroup }
export * from './constants'
