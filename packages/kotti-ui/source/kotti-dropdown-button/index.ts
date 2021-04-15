import { attachMeta, makeInstallable } from '../utilities'

import KtDropdownButtonVue from './KtDropdownButton.vue'

export const KtDropdownButton = attachMeta(
	makeInstallable(KtDropdownButtonVue),
	{
		addedVersion: null,
		deprecated: {
			alternatives: ['KtPopover'],
			reason: 'Replaced by KtPopover options',
			version: '3.0.0',
		},
		designs: null,
		slots: {
			content: { description: null, scope: null },
			default: { description: null, scope: null },
		},
		typeScript: null,
	},
)
