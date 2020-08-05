import { VueConstructor } from 'vue/types/umd'

import { makeInstallable } from '../next/utilities'

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import KtTable from './src/KtTable.vue'
import { TableColumnsStateMixin } from './src/mixins'
import { KtTableColumn } from './src/TableColumn'
import { KtTableConsumer } from './src/TableConsumer'
import { KtTableProvider } from './src/TableProvider'

makeInstallable(KtTable)
// makeInstallable(KtTableColumn)
// makeInstallable(KtTableProvider)
// makeInstallable(KtTableConsumer)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makeInstallableUntyped = (component: any) =>
	Object.assign(component, {
		install: (Vue: VueConstructor<Vue>) =>
			Vue.component(component.name, component),
	})

makeInstallableUntyped(KtTableColumn)
makeInstallableUntyped(KtTableConsumer)
makeInstallableUntyped(KtTableProvider)

export { KtTable, KtTableColumn, KtTableProvider, KtTableConsumer }
export const KtTableColumnsStateMixin = TableColumnsStateMixin
