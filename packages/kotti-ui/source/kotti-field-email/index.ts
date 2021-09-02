import { FIELD_META_BASE_SLOTS } from '../kotti-field/meta'
import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import { KOTTI_FIELD_EMAIL_SUPPORTS } from './constants'
import KtFieldEmailVue from './KtFieldEmail.vue'

export const KtFieldEmail = attachMeta(
	makeInstallable(KtFieldEmailVue),
	{
		addedVersion: '2.0.0',
		deprecated: null,
		designs: {
			type: MetaDesignType.FIGMA,
			url: 'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=415%3A4',
		},
		slots: FIELD_META_BASE_SLOTS,
		typeScript: {
			namespace: 'Kotti.FieldEmail',
		},
	},
	{ supports: KOTTI_FIELD_EMAIL_SUPPORTS },
)

export * from './constants'
