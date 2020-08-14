import { makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtModal from './KtModal.vue'

makeInstallable(KtModal)
export { KtModal }
