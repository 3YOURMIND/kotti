import { attachMeta, makeInstallable } from '../utilities'

import KtFieldTextAreaVue from './KtFieldTextArea.vue'

export const KtFieldTextArea = attachMeta(makeInstallable(KtFieldTextAreaVue), {
	addedVersion: '2.0.0',
	deprecated: null,
	typeScript: {
		namespace: 'Kotti.FieldTextArea',
	},
})

export * from './constants'
