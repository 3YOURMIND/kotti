import { FIELD_META_BASE_SLOTS } from '../kotti-field/meta'
import { attachMeta, makeInstallable } from '../utilities'

import KtFieldPasswordVue from './KtFieldPassword.vue'

export const KtFieldPassword = attachMeta(makeInstallable(KtFieldPasswordVue), {
	addedVersion: '2.3.0',
	deprecated: null,
	slots: FIELD_META_BASE_SLOTS,
	typeScript: {
		namespace: 'Kotti.FieldPassword',
	},
})

export * from './constants'
