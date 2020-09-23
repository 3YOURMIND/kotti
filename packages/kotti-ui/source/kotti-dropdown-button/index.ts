import { attachMeta, makeInstallable } from '../next/utilities'

import KtDropdownButtonVue from './KtDropdownButton.vue'

export const KtDropdownButton = attachMeta(
	makeInstallable(KtDropdownButtonVue),
	{
		addedVersion: null,
		deprecated: null,
		typeScript: null,
	},
)
