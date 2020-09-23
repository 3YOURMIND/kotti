import { attachMeta, makeInstallable } from '../next/utilities'

import KtBreadcrumb from './KtBreadcrumb.vue'

attachMeta(makeInstallable(KtBreadcrumb), {
	addedVersion: '0.0.5',
	deprecated: null,
	typeScript: null,
})

export { KtBreadcrumb }
