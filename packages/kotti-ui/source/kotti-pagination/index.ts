import { attachMeta, makeInstallable } from '../next/utilities'

import KtPagination from './KtPagination.vue'

attachMeta(makeInstallable(KtPagination), {
	addedVersion: '0.0.6',
	deprecated: null,
	typeScript: null,
})

export { KtPagination }
