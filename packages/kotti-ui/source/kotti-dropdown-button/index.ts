import { attachMeta, makeInstallable } from '../utilities'

import KtDropdownButtonVue from './KtDropdownButton.vue'

export const KtDropdownButton = attachMeta(
	makeInstallable(KtDropdownButtonVue),
	{
		addedVersion: null,
		deprecated: null,
		slots: {
			content: { description: null, scope: null },
			default: { description: null, scope: null },
		},
		typeScript: null,
	},
)
