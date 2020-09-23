import { attachMeta, makeInstallable } from '../next/utilities'

import KtLineVue from './KtLine.vue'

export const KtLine = attachMeta(makeInstallable(KtLineVue), {
	addedVersion: '1.0.1',
	deprecated: null,
	typeScript: null,
})
