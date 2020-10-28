import { attachMeta, makeInstallable } from '../next/utilities'

import KtDropdownMenuVue from './KtDropdownMenu.vue'

export const KtDropdownMenu = attachMeta(makeInstallable(KtDropdownMenuVue), {
	addedVersion: null,
	deprecated: null,
	slots: {
		default: { description: null, scope: null },
	},
	typeScript: null,
})
