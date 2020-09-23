import { attachMeta, makeInstallable } from '../next/utilities'

import KtAccordionVue from './KtAccordion.vue'

export const KtAccordion = attachMeta(makeInstallable(KtAccordionVue), {
	addedVersion: null,
	deprecated: null,
	typeScript: null,
})
