import { attachMeta, makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtBanner from './KtBanner.vue'

attachMeta(makeInstallable(KtBanner), {
	addedVersion: null,
	deprecated: null,
	typeScript: null,
})

export { KtBanner }
