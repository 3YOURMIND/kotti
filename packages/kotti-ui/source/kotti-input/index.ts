import { makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtInput from './KtInput.vue'

makeInstallable(KtInput)
export { KtInput }
