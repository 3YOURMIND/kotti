import { attachMeta, makeInstallable } from '../next/utilities'

import KtStepVue from './KtStep.vue'

export const KtStep = attachMeta(makeInstallable(KtStepVue), {
	addedVersion: '1.1.0',
	deprecated: null,
	typeScript: null,
})
