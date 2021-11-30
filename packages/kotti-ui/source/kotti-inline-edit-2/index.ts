import { FIELD_META_BASE_SLOTS } from '../kotti-field/meta'
import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import KtFieldTextVue from './KtFieldText.vue'

export const KtFieldText = attachMeta(
	makeInstallable(KtFieldTextVue),
	{
		addedVersion: '2.8.1',
		deprecated: null,
		designs: null,
		slots: {},
		typeScript: {
			namespace: 'Kotti.FieldText',
			schema: null,
		},
	},
)

