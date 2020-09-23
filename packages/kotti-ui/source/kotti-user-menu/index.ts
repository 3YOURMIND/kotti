import { attachMeta, makeInstallable } from '../next/utilities'

import KtUserMenuVue from './KtUserMenu.vue'

export const KtUserMenu = attachMeta(makeInstallable(KtUserMenuVue), {
	addedVersion: '0.0.3',
	deprecated: null,
	typeScript: null,
})
