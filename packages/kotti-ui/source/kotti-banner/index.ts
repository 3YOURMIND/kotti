import { attachMeta, makeInstallable } from '../next/utilities'

import KtBanner from './KtBanner.vue'

attachMeta(makeInstallable(KtBanner), {
	addedVersion: null,
	deprecated: null,
	typeScript: null,
})

export { KtBanner }
