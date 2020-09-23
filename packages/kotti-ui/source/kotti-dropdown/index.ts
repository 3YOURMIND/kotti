import { attachMeta, makeInstallable } from '../next/utilities'

import KtDropdown from './KtDropdown.vue'

attachMeta(makeInstallable(KtDropdown), {
	addedVersion: null,
	deprecated: {
		alternatives: ['KtPopover'],
		reason: 'Replaced by KtPopover',
		version: '3.0.0',
	},
	typeScript: null,
})

export { KtDropdown }
