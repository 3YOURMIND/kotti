import { attachMeta, makeInstallable } from '../utilities'

import KtDropdownVue from './KtDropdown.vue'

/**
 * @deprecated
 */
export const KtDropdown = attachMeta(makeInstallable(KtDropdownVue), {
	addedVersion: null,
	deprecated: {
		alternatives: ['KtPopover'],
		reason: 'Replaced by KtPopover',
		version: '3.0.0',
	},
	slots: {
		content: { description: null, scope: null },
		default: { description: null, scope: null },
	},
	typeScript: null,
})
