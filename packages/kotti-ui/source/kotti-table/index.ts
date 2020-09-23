import { attachMeta, makeInstallable } from '../next/utilities'
import { Kotti } from '../types'

import KtTableVue from './src/KtTable.vue'
import { TableColumnsStateMixin } from './src/mixins'
import { KtTableColumn as KtTableColumnVue } from './src/TableColumn'
import { KtTableConsumer as KtTableConsumerVue } from './src/TableConsumer'
import { KtTableProvider as KtTableProviderVue } from './src/TableProvider'

const META: Kotti.Meta = {
	addedVersion: null,
	deprecated: null,
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

export const KtTableColumnsStateMixin = TableColumnsStateMixin
