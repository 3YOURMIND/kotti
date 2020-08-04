import { VueConstructor } from 'vue/types/umd'

import { makeInstallable } from '../next/utilities'

import { TableColumnsStateMixin } from './src/mixins'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import KtTable from './src/Table.vue'
import { TableColumn as KtTableColumn } from './src/TableColumn'
import { KtTableConsumer } from './src/TableConsumer'
import { KtTableProvider } from './src/TableProvider'

makeInstallable(KtTable)
// makeInstallable(KtTableColumn)
// makeInstallable(KtTableProvider)
// makeInstallable(KtTableConsumer)

const makeInstallableUntyped = (component: any) => {
	// console.log(component.name)
	Object.assign(component, {
		install: (Vue: VueConstructor<Vue>) =>
			Vue.component(component.name, component),
	})
}

makeInstallableUntyped(KtTableColumn)
makeInstallableUntyped(KtTableConsumer)
makeInstallableUntyped(KtTableProvider)

export { KtTableColumn, KtTableProvider, KtTableConsumer }
export const KtTableColumnsStateMixin = TableColumnsStateMixin
export default KtTable
