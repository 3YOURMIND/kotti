import { makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtToaster from './KtToaster.vue'

makeInstallable(KtToaster)
export { KtToaster }
