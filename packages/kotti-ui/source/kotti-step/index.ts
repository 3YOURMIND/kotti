import { attachMeta, makeInstallable } from '../utilities'

import KtStepVue from './KtStep.vue'

export const KtStep = attachMeta(makeInstallable(KtStepVue), {
	addedVersion: '1.1.0',
	deprecated: null,
	slots: {},
	typeScript: null,
})
