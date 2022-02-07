import { FIELD_META_BASE_SLOTS } from '../kotti-field/meta'
import { attachMeta, makeInstallable } from '../utilities'

import { KOTTI_FIELD_CURRENCY_SUPPORTS } from './constants'
import KtFieldCurrencyVue from './KtFieldCurrency.vue'
import { KottiFieldCurrency } from './types'

export const KtFieldCurrency = attachMeta(
	makeInstallable(KtFieldCurrencyVue),
	{
		addedVersion: '3.0.0-beta.17',
		deprecated: null,
		designs: null,
		slots: FIELD_META_BASE_SLOTS,
		typeScript: {
			namespace: 'Kotti.FieldCurrency',
			schema: KottiFieldCurrency.propsSchema,
		},
	},
	{ supports: KOTTI_FIELD_CURRENCY_SUPPORTS },
)

export * as KottiFieldCurrencyConstants from './constants'
