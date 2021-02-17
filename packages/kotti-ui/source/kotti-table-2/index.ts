import { attachMeta, makeInstallable } from '../utilities'

import KtTable2Vue from './KtTable2.vue'

export const KtTable2 = attachMeta(makeInstallable(KtTable2Vue), {
	addedVersion: '3.0.0',
	deprecated: null,
	slots: {},
	typeScript: {
		namespace: 'Kotti.Table2',
	},
})
