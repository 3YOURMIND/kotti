import type { Kotti } from '../types'
import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import KtTableVue from './KtTable.vue'
import { KottiTable } from './table/types'

export {
	createColumnContext,
	getCustomDisplay,
	getDisplay,
} from './table/column-helper'
export { useKottiTable } from './table/hooks'
export { getNumericalSorter, getTextSorter, useLocalSort } from './table/local'

const TABLE_META: Kotti.Meta = {
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

export const KtTable = attachMeta(makeInstallable(KtTableVue), TABLE_META)
