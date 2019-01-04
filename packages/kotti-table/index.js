import KtTable from './src/Table'
import KtTableColumn from './src/TableColumn'
import KtTableProvider from './src/TableProvider'
import { TableColumnsStateMixin } from './src/mixins'

KtTable.install = function(Vue) {
	Vue.component(KtTable.name, KtTable)
	Vue.component(KtTableColumn.name, KtTableColumn)
	Vue.component(KtTableProvider.name, KtTableProvider)
}

export { KtTableColumn, KtTableProvider }
export const KtTableColumnsStateMixin = TableColumnsStateMixin
export default KtTable
