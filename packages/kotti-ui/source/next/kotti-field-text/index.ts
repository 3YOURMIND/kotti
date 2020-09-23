import { attachMeta, makeInstallable } from '../utilities'

import KtFieldTextVue from './KtFieldText.vue'

export const KtFieldText = attachMeta(makeInstallable(KtFieldTextVue), {
	addedVersion: '2.0.0',
	deprecated: null,
	typeScript: {
		namespace: 'Kotti.FieldText',
	},
})

export * from './constants'
