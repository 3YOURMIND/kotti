import { attachMeta, makeInstallable } from '../utilities'

import KtFormSubmitVue from './KtFormSubmit.vue'

export const KtFormSubmit = attachMeta(makeInstallable(KtFormSubmitVue), {
	addedVersion: '2.0.0',
	deprecated: null,
	designs: null,
	slots: {},
	typeScript: {
		namespace: 'Kotti.FormSubmit',
		schema: null,
	},
})
