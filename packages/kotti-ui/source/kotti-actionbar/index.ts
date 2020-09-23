import { attachMeta, makeInstallable } from '../next/utilities'

import KtActionbarVue from './KtActionbar.vue'

export const KtActionbar = attachMeta(makeInstallable(KtActionbarVue), {
	addedVersion: '0.0.9',
	deprecated: null,
	typeScript: null,
})
