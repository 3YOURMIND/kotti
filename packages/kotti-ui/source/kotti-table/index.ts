import { attachMeta, makeInstallable } from '../next/utilities'
import { Kotti } from '../types'

import KtTable from './src/KtTable.vue'
import { TableColumnsStateMixin } from './src/mixins'
import { KtTableColumn } from './src/TableColumn'
import { KtTableConsumer } from './src/TableConsumer'
import { KtTableProvider } from './src/TableProvider'

const META: Kotti.Meta = {
	addedVersion: null,
	deprecated: null,
	typeScript: null,
}

attachMeta(makeInstallable(KtTable), META)
attachMeta(makeInstallable(KtTableColumn), META)
attachMeta(makeInstallable(KtTableProvider), META)
attachMeta(makeInstallable(KtTableConsumer), META)

export { KtTable, KtTableColumn, KtTableProvider, KtTableConsumer }
export const KtTableColumnsStateMixin = TableColumnsStateMixin
