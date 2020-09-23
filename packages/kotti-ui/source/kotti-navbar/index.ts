import { attachMeta, makeInstallable } from '../next/utilities'

import KtNavbarVue from './KtNavbar.vue'

export const KtNavbar = attachMeta(makeInstallable(KtNavbarVue), {
	addedVersion: '0.0.3',
	deprecated: null,
	typeScript: null,
})
