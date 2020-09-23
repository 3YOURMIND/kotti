import { attachMeta, makeInstallable } from '../next/utilities'

import KtButton from './KtButton.vue'

attachMeta(makeInstallable(KtButton), {
	addedVersion: null,
	deprecated: null,
	typeScript: null,
})

export { KtButton }
