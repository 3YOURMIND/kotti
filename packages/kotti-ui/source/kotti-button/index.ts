import { attachMeta, makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtButton from './KtButton.vue'

attachMeta(makeInstallable(KtButton), {
	addedVersion: null,
	deprecated: null,
	typeScript: null,
})

export { KtButton }
