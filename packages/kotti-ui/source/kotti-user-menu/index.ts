import { attachMeta, makeInstallable } from '../next/utilities'

import KtUserMenuVue from './KtUserMenu.vue'

export const KtUserMenu = attachMeta(makeInstallable(KtUserMenuVue), {
	addedVersion: '0.0.1',
	deprecated: null,
	slots: {},
	typeScript: null,
})
