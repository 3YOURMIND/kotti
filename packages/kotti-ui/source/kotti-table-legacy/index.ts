import type { Kotti } from '../types'
import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import KtTableLegacyVue from './KtTableLegacy.vue'
import { KtTableLegacyColumn as KtTableLegacyColumnVue } from './KtTableLegacyColumn'
import { KtTableLegacyConsumer as KtTableLegacyConsumerVue } from './KtTableLegacyConsumer'
import { KtTableLegacyProvider as KtTableLegacyProviderVue } from './KtTableLegacyProvider'

const META: Kotti.Meta = {
	addedVersion: '0.0.1',
	deprecated: {
		alternatives: ['KtTable', 'KtStandardTable'],
		reason:
			'Will be replaced by the new implementation of KtTable with Kotti@9.0.0',
		version: '8.0.0',
	},
	designs: {
		type: MetaDesignType.FIGMA,
		url: 'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=128%3A0',
	},
	slots: {
		actions: { description: 'E.g. edit/delete row actions', scope: null },
		default: {
			description:
				'Could contain columns. Can be used together with columns prop...',
			scope: null,
		},
		empty: {
			description:
				'Alternative to emptyText prop. Shown when the Table is empty',
			scope: null,
		},
		expand: {
			description: 'Per column, allows showing more info on-demand',
			scope: {
				row: { description: null, type: 'object' },
				rowIndex: { description: null, type: 'integer' },
			},
		},
		header: {
			description: 'Customizes column header',
			scope: {}, // FIXME: This is missing
		},
		loading: {
			description: 'Alternative to loadingText prop. Shown when loading',
			scope: null,
		},
	},
	typeScript: {
		namespace: 'Kotti.TableLegacy',
		schema: null,
	},
}

export const KtTableLegacy = attachMeta(makeInstallable(KtTableLegacyVue), META)
export const KtTableLegacyColumn = attachMeta(
	makeInstallable(KtTableLegacyColumnVue),
	META,
)
export const KtTableLegacyProvider = attachMeta(
	makeInstallable(KtTableLegacyProviderVue),
	META,
)
export const KtTableLegacyConsumer = attachMeta(
	makeInstallable(KtTableLegacyConsumerVue),
	META,
)
