import type { Kotti } from '../types'
import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import KtStandardTableVue from './KtStandardTable.vue'
import KtTableVue from './KtTable.vue'
import KtColumnSelectorVue from './KtColumnSelector.vue'

import { KottiStandardTable } from './standard-table/types'
import { KottiTable } from './table/types'
import { KottiColumnSelector } from './types'

export { useKottiStandardTable } from './standard-table/hooks'
export {
	type KottiStandardTableStorage,
	LocalStorageAdapter,
	type StorageOperationContext,
} from './standard-table/storage'
export {
	createColumnContext,
	getCustomDisplay,
	getDisplay,
} from './table/column-helper'
export { useKottiTable } from './table/hooks'
export {
	getDateSorter,
	getNumericalSorter,
	getTextSorter,
	useLocalSort,
} from './table/local'

const TABLE_META: Kotti.Meta<typeof KottiTable.propsSchema> = {
	addedVersion: '8.2.0',
	deprecated: null,
	designs: {
		type: MetaDesignType.FIGMA,
		url: 'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=128%3A0',
	},
	slots: {
		actions: {
			description: 'E.g. edit/delete row actions',
			scope: {
				row: { description: 'Original row data', type: 'object' },
				rowIndex: { description: 'Position of row', type: 'integer' },
			},
		},
		empty: {
			description:
				'Alternative to emptyText prop. Shown when the Table is empty',
			scope: null,
		},
		'expanded-row': {
			description: 'Per row, allows showing more info on-demand',
			scope: {
				row: { description: 'Original row data', type: 'object' },
				rowIndex: { description: 'Position of row', type: 'integer' },
			},
		},
		loading: {
			description: 'Shown when loading',
			scope: null,
		},
	},
	typeScript: {
		namespace: 'Kotti.Table',
		schema: KottiTable.propsSchema,
	},
}

const STANDARD_META: Kotti.Meta<typeof KottiStandardTable.propsSchema> = {
	addedVersion: '7.4.0',
	deprecated: null,
	designs: {
		type: MetaDesignType.FIGMA,
		url: 'https://www.figma.com/design/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=6305-10646&node-type=canvas&t=8lzEM5nlkrh8aUMF-0',
	},
	slots: {
		'applied-filter-actions': {
			description: 'slot next to the applied filters section',
			scope: null,
		},
		'control-actions': {
			description: 'slot next to the table controls section',
			scope: null,
		},
		'header-actions': {
			description: 'slot next to the table title',
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

export const KtStandardTable = attachMeta(
	makeInstallable(KtStandardTableVue),
	STANDARD_META,
)

export const KtColumnSelector = attachMeta(
	makeInstallable(KtColumnSelectorVue),
	{
		addedVersion: '9.3.0',
		deprecated: null,
		designs: null,
		slots: {},
		typeScript: {
			namespace: 'Kotti.ColumnSelector',
			schema: KottiColumnSelector.propsSchema,
		},
	},
)
