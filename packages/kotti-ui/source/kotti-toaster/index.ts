import { attachMeta, makeInstallable } from '../next/utilities'

import KtToasterVue from './KtToaster.vue'

export const KtToaster = attachMeta(makeInstallable(KtToasterVue), {
	addedVersion: '1.0.0',
	deprecated: null,
	typeScript: null,
})
