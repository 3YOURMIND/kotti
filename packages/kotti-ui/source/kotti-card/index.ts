import { attachMeta, makeInstallable } from '../next/utilities'

import KtCardVue from './KtCard.vue'

export const KtCard = attachMeta(makeInstallable(KtCardVue), {
	addedVersion: null,
	deprecated: null,
	slots: {
		'card-body': { description: null, scope: null },
		'card-footer': { description: null, scope: null },
		'card-header': { description: null, scope: null },
	},
	typeScript: null,
})
