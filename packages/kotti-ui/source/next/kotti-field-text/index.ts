import { FIELD_META_BASE_SLOTS } from '../kotti-field/meta'
import { attachMeta, makeInstallable } from '../utilities'

import KtFieldTextVue from './KtFieldText.vue'

export const KtFieldText = attachMeta(makeInstallable(KtFieldTextVue), {
	addedVersion: '2.0.0',
	deprecated: null,
	slots: FIELD_META_BASE_SLOTS,
	typeScript: {
		namespace: 'Kotti.FieldText',
	},
})

export * from './constants'
