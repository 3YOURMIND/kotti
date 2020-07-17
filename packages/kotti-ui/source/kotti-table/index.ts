import { makeInstallable } from '../next/utilities'

import { TableColumnsStateMixin } from './src/mixins'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import KtTable from './src/Table.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import KtTableColumn from './src/TableColumn'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import KtTableConsumer from './src/TableConsumer'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import KtTableProvider from './src/TableProvider'

makeInstallable(KtTable)
makeInstallable(KtTableColumn)
makeInstallable(KtTableProvider)
makeInstallable(KtTableConsumer)

export { KtTableColumn, KtTableProvider, KtTableConsumer }
export const KtTableColumnsStateMixin = TableColumnsStateMixin
export default KtTable
