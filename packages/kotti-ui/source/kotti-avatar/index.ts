import { attachMeta, makeInstallable } from '../next/utilities'

import KtAvatar from './KtAvatar.vue'

attachMeta(makeInstallable(KtAvatar), {
	addedVersion: null,
	deprecated: null,
	typeScript: null,
})

export { KtAvatar }
