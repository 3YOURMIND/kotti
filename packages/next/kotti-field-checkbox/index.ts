import { VueConstructor } from 'vue/types/umd'

import KtFieldCheckbox from './KtFieldCheckbox.vue'
import KtFieldCheckboxGroup from './KtFieldCheckboxGroup.vue'

const makeInstallable = (component: VueConstructor<Vue>) =>
	Object.assign(component, {
		install: (Vue) => Vue.component(component.name, component),
	} as Vue.PluginObject<{}>)

makeInstallable(KtFieldCheckbox)
makeInstallable(KtFieldCheckboxGroup)

export { KtFieldCheckbox, KtFieldCheckboxGroup }
