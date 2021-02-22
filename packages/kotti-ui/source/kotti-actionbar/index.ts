import { attachMeta, makeInstallable } from '../utilities'

import KtActionbarVue from './KtActionbar.vue'

export const KtActionbar = attachMeta(makeInstallable(KtActionbarVue), {
	addedVersion: '0.0.9',
	deprecated: null,
	slots: {
		'actionbar-body': { description: null, scope: null },
		'actionbar-footer': { description: null, scope: null },
		'actionbar-header': { description: null, scope: null },
	},
	typeScript: null,
})
