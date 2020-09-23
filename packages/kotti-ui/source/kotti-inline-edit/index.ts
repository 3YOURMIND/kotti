import { attachMeta, makeInstallable } from '../next/utilities'

import KtInlineEdit from './KtInlineEdit.vue'

attachMeta(makeInstallable(KtInlineEdit), {
	addedVersion: null,
	deprecated: null,
	typeScript: null,
})

export { KtInlineEdit }
