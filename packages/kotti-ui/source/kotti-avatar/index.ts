import { attachMeta, makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtAvatar from './KtAvatar.vue'

attachMeta(makeInstallable(KtAvatar), {
	addedVersion: null,
	deprecated: null,
	typeScript: null,
})

export { KtAvatar }
