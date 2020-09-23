import { attachMeta, makeInstallable } from '../utilities'

import KtFieldVue from './KtField.vue'

export const KtField = attachMeta(makeInstallable(KtFieldVue), {
	addedVersion: '2.0.0',
	deprecated: null,
	typeScript: {
		namespace: 'Kotti.Field',
	},
})

export * from './constants'
