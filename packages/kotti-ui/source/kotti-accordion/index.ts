import { attachMeta, makeInstallable } from '../next/utilities'

import KtAccordion from './KtAccordion.vue'

attachMeta(makeInstallable(KtAccordion), {
	addedVersion: null,
	deprecated: null,
	typeScript: null,
})

export { KtAccordion }
