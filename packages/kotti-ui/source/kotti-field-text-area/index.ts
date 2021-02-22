import { FIELD_META_BASE_SLOTS } from '../kotti-field/meta'
import { attachMeta, makeInstallable } from '../utilities'

import KtFieldTextAreaVue from './KtFieldTextArea.vue'

export const KtFieldTextArea = attachMeta(makeInstallable(KtFieldTextAreaVue), {
	addedVersion: '2.0.0',
	deprecated: null,
	slots: FIELD_META_BASE_SLOTS,
	typeScript: {
		namespace: 'Kotti.FieldTextArea',
	},
})

export * from './constants'
