import { attachMeta, makeInstallable } from '../next/utilities'

import KtStep from './KtStep.vue'

attachMeta(makeInstallable(KtStep), {
	addedVersion: '1.1.0',
	deprecated: null,
	typeScript: null,
})

export { KtStep }
