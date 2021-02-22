import { attachMeta, makeInstallable } from '../utilities'

import KtToasterVue from './KtToaster.vue'

export const KtToaster = attachMeta(makeInstallable(KtToasterVue), {
	addedVersion: '1.0.0',
	deprecated: null,
	slots: {},
	typeScript: null,
})
