import { attachMeta, makeInstallable } from '../next/utilities'

import KtButtonVue from './KtButton.vue'

export const KtButton = attachMeta(makeInstallable(KtButtonVue), {
	addedVersion: '0.0.1',
	deprecated: null,
	slots: {
		default: {
			description: 'Used to replace label with custom HTML',
			scope: null,
		},
	},
	typeScript: null,
})
