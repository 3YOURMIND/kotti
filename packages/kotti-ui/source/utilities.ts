import { VueConstructor } from 'vue'

import { Kotti } from './types'

/**
 * Takes a Vue Component and assigns a meta object which
 * describes various properties of the component
 */
export const attachMeta = <T>(
	component: VueConstructor<Vue>,
	meta: Kotti.Meta,
	other?: T,
) => Object.assign(component, { meta: Object.assign({}, meta, other) })

/**
 * Takes a Vue Component and assigns an install function to it
 * this makes sure that it can be used with Vue.use(component)
 */
export const makeInstallable = (component: VueConstructor<Vue>) =>
	Object.assign(component, {
		install: (Vue) => Vue.component(component.name, component),
	} as Vue.PluginObject<{}>)
