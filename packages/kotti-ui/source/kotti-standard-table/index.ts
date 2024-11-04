import type { Kotti } from '../types'
import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import { useKottiStandardTable as _useKottiStandardTable } from './hooks'
import KtStandardTableVue from './KtStandardTable.vue'
import { KottiStandardTable } from './types'

const META: Kotti.Meta = {
	addedVersion: '9.0.0',
	deprecated: null,
	designs: {
		type: MetaDesignType.FIGMA,
		url: 'https://www.figma.com/design/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=6305-10646&node-type=canvas&t=8lzEM5nlkrh8aUMF-0',
	},
	slots: {
		buttons: { description: 'slot next to table actions', scope: null },
		'header-action': { description: 'slot next to title', scope: null },
		'switch-buttons': {
			description: 'slot next to applied filters',
			scope: null,
		},
	},
	typeScript: {
		namespace: 'Kotti.StandardTable',
		schema: KottiStandardTable.propsSchema,
	},
}

export const KtStandardTable = attachMeta(
	makeInstallable(KtStandardTableVue),
	META,
)
export const useKottiStandardTable = _useKottiStandardTable
