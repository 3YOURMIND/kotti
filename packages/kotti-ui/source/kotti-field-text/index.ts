import { FIELD_META_BASE_SLOTS } from '../kotti-field/meta'
import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import { KOTTI_FIELD_TEXT_SUPPORTS } from './constants'
import KtFieldTextVue from './KtFieldText.vue'

export const KtFieldText = attachMeta(
	makeInstallable(KtFieldTextVue),
	{
		addedVersion: '2.0.0',
		deprecated: null,
		designs: {
			type: MetaDesignType.FIGMA,
			url: 'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=415%3A4',
		},
		slots: FIELD_META_BASE_SLOTS,
		typeScript: {
			namespace: 'Kotti.FieldText',
		},
	},
	{ supports: KOTTI_FIELD_TEXT_SUPPORTS },
)

export * from './constants'
