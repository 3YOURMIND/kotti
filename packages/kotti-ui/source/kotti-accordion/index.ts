import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import KtAccordionVue from './KtAccordion.vue'
import { KottiAccordion } from './types'

export const KtAccordion = attachMeta(makeInstallable(KtAccordionVue), {
	addedVersion: null,
	deprecated: null,
	designs: {
		type: MetaDesignType.FIGMA,
		url: 'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=173%3A2598',
	},
	slots: {
		default: { description: null, scope: null },
		title: { description: null, scope: null },
	},
	typeScript: {
		namespace: 'Kotti.Accordion',
		schema: KottiAccordion.propsSchema,
	},
})
