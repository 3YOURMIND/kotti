import { makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtCheckbox from './KtCheckbox.vue'

makeInstallable(KtCheckbox)
export { KtCheckbox }
