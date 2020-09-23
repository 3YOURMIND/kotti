import { attachMeta, makeInstallable } from '../next/utilities'

import KtBannerVue from './KtBanner.vue'

export const KtBanner = attachMeta(makeInstallable(KtBannerVue), {
	addedVersion: null,
	deprecated: null,
	typeScript: null,
})
