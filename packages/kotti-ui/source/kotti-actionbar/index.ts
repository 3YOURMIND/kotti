import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'
import { KottiActionbar } from './types'

import KtActionbarVue from './KtActionbar.vue'

export const KtActionbar = attachMeta(makeInstallable(KtActionbarVue), {
	addedVersion: '0.0.9',
	deprecated: null,
	designs: {
		type: MetaDesignType.FIGMA,
		url: 'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=133%3A2651',
	},
	slots: {
		'actionbar-body': { description: null, scope: null },
		'actionbar-footer': { description: null, scope: null },
		'actionbar-header': { description: null, scope: null },
	},
	typeScript: {
		namespace: 'Kotti.Actionbar',
		schema: KottiActionbar.propsSchema,
	},
})
