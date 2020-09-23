import { attachMeta, makeInstallable } from '../next/utilities'

import KtCard from './KtCard.vue'

attachMeta(makeInstallable(KtCard), {
	addedVersion: null,
	deprecated: null,
	typeScript: null,
})

export { KtCard }
