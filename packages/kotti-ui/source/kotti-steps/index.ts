import { attachMeta, makeInstallable } from '../next/utilities'

import KtStepsVue from './KtSteps.vue'

export const KtSteps = attachMeta(makeInstallable(KtStepsVue), {
	addedVersion: '1.1.0',
	deprecated: null,
	slots: {
		default: { description: 'Should contain KtSteps', scope: null },
	},
	typeScript: null,
})
