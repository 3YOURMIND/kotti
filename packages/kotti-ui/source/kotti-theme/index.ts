import { attachMeta, makeInstallable } from '../next/utilities'

import KtThemeVue from './KtTheme.vue'

export const KtTheme = attachMeta(makeInstallable(KtThemeVue), {
	addedVersion: null,
	deprecated: null,
	typeScript: null,
})
