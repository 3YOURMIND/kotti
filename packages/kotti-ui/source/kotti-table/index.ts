import type { Kotti } from '../types'
import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import { useKottiTable as _useKottiTable } from './hooks'
import KtTableVue from './KtTable.vue'
import KtStandardTableVue from './KtStandardTable.vue'
import { KottiTable, KottiStandardTable } from './types'

const KT_TABLE_META: Kotti.Meta = {
	addedVersion: '7.5.0',
	deprecated: null,
	designs: {
		type: MetaDesignType.FIGMA,
		url: 'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=128%3A0',
	},
	slots: {
		// actions: { description: 'E.g. edit/delete row actions', scope: null },
		// default: {
		// 	description:
		// 		'Could contain columns. Can be used together with columns prop...',
		// 	scope: null,
		// },
		// empty: {
		// 	description:
		// 		'Alternative to emptyText prop. Shown when the Table is empty',
		// 	scope: null,
		// },
		// expand: {
		// 	description: 'Per column, allows showing more info on-demand',
		// 	scope: {
		// 		row: { description: null, type: 'object' },
		// 		rowIndex: { description: null, type: 'integer' },
		// 	},
		// },
		// header: {
		// 	description: 'Customizes column header',
		// 	scope: {}, // FIXME: This is missing
		// },
		// loading: {
		// 	description: 'Alternative to loadingText prop. Shown when loading',
		// 	scope: null,
		// },
	},
	typeScript: {
		namespace: 'Kotti.Table',
		schema: KottiTable.propsSchema,
	},
}

const KT_STANDARD_TABLE_META: Kotti.Meta = {
	addedVersion: '7.5.0',
	deprecated: null,
	designs: {
		type: MetaDesignType.FIGMA,
		url: 'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=128%3A0',
	},
	slots: {
		// actions: { description: 'E.g. edit/delete row actions', scope: null },
		// default: {
		// 	description:
		// 		'Could contain columns. Can be used together with columns prop...',
		// 	scope: null,
		// },
		// empty: {
		// 	description:
		// 		'Alternative to emptyText prop. Shown when the Table is empty',
		// 	scope: null,
		// },
		// expand: {
		// 	description: 'Per column, allows showing more info on-demand',
		// 	scope: {
		// 		row: { description: null, type: 'object' },
		// 		rowIndex: { description: null, type: 'integer' },
		// 	},
		// },
		// header: {
		// 	description: 'Customizes column header',
		// 	scope: {}, // FIXME: This is missing
		// },
		// loading: {
		// 	description: 'Alternative to loadingText prop. Shown when loading',
		// 	scope: null,
		// },
	},
	typeScript: {
		namespace: 'Kotti.StandardTable',
		schema: KottiStandardTable.propsSchema,
	},
}

export const KtTable = attachMeta(makeInstallable(KtTableVue), KT_TABLE_META)
export const KtStandardTable = attachMeta(
	makeInstallable(KtStandardTableVue),
	KT_STANDARD_TABLE_META,
)
export const useKottiTable = _useKottiTable
