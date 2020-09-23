import { attachMeta, makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtUserMenu from './KtUserMenu.vue'

attachMeta(makeInstallable(KtUserMenu), {
	addedVersion: '0.0.3',
	deprecated: null,
	typeScript: null,
})

export { KtUserMenu }
