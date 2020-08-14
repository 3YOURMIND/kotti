import { makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtCard from './KtCard.vue'

makeInstallable(KtCard)
export { KtCard }
