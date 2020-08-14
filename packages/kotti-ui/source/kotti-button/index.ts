import { makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtButton from './KtButton.vue'

makeInstallable(KtButton)
export { KtButton }
