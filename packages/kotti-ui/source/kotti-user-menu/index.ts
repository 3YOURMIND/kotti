import { attachMeta, makeInstallable } from '../utilities'

import KtUserMenuVue from './KtUserMenu.vue'
import { KottiUserMenu } from './types'

export const KtUserMenu = attachMeta(makeInstallable(KtUserMenuVue), {
	addedVersion: '0.0.1',
	deprecated: null,
	designs: null,
	slots: {},
	typeScript: {
		namespace: 'Kotti.UserMenu',
		schema: KottiUserMenu.propsSchema,
	},
})
