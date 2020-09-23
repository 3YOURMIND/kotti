import { attachMeta, makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtNavbar from './KtNavbar.vue'

attachMeta(makeInstallable(KtNavbar), {
	addedVersion: '0.0.3',
	deprecated: null,
	typeScript: null,
})

export { KtNavbar }
