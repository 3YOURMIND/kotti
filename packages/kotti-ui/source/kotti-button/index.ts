import { attachMeta, makeInstallable } from '../next/utilities'

import KtButtonVue from './KtButton.vue'

export const KtButton = attachMeta(makeInstallable(KtButtonVue), {
	addedVersion: null,
	deprecated: null,
	typeScript: null,
})
