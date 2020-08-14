import { makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtStep from './KtStep.vue'

makeInstallable(KtStep)
export { KtStep }
