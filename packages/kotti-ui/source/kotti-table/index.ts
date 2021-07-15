import { Kotti } from '../types'
import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import KtTableVue from './KtTable.vue'
import { KtTableColumn as KtTableColumnVue } from './KtTableColumn'
import { KtTableConsumer as KtTableConsumerVue } from './KtTableConsumer'
import { KtTableProvider as KtTableProviderVue } from './KtTableProvider'

const META: Kotti.Meta = {
	addedVersion: '0.0.1',
	deprecated: null,
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
	typeScript: null,
}

export const KtTable = attachMeta(makeInstallable(KtTableVue), META)
export const KtTableColumn = attachMeta(makeInstallable(KtTableColumnVue), META)
export const KtTableProvider = attachMeta(
	makeInstallable(KtTableProviderVue),
	META,
)
export const KtTableConsumer = attachMeta(
	makeInstallable(KtTableConsumerVue),
	META,
)
