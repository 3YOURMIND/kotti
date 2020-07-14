import { TableColumnsStateMixin } from './src/mixins'
import KtTable from './src/Table.vue'
import KtTableColumn from './src/TableColumn'
import KtTableConsumer from './src/TableConsumer'
import KtTableProvider from './src/TableProvider'

KtTable.install = function(Vue) {
	Vue.component(KtTable.name, KtTable)
	Vue.component(KtTableColumn.name, KtTableColumn)
	Vue.component(KtTableProvider.name, KtTableProvider)
	Vue.component(KtTableConsumer.name, KtTableConsumer)
}

export { KtTableColumn, KtTableProvider, KtTableConsumer }
export const KtTableColumnsStateMixin = TableColumnsStateMixin
export default KtTable
