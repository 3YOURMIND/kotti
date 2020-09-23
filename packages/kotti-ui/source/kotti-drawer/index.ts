import { attachMeta, makeInstallable } from '../next/utilities'

import KtDrawerVue from './KtDrawer.vue'

export const KtDrawer = attachMeta(makeInstallable(KtDrawerVue), {
	addedVersion: null,
	deprecated: null,
	typeScript: null,
})
