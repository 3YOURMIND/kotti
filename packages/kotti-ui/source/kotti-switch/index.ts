import { makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtSwitch from './KtSwitch.vue'

makeInstallable(KtSwitch)
export { KtSwitch }
