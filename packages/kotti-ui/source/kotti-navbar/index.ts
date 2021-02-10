import { attachMeta, makeInstallable } from '../next/utilities'

import KtNavbarVue from './KtNavbar.vue'

export const KtNavbar = attachMeta(makeInstallable(KtNavbarVue), {
	addedVersion: '0.0.1',
	deprecated: null,
	slots: {
		'navbar-footer': { description: null, scope: null },
		'navbar-logo': { description: null, scope: null },
	},
	typeScript: null,
})
