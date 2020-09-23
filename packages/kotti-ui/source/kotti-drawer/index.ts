import { attachMeta, makeInstallable } from '../next/utilities'

import KtDrawer from './KtDrawer.vue'

attachMeta(makeInstallable(KtDrawer), {
	addedVersion: null,
	deprecated: null,
	typeScript: null,
})

export { KtDrawer }
