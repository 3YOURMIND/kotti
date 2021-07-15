import { FIELD_META_BASE_SLOTS } from '../kotti-field/meta'
import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import KtFieldDateVue from './KtFieldDate.vue'
import KtFieldDateRangeVue from './KtFieldDateRange.vue'
import KtFieldDateTimeVue from './KtFieldDateTime.vue'
import KtFieldDateTimeRangeVue from './KtFieldDateTimeRange.vue'

const DESIGN_URL =
	'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=773%3A6059' as const

export const KtFieldDate = attachMeta(makeInstallable(KtFieldDateVue), {
	addedVersion: '2.0.0',
	deprecated: null,
	designs: {
		type: MetaDesignType.FIGMA,
		url: DESIGN_URL,
	},
	slots: FIELD_META_BASE_SLOTS,
	typeScript: {
		namespace: 'Kotti.FieldDate',
	},
})

export const KtFieldDateRange = attachMeta(
	makeInstallable(KtFieldDateRangeVue),
	{
		addedVersion: '2.0.0',
		deprecated: null,
		designs: {
			type: MetaDesignType.FIGMA,
			url: DESIGN_URL,
		},
		slots: FIELD_META_BASE_SLOTS,
		typeScript: {
			namespace: 'Kotti.FieldDateRange',
		},
	},
)

export const KtFieldDateTime = attachMeta(makeInstallable(KtFieldDateTimeVue), {
	addedVersion: '2.0.0',
	deprecated: null,
	designs: {
		type: MetaDesignType.FIGMA,
		url: DESIGN_URL,
	},
	slots: FIELD_META_BASE_SLOTS,
	typeScript: {
		namespace: 'Kotti.FieldDateTime',
	},
})

export const KtFieldDateTimeRange = attachMeta(
	makeInstallable(KtFieldDateTimeRangeVue),
	{
		addedVersion: '2.0.0',
		deprecated: null,
		designs: {
			type: MetaDesignType.FIGMA,
			url: DESIGN_URL,
		},
		slots: FIELD_META_BASE_SLOTS,
		typeScript: {
			namespace: 'Kotti.FieldDateTimeRange',
		},
	},
)

export * from './constants'
