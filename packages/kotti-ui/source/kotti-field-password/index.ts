import { FIELD_META_BASE_SLOTS } from '../kotti-field/meta'
import { attachMeta, makeInstallable } from '../utilities'

import { KOTTI_FIELD_PASSWORD_SUPPORTS } from './constants'
import KtFieldPasswordVue from './KtFieldPassword.vue'
import { KottiFieldPassword } from './types'

export const KtFieldPassword = attachMeta(
	makeInstallable(KtFieldPasswordVue),
	{
		addedVersion: '2.3.0',
		deprecated: null,
		designs: null,
		slots: FIELD_META_BASE_SLOTS,
		typeScript: {
			namespace: 'Kotti.FieldPassword',
			schema: KottiFieldPassword.propsSchema,
		},
	},
	{ supports: KOTTI_FIELD_PASSWORD_SUPPORTS },
)

export * from './constants'
