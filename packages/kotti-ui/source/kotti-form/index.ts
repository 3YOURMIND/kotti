import { attachMeta, makeInstallable } from '../utilities'

import KtFormVue from './KtForm.vue'

export const KtForm = attachMeta(makeInstallable(KtFormVue), {
	addedVersion: '2.0.0',
	deprecated: null,
	designs: null,
	slots: {
		default: {
			description: null,
			scope: null,
		},
	},
	typeScript: {
		namespace: 'Kotti.Form',
	},
})

export * from './constants'
