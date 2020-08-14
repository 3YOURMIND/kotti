import { makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtAccordion from './KtAccordion.vue'

makeInstallable(KtAccordion)
export { KtAccordion }
