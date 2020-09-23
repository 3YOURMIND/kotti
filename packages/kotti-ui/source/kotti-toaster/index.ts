import { attachMeta, makeInstallable } from '../next/utilities'

import KtToaster from './KtToaster.vue'

attachMeta(makeInstallable(KtToaster), {
	addedVersion: '1.0.0',
	deprecated: null,
	typeScript: null,
})

export { KtToaster }
