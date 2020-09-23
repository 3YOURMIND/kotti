import { attachMeta, makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtActionbar from './KtActionbar.vue'

attachMeta(makeInstallable(KtActionbar), {
	addedVersion: '0.0.9',
	deprecated: null,
	typeScript: null,
})

export { KtActionbar }
