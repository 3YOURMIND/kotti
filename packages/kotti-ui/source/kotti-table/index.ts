import { makeInstallable } from '../next/utilities'

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import KtTable from './src/KtTable.vue'
import { TableColumnsStateMixin } from './src/mixins'
import { KtTableColumn } from './src/TableColumn'
import { KtTableConsumer } from './src/TableConsumer'
import { KtTableProvider } from './src/TableProvider'

makeInstallable(KtTable)
makeInstallable(KtTableColumn)
makeInstallable(KtTableProvider)
makeInstallable(KtTableConsumer)

export { KtTable, KtTableColumn, KtTableProvider, KtTableConsumer }
export const KtTableColumnsStateMixin = TableColumnsStateMixin
