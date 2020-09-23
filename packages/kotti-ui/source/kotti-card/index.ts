import { attachMeta, makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtCard from './KtCard.vue'

attachMeta(makeInstallable(KtCard), {
	addedVersion: null,
	deprecated: null,
	typeScript: null,
})

export { KtCard }
