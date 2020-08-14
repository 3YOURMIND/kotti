import { makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtInputNumber from './KtInputNumber.vue'

makeInstallable(KtInputNumber)
export { KtInputNumber }
