import { attachMeta, makeInstallable } from '../next/utilities'

import KtDrawerVue from './KtDrawer.vue'

export const KtDrawer = attachMeta(makeInstallable(KtDrawerVue), {
	addedVersion: null,
	deprecated: null,
	slots: {
		'drawer-body': { description: null, scope: null },
		'drawer-footer': { description: null, scope: null },
		'drawer-header': { description: null, scope: null },
	},
	typeScript: null,
})
