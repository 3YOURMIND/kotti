import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import KtNavbarVue from './KtNavbar.vue'
import { KottiNavbar } from './types'

export const KtNavbar = attachMeta(makeInstallable(KtNavbarVue), {
	addedVersion: '0.0.1',
	deprecated: null,
	designs: {
		type: MetaDesignType.FIGMA,
		url: 'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=133%3A2569',
	},
	slots: {
		'navbar-footer': { description: null, scope: null },
		'navbar-logo': { description: null, scope: null },
	},
	typeScript: {
		namespace: 'Kotti.Navbar',
		schema: KottiNavbar.propsSchema,
	},
})
