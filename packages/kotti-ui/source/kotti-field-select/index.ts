import { FIELD_META_BASE_SLOTS } from '../kotti-field/meta'
import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import { KOTTI_FIELD_SELECT_SUPPORTS } from './constants'
import KtFieldMultiSelectVue from './KtFieldMultiSelect.vue'
import KtFieldSingleSelectVue from './KtFieldSingleSelect.vue'
import KtFieldSingleSelectRemoteVue from './KtFieldSingleSelectRemote.vue'

const url =
	'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=428%3A3482'

export const KtFieldSingleSelect = attachMeta(
	makeInstallable(KtFieldSingleSelectVue),
	{
		addedVersion: '2.0.0',
		deprecated: null,
		designs: {
			type: MetaDesignType.FIGMA,
			url,
		},
		slots: FIELD_META_BASE_SLOTS,
		typeScript: {
			namespace: 'Kotti.KtFieldSingleSelect',
		},
	},
	{ supports: KOTTI_FIELD_SELECT_SUPPORTS },
)

export const KtFieldSingleSelectRemote = attachMeta(
	makeInstallable(KtFieldSingleSelectRemoteVue),
	{
		addedVersion: '3.0.0',
		deprecated: null,
		designs: {
			type: MetaDesignType.FIGMA,
			url,
		},
		slots: FIELD_META_BASE_SLOTS,
		typeScript: {
			namespace: 'Kotti.KtFieldMultiSelectRemote',
		},
	},
	{ supports: KOTTI_FIELD_SELECT_SUPPORTS },
)

export const KtFieldMultiSelect = attachMeta(
	makeInstallable(KtFieldMultiSelectVue),
	{
		addedVersion: '2.0.0',
		deprecated: null,
		designs: {
			type: MetaDesignType.FIGMA,
			url,
		},
		slots: FIELD_META_BASE_SLOTS,
		typeScript: {
			namespace: 'Kotti.KtFieldMultiSelect',
		},
	},
	{ supports: KOTTI_FIELD_SELECT_SUPPORTS },
)

export * from './constants'
