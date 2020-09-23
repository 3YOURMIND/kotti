import { attachMeta, makeInstallable } from '../next/utilities'

import KtHeadingVue from './KtHeading.vue'

export const KtHeading = attachMeta(makeInstallable(KtHeadingVue), {
	addedVersion: null,
	deprecated: null,
	typeScript: null,
})
