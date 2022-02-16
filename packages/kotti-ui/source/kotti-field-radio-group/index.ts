import { FIELD_META_BASE_SLOTS } from '../kotti-field/meta'
import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import { KOTTI_FIELD_RADIO_GROUP_SUPPORTS } from './constants'
import KtFieldRadioGroupVue from './KtFieldRadioGroup.vue'
import { KottiFieldRadioGroup } from './types'

export const KtFieldRadioGroup = attachMeta(
	makeInstallable(KtFieldRadioGroupVue),
	{
		addedVersion: '2.0.0',
		deprecated: null,
		designs: {
			type: MetaDesignType.FIGMA,
			url: 'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=436%3A242',
		},
		slots: FIELD_META_BASE_SLOTS,
		typeScript: {
			namespace: 'Kotti.FieldRadioGroup',
			schema: KottiFieldRadioGroup.propsSchema,
		},
	},
	{ supports: KOTTI_FIELD_RADIO_GROUP_SUPPORTS },
)

export * from './constants'
