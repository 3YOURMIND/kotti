import { attachMeta, makeInstallable } from '../utilities'

import KtFieldPasswordVue from './KtFieldPassword.vue'

export const KtFieldPassword = attachMeta(makeInstallable(KtFieldPasswordVue), {
	addedVersion: '2.3.0',
	deprecated: null,
	typeScript: {
		namespace: 'Kotti.FieldPassword',
	},
})

export * from './constants'
