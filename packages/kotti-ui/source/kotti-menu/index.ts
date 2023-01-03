import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import KtAccordionVue from './KtAccordion.vue'
import { KottiMenu } from './types'

export const KtAccordion = attachMeta(makeInstallable(KtAccordionVue), {
	addedVersion: '3.0.0-beta.35',
	deprecated: null,
	designs: {
		type: MetaDesignType.FIGMA,
		url: 'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=3447%3A7707&t=uaBJNxABxFv0HCBa-0',
	},
	slots: {},
	typeScript: {
		namespace: 'Kotti.Menu',
		schema: KottiMenu.propsSchema,
	},
})
