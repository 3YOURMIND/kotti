import { attachMeta, makeInstallable } from '../next/utilities'

import KtButtonGroupVue from './KtButtonGroup.vue'

export const KtButtonGroup = attachMeta(makeInstallable(KtButtonGroupVue), {
	addedVersion: null,
	deprecated: null,
	typeScript: null,
})
