import { attachMeta, makeInstallable } from '../utilities'

import KtThemeVue from './KtTheme.vue'

export const KtTheme = attachMeta(makeInstallable(KtThemeVue), {
	addedVersion: null,
	deprecated: {
		alternatives: [],
		reason: 'replaced by css variables',
		version: '3.0.0',
	},
	designs: null,
	slots: {
		default: { description: null, scope: null },
	},
	typeScript: null,
})
