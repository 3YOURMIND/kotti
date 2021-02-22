import { attachMeta, makeInstallable } from '../utilities'

import KtAccordionVue from './KtAccordion.vue'

export const KtAccordion = attachMeta(makeInstallable(KtAccordionVue), {
	addedVersion: null,
	deprecated: null,
	slots: {
		default: { description: null, scope: null },
		title: { description: null, scope: null },
	},
	typeScript: null,
})
