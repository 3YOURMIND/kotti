import { attachMeta, makeInstallable } from '../next/utilities'

import KtDropdownVue from './KtDropdown.vue'

export const KtDropdown = attachMeta(makeInstallable(KtDropdownVue), {
	addedVersion: null,
	deprecated: {
		alternatives: ['KtPopover'],
		reason: 'Replaced by KtPopover',
		version: '3.0.0',
	},
	typeScript: null,
})
