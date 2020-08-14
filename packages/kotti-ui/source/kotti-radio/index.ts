import { makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtRadio from './KtRadio.vue'

makeInstallable(KtRadio)
export { KtRadio }
