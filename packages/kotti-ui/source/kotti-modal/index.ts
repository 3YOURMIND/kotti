import { attachMeta, makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtModal from './KtModal.vue'

attachMeta(makeInstallable(KtModal), {
	addedVersion: null,
	deprecated: null,
	typeScript: null,
})

export { KtModal }
