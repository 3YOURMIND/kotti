import { attachMeta, makeInstallable } from '../utilities'

import KtFieldNumberVue from './KtFieldNumber.vue'

export const KtFieldNumber = attachMeta(makeInstallable(KtFieldNumberVue), {
	addedVersion: '2.0.0',
	deprecated: null,
	typeScript: {
		namespace: 'Kotti.FieldNumber',
	},
})

export * from './constants'
