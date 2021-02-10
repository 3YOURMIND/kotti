import { attachMeta, makeInstallable } from '../next/utilities'

import KtBannerVue from './KtBanner.vue'

export const KtBanner = attachMeta(makeInstallable(KtBannerVue), {
	addedVersion: '0.0.1',
	deprecated: null,
	slots: {
		expand: { description: null, scope: null },
		glyph: { description: null, scope: null },
	},
	typeScript: null,
})
