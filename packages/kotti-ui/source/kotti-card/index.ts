import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import KtCardVue from './KtCard.vue'
import { KottiCard } from './types'

export const KtCard = attachMeta(makeInstallable(KtCardVue), {
	addedVersion: '0.0.1',
	deprecated: null,
	designs: {
		type: MetaDesignType.FIGMA,
		url: 'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=95%3A127',
	},
	slots: {
		'card-body': { description: null, scope: null },
		'card-footer': { description: null, scope: null },
		'card-header': { description: null, scope: null },
	},
	typeScript: {
		namespace: 'Kotti.Card',
		schema: KottiCard.propsSchema,
	},
})
