import { makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtDropdownButton from './KtDropdownButton.vue'

makeInstallable(KtDropdownButton)
export { KtDropdownButton }
