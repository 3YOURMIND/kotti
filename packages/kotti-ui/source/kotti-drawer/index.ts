import { attachMeta, makeInstallable } from '../utilities'

import KtDrawerVue from './KtDrawer.vue'
import { KottiDrawer } from './types'

export const KtDrawer = attachMeta(makeInstallable(KtDrawerVue), {
	addedVersion: '0.0.1',
	deprecated: null,
	designs: null,
	slots: {
		'drawer-body': { description: null, scope: null },
		'drawer-footer': { description: null, scope: null },
		'drawer-header': { description: null, scope: null },
	},
	typeScript: {
		namespace: 'Kotti.Drawer',
		schema: KottiDrawer.propsSchema,
	},
})
