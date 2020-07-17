import { makeInstallable } from '../utilities'

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import KtFieldToggle from './KtFieldToggle.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import KtFieldToggleGroup from './KtFieldToggleGroup.vue'

makeInstallable(KtFieldToggle)
makeInstallable(KtFieldToggleGroup)

export { KtFieldToggle, KtFieldToggleGroup }
export * from './constants'
