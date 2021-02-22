import { VueConstructor } from 'vue'

import { Kotti } from './types'

/**
 * Takes a Vue Component and assigns a meta object which
 * describes various properties of the component
 */
export const attachMeta = (component: VueConstructor<Vue>, meta: Kotti.Meta) =>
	Object.assign(component, { meta })

/**
 * Takes a Vue Component and assigns an install function to it
 * this makes sure that it can be used with Vue.use(component)
 */
export const makeInstallable = (component: VueConstructor<Vue>) =>
	Object.assign(component, {
		install: (Vue) => Vue.component(component.name, component),
	} as Vue.PluginObject<{}>)
