import { attachMeta, makeInstallable } from '../next/utilities'

import KtCardVue from './KtCard.vue'

export const KtCard = attachMeta(makeInstallable(KtCardVue), {
	addedVersion: null,
	deprecated: null,
	typeScript: null,
})
