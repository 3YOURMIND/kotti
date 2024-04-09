import { FIELD_META_BASE_SLOTS } from '../kotti-field/meta'
import type { Meta } from '../types/kotti'
import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import { KOTTI_FIELD_SELECT_SUPPORTS } from './constants'
import KtFieldMultiSelectVue from './KtFieldMultiSelect.vue'
import KtFieldMultiSelectRemoteVue from './KtFieldMultiSelectRemote.vue'
import KtFieldSingleSelectVue from './KtFieldSingleSelect.vue'
import KtFieldSingleSelectRemoteVue from './KtFieldSingleSelectRemote.vue'
import {
	KottiFieldMultiSelect,
	KottiFieldMultiSelectRemote,
	KottiFieldSingleSelect,
	KottiFieldSingleSelectRemote,
} from './types'

const componentFolder = 'kotti-field-select'
const url =
	'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=428%3A3482'

const slots: Meta['slots'] = {
	...FIELD_META_BASE_SLOTS,
	option: {
		description: null,
		scope: {
			index: {
				description: 'option index (after filtering)',
				type: 'integer',
			},
			select: {
				description: 'select the current option',
				type: 'function',
			},
			option: {
				description: 'the entire option entry',
				type: 'object',
			},
		},
	},
}

export const KtFieldSingleSelect = attachMeta(
	makeInstallable(KtFieldSingleSelectVue),
	{
		addedVersion: '2.0.0',
		componentFolder,
		deprecated: null,
		designs: {
			type: MetaDesignType.FIGMA,
			url,
		},
		slots,
		typeScript: {
			namespace: 'Kotti.FieldSingleSelect',
			schema: KottiFieldSingleSelect.propsSchema,
		},
	},
	{ supports: KOTTI_FIELD_SELECT_SUPPORTS },
)

export const KtFieldSingleSelectRemote = attachMeta(
	makeInstallable(KtFieldSingleSelectRemoteVue),
	{
		addedVersion: '3.0.0',
		componentFolder,
		deprecated: null,
		designs: {
			type: MetaDesignType.FIGMA,
			url,
		},
		slots,
		typeScript: {
			namespace: 'Kotti.FieldSingleSelectRemote',
			schema: KottiFieldSingleSelectRemote.propsSchema,
		},
	},
	{ supports: KOTTI_FIELD_SELECT_SUPPORTS },
)

export const KtFieldMultiSelect = attachMeta(
	makeInstallable(KtFieldMultiSelectVue),
	{
		addedVersion: '2.0.0',
		componentFolder,
		deprecated: null,
		designs: {
			type: MetaDesignType.FIGMA,
			url,
		},
		slots,
		typeScript: {
			namespace: 'Kotti.FieldMultiSelect',
			schema: KottiFieldMultiSelect.propsSchema,
		},
	},
	{ supports: KOTTI_FIELD_SELECT_SUPPORTS },
)

export const KtFieldMultiSelectRemote = attachMeta(
	makeInstallable(KtFieldMultiSelectRemoteVue),
	{
		addedVersion: '3.0.0',
		componentFolder,
		deprecated: null,
		designs: {
			type: MetaDesignType.FIGMA,
			url,
		},
		slots,
		typeScript: {
			namespace: 'Kotti.FieldMultiSelectRemote',
			schema: KottiFieldMultiSelectRemote.propsSchema,
		},
	},
	{ supports: KOTTI_FIELD_SELECT_SUPPORTS },
)

export * from './constants'
