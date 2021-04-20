import { attachMeta, makeInstallable } from '../utilities'

import KtFilterVue from './KtFilter.vue'

export const KtFilter = attachMeta(makeInstallable(KtFilterVue), {
	addedVersion: '3.0.0',
	deprecated: null,
	designs: null,
	slots: {},
	typeScript: {
		namespace: 'Kotti.Filter',
	},
})
