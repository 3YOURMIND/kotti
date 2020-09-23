import { attachMeta, makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtLine from './KtLine.vue'

attachMeta(makeInstallable(KtLine), {
	addedVersion: '1.0.1',
	deprecated: null,
	typeScript: null,
})

export { KtLine }
