import { attachMeta, makeInstallable } from '../utilities'

import KtThemeVue from './KtTheme.vue'

export const KtTheme = attachMeta(makeInstallable(KtThemeVue), {
	addedVersion: null,
	deprecated: null,
	designs: null,
	slots: {
		default: { description: null, scope: null },
	},
	typeScript: null,
})
