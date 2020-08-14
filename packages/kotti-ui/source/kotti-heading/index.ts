import { makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtHeading from './KtHeading.vue'

makeInstallable(KtHeading)
export { KtHeading }
