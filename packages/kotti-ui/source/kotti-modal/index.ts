import { attachMeta, makeInstallable } from '../next/utilities'

import KtModalVue from './KtModal.vue'

export const KtModal = attachMeta(makeInstallable(KtModalVue), {
	addedVersion: null,
	deprecated: null,
	typeScript: null,
})
