import { makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtSteps from './KtSteps.vue'

makeInstallable(KtSteps)
export { KtSteps }
