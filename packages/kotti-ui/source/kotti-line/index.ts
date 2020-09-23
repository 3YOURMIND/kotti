import { attachMeta, makeInstallable } from '../next/utilities'

import KtLine from './KtLine.vue'

attachMeta(makeInstallable(KtLine), {
	addedVersion: '1.0.1',
	deprecated: null,
	typeScript: null,
})

export { KtLine }
