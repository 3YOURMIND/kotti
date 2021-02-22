import { FIELD_META_BASE_SLOTS } from '../kotti-field/meta'
import { attachMeta, makeInstallable } from '../utilities'

import KtFieldNumberVue from './KtFieldNumber.vue'

export const KtFieldNumber = attachMeta(makeInstallable(KtFieldNumberVue), {
	addedVersion: '2.0.0',
	deprecated: null,
	slots: FIELD_META_BASE_SLOTS,
	typeScript: {
		namespace: 'Kotti.FieldNumber',
	},
})

export * from './constants'
