import type { Kotti } from '../types'
import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import KtStandardTableVue from './KtStandardTable.vue'
import KtTableVue from './KtTable.vue'
import { useKottiStandardTable as _useKottiStandardTable } from './standard-table/hooks'
import { KottiStandardTable } from './standard-table/types'
import { useKottiTable as _useKottiTable } from './table/hooks'
import { KottiTable } from './table/types'

const TABLE_META: Kotti.Meta = {
	addedVersion: '7.4.0',
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

const STANDARD_META: Kotti.Meta = {
	addedVersion: '7.4.0',
	deprecated: null,
	designs: {
		type: MetaDesignType.FIGMA,
		url: 'https://www.figma.com/design/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=6305-10646&node-type=canvas&t=8lzEM5nlkrh8aUMF-0',
	},
	slots: {
		'controls-actions': {
			description: 'slot next to the table controls section',
			scope: null,
		},
		'header-actions': {
			description: 'slot next to the table title',
			scope: null,
		},
		'info-actions': {
			description: 'slot next to the applied filters section',
			scope: null,
		},
		table: {
			description: 'slot to show custom content instead of the KtTable',
			scope: null,
		},
	},
	typeScript: {
		namespace: 'Kotti.StandardTable',
		schema: KottiStandardTable.propsSchema,
	},
}

export const KtTable = attachMeta(makeInstallable(KtTableVue), TABLE_META)
export const useKottiTable = _useKottiTable

export const KtStandardTable = attachMeta(
	makeInstallable(KtStandardTableVue),
	STANDARD_META,
)
export const useKottiStandardTable = _useKottiStandardTable
