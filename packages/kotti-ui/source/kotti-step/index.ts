import { attachMeta, makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtStep from './KtStep.vue'

attachMeta(makeInstallable(KtStep), {
	addedVersion: '1.1.0',
	deprecated: null,
	typeScript: null,
})

export { KtStep }
