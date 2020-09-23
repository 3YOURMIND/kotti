import { attachMeta, makeInstallable } from '../next/utilities'

import KtSteps from './KtSteps.vue'

attachMeta(makeInstallable(KtSteps), {
	addedVersion: '1.1.0',
	deprecated: null,
	typeScript: null,
})

export { KtSteps }
