import { makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtDropdown from './KtDropdown.vue'

makeInstallable(KtDropdown)
export { KtDropdown }
