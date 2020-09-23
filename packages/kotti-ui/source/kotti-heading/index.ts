import { attachMeta, makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtHeading from './KtHeading.vue'

attachMeta(makeInstallable(KtHeading), {
	addedVersion: null,
	deprecated: null,
	typeScript: null,
})

export { KtHeading }
