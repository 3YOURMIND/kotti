import { FIELD_META_BASE_SLOTS } from '../kotti-field/meta'
import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import { KOTTI_FIELD_NUMBER_SUPPORTS } from './constants'
import KtFieldNumberVue from './KtFieldNumber.vue'
import { KottiFieldNumber } from './types'

export const KtFieldNumber = attachMeta(
	makeInstallable(KtFieldNumberVue),
	{
		addedVersion: '2.0.0',
		deprecated: null,
		designs: {
			type: MetaDesignType.FIGMA,
			url: 'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=850%3A468',
		},
		slots: FIELD_META_BASE_SLOTS,
		typeScript: {
			namespace: 'Kotti.FieldNumber',
			schema: KottiFieldNumber.propsSchema,
		},
	},
	{ supports: KOTTI_FIELD_NUMBER_SUPPORTS },
)

export * from './constants'
