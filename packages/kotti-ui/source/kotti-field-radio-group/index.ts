import { FIELD_META_BASE_SLOTS } from '../kotti-field/meta'
import { attachMeta, makeInstallable } from '../utilities'

import KtFieldRadioGroupVue from './KtFieldRadioGroup.vue'

export const KtFieldRadioGroup = attachMeta(
	makeInstallable(KtFieldRadioGroupVue),
	{
		addedVersion: '2.0.0',
		deprecated: null,
		slots: FIELD_META_BASE_SLOTS,
		typeScript: {
			namespace: 'Kotti.FieldRadioGroup',
		},
	},
)

export * from './constants'
